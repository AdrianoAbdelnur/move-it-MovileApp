import React, { useContext, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export const PostDetails = ({ route }) => {
  const navigation = useNavigation();
  const { state: userState } = useContext(AuthContext);
  const { data } = route.params;
  let fDate = "";
  let fTime = "";

  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    fDate = `${day}/${month}/${year}`;
    fTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
      <Text style={globalStyles.generalInformationText}>
        Goods type : {data?.goodsType}
      </Text>
      <Text style={globalStyles.generalInformationText}>Load Dimensions:</Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        height : {data?.dimensions?.height} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        length : {data?.dimensions?.length} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        width : {data?.dimensions?.width} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        weight : {data?.dimensions?.weight} Kg
      </Text>
      <Text style={globalStyles.generalInformationText}>Directions:</Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        From: {data.directions?.from?.description}
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        To: {data.directions?.to?.description}
      </Text>
      {formatDate(data?.date)}
      <Text style={globalStyles.generalInformationText}>date : {fDate}</Text>
      <Text style={globalStyles.generalInformationText}>time : {fTime}</Text>
      <View style={globalStyles.nextButtonContainer}></View>
      {userState.user.role === "transport" && (
        <TouchableOpacity
          style={globalStyles.OptionsButton}
          onPress={() => navigation.navigate("Offer", { data })}
        >
          <Text style={globalStyles.textButtons}>Make an offer</Text>
        </TouchableOpacity>
      )}
      {userState.user.role === "user" && data.offers.length !== 0 && (
        <TouchableOpacity
          style={globalStyles.OptionsButton}
          onPress={() => navigation.navigate("OffersList", { data })}
        >
          <Text style={globalStyles.textButtons}>See offers</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
