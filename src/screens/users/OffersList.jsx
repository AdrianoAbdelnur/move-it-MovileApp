import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import colors from "../../styles/colors";
import { clientAxios } from "../../api/ClientAxios";
import { useNavigation } from "@react-navigation/native";
import { PostContext } from "../../contexts/PostsContext";
import { CustomConfirmModal } from "../../components/ui/CustomConfirmModal";
import { AuthContext } from "../../contexts/AuthContext";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { useStripe } from "@stripe/stripe-react-native";

export const OffersList = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const { state: userState } = useContext(AuthContext);
  const { postSelectOffer, uptateStatus } = useContext(PostContext);
  const { sendPushNotification } = usePushNotifications();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("second");
  const [itemSelected, setItemSelected] = useState();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    if (data.status.newOffers === true) {
      uptateStatus({
        postId: data._id,
        newStatus: { ...data.status, newOffers: false },
      });
    }
  }, [data._id]);

  const aceptOffer = async (item) => {
    try {
      const { data } = await clientAxios.patch(
        "/offer/selectOffer/" + item._id
      );

      if (data?.offerFound) {
        postSelectOffer({ postId: item.post, offerSelected: item._id });
        setShowModal(false);
        sendPushNotification(
          item?.owner.expoPushToken,
          "Offer selected",
          `${userState?.user?.given_name} has selected your offer`
        );
        navigation.navigate("PostsList");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmSelection = async (item) => {
    setItemSelected(item);
    try {
      const { data } = await clientAxios.post(
        "https://move-it-backend-3.onrender.com/api/payment/intent",
        {
          amount: Math.floor(item.price * 100),
          email: userState?.user?.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 2. Initialize the Payment sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "ADRIANO",
        paymentIntentClientSecret: data.paymentIntent,
        defaultBillingDetails: {
          address: {
            country: "AU", // 'AU' es el código de país para Australia
          },
        },
      });
      if (initResponse.error) {
        Alert.alert("Something went wrong");
        return;
      }

      const paymentResponse = await presentPaymentSheet();

      if (paymentResponse.error) {
        Alert.alert(
          `Error code: ${paymentResponse.error.code}`,
          paymentResponse.error.message
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }

    aceptOffer(item);
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Your offers:</Text>
        <ScrollView style={styles.services}>
          <View>
            {data?.offers &&
              data?.offers?.map((item, index) => (
                <View key={item._id} style={styles.itemContainer}>
                  <Text style={globalStyles.generalText}>
                    {item?.owner?.given_name} offered ${item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DriverProfile", {
                        transport: item?.owner,
                      })
                    }
                  >
                    <Text style={styles.review}>
                      View {item?.owner?.given_name}'s Profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptOffer}
                    onPress={() => confirmSelection(item)}
                  >
                    <Text>Accept {item?.owner?.given_name}'s offer</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
      <CustomConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={modalText}
        confirmFunction={() => aceptOffer(itemSelected)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 25,
    margin: 10,
  },
  services_container: {
    width: "90%",
    maxHeight: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 15,
  },
  servicesTitle: {
    color: "black",
    fontSize: 25,
    alignSelf: "flex-start",
    margin: 5,
  },
  services: {
    width: "85%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.primary,
  },
  text: {
    color: "black",
    fontSize: 25,
    marginBottom: 5,
  },
  itemContainer: {
    backgroundColor: "#37474F",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    margin: 2,
    padding: 5,
    paddingVertical: 8,
  },
  review: {
    fontSize: 15,
    color: colors.primary,
    marginLeft: "auto",
    marginBottom: 5,
  },
  acceptOffer: {
    backgroundColor: "#006400",
    padding: 12,
    borderBlockColor: "blue",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
