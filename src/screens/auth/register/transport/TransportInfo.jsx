import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import colors from "../../../../styles/colors";
import { NextButton } from "../../../../components/ui/NextButton";

export const TransportInfo = () => {
  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <TextInput
          placeholder="type of vehicle"
          keyboardType="ascii-capable"
          textContentType="username"
          inputMode="text"
          style={globalStyles.input}
          /* onChangeText={(value) => getInput("email", value)} */
        />
        <TextInput
          placeholder="registration plate"
          keyboardType="phone-pad"
          textContentType="username"
          inputMode="text"
          style={globalStyles.input}
          /* onChangeText={(value) => getInput("email", value)} */
        />

        <TextInput
          placeholder="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          inputMode="email"
          style={globalStyles.input}
          /* onChangeText={(value) => getInput("email", value)} */
        />
        <TextInput
          placeholder="password"
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
          inputMode="text"
          style={globalStyles.input}
          /* onChangeText={(value) => getInput("password", value)} */
        />
        <TextInput
          placeholder="confirm password"
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
          inputMode="text"
          style={globalStyles.input}
          /* onChangeText={(value) => getInput("password", value)} */
        />
        <NextButton navigateTo={"TransportInfo"} />
      </View>
    </KeyboardAvoidingView>
  );
};
