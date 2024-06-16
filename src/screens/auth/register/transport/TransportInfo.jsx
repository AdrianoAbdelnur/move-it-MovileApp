import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import colors from "../../../../styles/colors";
import { NextButton } from "../../../../components/ui/NextButton";
import { useNavigation } from "@react-navigation/native";
import { GeneralButton } from "../../../../components/ui/GeneralButton";

export const TransportInfo = () => {
  const navigation = useNavigation();
  const [licensePhoto, setLicensePhoto] = useState("");

  const newLicensePhoto = (newPhoto) => {
    setLicensePhoto(newPhoto);
  };

  useEffect(() => {
    console.log("Es este?", licensePhoto);
  }, [licensePhoto]);

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
        <GeneralButton
          text={"Photo of your license"}
          onPressFunction={() =>
            navigation.navigate("Camera", { newLicensePhoto })
          }
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera", { hola: "hola" })}
        >
          <Text style={globalStyles.generalText}>
            Take photo of your license
          </Text>
        </TouchableOpacity>
        <NextButton navigateTo={"TransportInfo"} />
      </View>
    </KeyboardAvoidingView>
  );
};
