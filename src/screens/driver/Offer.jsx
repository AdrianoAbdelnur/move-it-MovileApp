import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { GeneralButton } from "../../components/ui/GeneralButton";
import { PostContext } from "../../contexts/PostsContext";
import { clientAxios } from "../../api/ClientAxios";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { DropDownCustom } from "../../components/dropDown/DropDownCustom";

const items = [
  { label: "3 hours", value: 180 },
  { label: "1 hour", value: 60 },
  { label: "30 minutes", value: 30 },
  { label: "15 minutes", value: 15 },
  { label: "5 minutes ", value: 5 },
];

export const Offer = ({ route }) => {
  const { state: userState } = useContext(AuthContext);
  const { addOfferInPost } = useContext(PostContext);
  const { sendPushNotification } = usePushNotifications();
  const { data } = route.params;
  const [price, setPrice] = useState("");
  const [offerDuration, setOfferDuration] = useState(180);
  const [endTime, setEndTime] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (offerDuration) {
      const now = new Date();
      const calculatedEndTime = new Date(now.getTime() + offerDuration * 60000);
      setEndTime(calculatedEndTime);
    } else {
      setEndTime(null);
    }
  }, [offerDuration]);

  const validateMoneyInput = (value) => {
    const moneyRegex = /^\d+([.,]\d{2})?$/;

    const numericValue = parseFloat(value.replace(",", "."));

    if (value.trim() !== "" && moneyRegex.test(value) && numericValue > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setPrice(value);

    if (value.trim() !== "" && moneyRegex.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setPrice(value);
  };

  const onsubmit = () => {
    if (
      isValid &&
      price.trim() !== "" &&
      parseFloat(price.replace(",", ".")) > 0
    ) {
      addOffer({
        owner: userState.user.id,
        price: price,
        post: data._id,
        expiredTime: endTime || new Date().setHours(23, 59, 59, 999),
      });
      sendPushNotification(
        data.owner.expoPushToken,
        "New Offer",
        "You have recieved a new offer for a post"
      );
      navigation.navigate("driverHome");
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number.", [
        { text: "OK" },
      ]);
    }
  };

  const addOffer = async (offerData) => {
    try {
      const { data } = await clientAxios.post("/offer/addOffer", offerData);
      const { newOffer } = data;
      if (newOffer) {
        addOfferInPost({
          ownerId: userState.user.id,
          ownerName: userState.user.given_name,
          postId: newOffer.post._id,
          newOfferId: newOffer._id,
          expiredTime: newOffer.expiredTime,
          status: newOffer.status,
          price: newOffer.price,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>Make your offer</Text>
        <TextInput
          placeholder="0.00"
          keyboardType="numeric"
          value={price}
          inputMode="numeric"
          style={[globalStyles.input, { textAlign: "right", width: "70%" }]}
          onChangeText={validateMoneyInput}
        />
        {!isValid && (
          <Text style={globalStyles.generalText}>
            Invalid format. Use integers or with two decimals (e.g., 123.45)
          </Text>
        )}
        {new Date(data?.date?.date).toDateString() ===
          new Date().toDateString() && (
          <View style={{ width: "100%" }}>
            <Text style={globalStyles.generalText}>Duration of the offer.</Text>
            <View style={{ width: "70%", alignSelf: "center" }}>
              <DropDownCustom
                items={items}
                placeholder="3 hours"
                onSelect={(value) => setOfferDuration(value.value)}
              />
            </View>
            {endTime instanceof Date && !isNaN(endTime) && (
              <Text style={globalStyles.generalText}>
                Your offer will be valid until {endTime.toLocaleString()}
              </Text>
            )}
          </View>
        )}
        <View style={globalStyles.nextButtonContainer}>
          <GeneralButton text={"Confirm"} onPressFunction={onsubmit} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
