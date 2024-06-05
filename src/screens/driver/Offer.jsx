import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import { AuthContext } from "../../contexts/AuthContext";
import { OfferContext } from "../../contexts/OffersContext";
import { useNavigation } from "@react-navigation/native";

export const Offer = ({ route }) => {
  const { state: userState } = useContext(AuthContext);
  const { state: offerState, addOffer } = useContext(OfferContext);
  const { data } = route.params;
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("offers", offerState);
  }, [offerState]);

  const validateMoneyInput = (value) => {
    console.log(value);
    const moneyRegex = /^\d+([.,]\d{2})?$/;
    if (moneyRegex.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setInput(value);
  };

  const onsubmit = () => {
    addOffer({
      owner: userState.user.id,
      price: input,
      post: data._id,
    });
    navigation.navigate("driverHome");
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>Make your offer</Text>
        <TextInput
          placeholder="0,00"
          keyboardType="numeric"
          value={input}
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
          <TouchableOpacity
            style={globalStyles.nextButton}
            onPress={onsubmit}
            disabled={!isValid}
          >
            <Text style={globalStyles.textButtons}>Confirn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
