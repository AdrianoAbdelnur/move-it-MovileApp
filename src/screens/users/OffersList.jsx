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
import { OfferContext } from "../../contexts/OffersContext";
import { PostContext } from "../../contexts/PostsContext";

export const OffersList = ({ route }) => {
  const { data } = route.params;
  const [offers, setOffers] = useState([]);
  const navigation = useNavigation();
  const { postSelectOffer, state: post } = useContext(PostContext);

  useEffect(() => {
    getOffers(data._id);
  }, [data._id]);

  const getOffers = async (id) => {
    try {
      const { data } = await clientAxios.get("/offer/getOffersForMyPost/" + id);
      setOffers(data.myOffers);
    } catch (error) {
      console.log(error);
    }
  };

  const aceptOffer = async (item) => {
    try {
      const { data } = await clientAxios.patch(
        "/offer/selectOffer/" + item._id
      );
      if (data?.offerFound) {
        postSelectOffer({ postId: item.post, offerSelected: item._id });
      }
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Your offers:</Text>
        <ScrollView style={styles.services}>
          <View>
            {offers &&
              offers.map((item, index) => (
                <View key={item._id} style={styles.itemContainer}>
                  <Text style={globalStyles.generalText}>
                    {item?.owner?.given_name} offered ${item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Reviews", { item })}
                  >
                    <Text style={styles.review}>
                      View {item?.owner?.given_name}'s reviews
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptOffer}
                    onPress={() => aceptOffer(item)}
                  >
                    <Text>Accept {item?.owner?.given_name}'s offer</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
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
