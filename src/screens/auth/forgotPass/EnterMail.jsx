import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import { CustomModal } from "../../../components/ui/CustomModal";
import globalStyles from "../../../styles/globalStyles";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../contexts/AuthContext";

export const EnterMail = () => {
  const [email, setEmail] = useState();
  const navigation = useNavigation();
  const { generateNewValidationCode } = useContext(AuthContext);

  const handleRequest = () => {
    generateNewValidationCode(email);
    navigation.navigate("Validation", { email });
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>
          Please enter your email, and we will send you a code to reset your
          password.
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="email"
          keyboardType="email-address"
          textContentType="username"
          inputMode="email"
          style={globalStyles.input}
          onChangeText={(value) => setEmail(value)}
        />

        <View>
          <GeneralButton
            text="Send request"
            onPressFunction={() => handleRequest()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
