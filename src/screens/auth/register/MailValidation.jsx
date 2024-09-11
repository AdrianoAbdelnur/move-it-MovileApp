import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import OtpInput from "../../../components/ui/OtpInput";
import globalStyles from "../../../styles/globalStyles";
import { AuthContext } from "../../../contexts/AuthContext";
import { CustomModal } from "../../../components/ui/CustomModal";
import { useNavigation } from "@react-navigation/native";

export const MailValidation = ({ route }) => {
  const [otp, setOtp] = useState("");
  let email = "";

  if (route?.params?.email) {
    email = route.params.email;
  }

  const {
    state: userState,
    validateMail,
    generateNewValidationCode,
    checkValidationCode,
  } = useContext(AuthContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handlePress = () => {
    generateNewValidationCode(email);
    setIsDisabled(true);
    setMessage("We have sent the new code to your email.");

    setTimeout(() => {
      setIsDisabled(false);
      setMessage("");
    }, 120000);
  };

  const handleSubmit = async () => {
    if (userState?.user && !userState?.user?.validatedMail) {
      validateMail(otp);
    } else {
      const isValid = await checkValidationCode(email, otp);
      if (isValid) {
        navigation.navigate("NewPass", { email, otp });
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.generalText}>Enter your verification code</Text>
      <OtpInput length={6} onChange={handleOtpChange} />
      <GeneralButton text="Verify" onPressFunction={handleSubmit} />

      {!isDisabled && (
        <TouchableOpacity onPress={handlePress} disabled={isDisabled}>
          <Text
            style={[globalStyles.generalText, isDisabled && { color: "black" }]}
          >
            regenerate code
          </Text>
        </TouchableOpacity>
      )}

      {message ? <Text>{message}</Text> : null}
      {!route?.params?.email && <CustomModal />}
    </View>
  );
};
