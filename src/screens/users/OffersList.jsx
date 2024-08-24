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

export const OffersList = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const { postSelectOffer, uptateStatus } = useContext(PostContext);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("second");
  const [itemSelected, setItemSelected] = useState();

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
        navigation.navigate("home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmSelection = (item) => {
    setModalText(
      `Please confirm that you accept ${item?.owner?.given_name}'s offer for $${item.price}.`
    );
    setItemSelected(item);
    setShowModal(true);
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
