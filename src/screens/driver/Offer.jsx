import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { GeneralButton } from "../../components/ui/GeneralButton";
import { PostContext } from "../../contexts/PostsContext";
import { clientAxios } from "../../api/ClientAxios";

export const Offer = ({ route }) => {
  const { state: userState } = useContext(AuthContext);
  const { addOfferInPost } = useContext(PostContext);
  const { data } = route.params;
  const [price, setPrice] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigation = useNavigation();

  const validateMoneyInput = (value) => {
    const moneyRegex = /^\d+([.,]\d{2})?$/;
    if (moneyRegex.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setPrice(value);
  };

  const onsubmit = () => {
    addOffer({
      owner: userState.user.id,
      price: price,
      post: data._id,
    });
    navigation.navigate("driverHome");
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
          placeholder="0,00"
          keyboardType="numeric"
          value={price}
          inputMode="numeric"
          style={globalStyles.input}
          onChangeText={validateMoneyInput}
        />
        {!isValid && (
          <Text style={globalStyles.generalText}>
            Invalid format. Use integers or with two decimals (e.g., 123.45)
          </Text>
        )}
        <View style={globalStyles.nextButtonContainer}>
          <GeneralButton text={"Confirm"} onPressFunction={onsubmit} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
