import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import OtpInput from "../../../components/ui/OtpInput";
import globalStyles from "../../../styles/globalStyles";
import { AuthContext } from "../../../contexts/AuthContext";
import { CustomModal } from "../../../components/ui/CustomModal";

export const MailValidation = () => {
  const [otp, setOtp] = useState("");
  const { validateMail, generateNewValidationCode } = useContext(AuthContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handlePress = () => {
    generateNewValidationCode();
    setIsDisabled(true);
    setMessage("We have sent the new code to your email.");

    setTimeout(() => {
      setIsDisabled(false);
      setMessage("");
    }, 120000);
  };

  const handleSubmit = () => {
    validateMail(otp);
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
      {/* <Text
        style={{
          fontSize: 14,
          color: "#FFFF00",
          fontWeight: "bold",
          marginTop: 30,
        }}
        onPress={() => generateNewValidationCode()}
      >
        regenerate code
      </Text> */}
      <CustomModal />
    </View>
  );
};
