import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import { NextButton } from "../../../../components/ui/NextButton";
import { useNavigation } from "@react-navigation/native";
import { GeneralButton } from "../../../../components/ui/GeneralButton";
import { FormContext } from "../../../../contexts/FormContext";

export const TransportInfo = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);

  useEffect(() => {
    console.log("Es este?", formData);
  }, [formData]);

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <TextInput
          placeholder="type of vehicle"
          keyboardType="ascii-capable"
          textContentType="username"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) => setFormData({ ...formData, vehicle: value })}
        />
        <TextInput
          placeholder="registration plate"
          keyboardType="phone-pad"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({ ...formData, registrationPlate: value })
          }
        />

        <TextInput
          placeholder="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          inputMode="email"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({ ...formData, password: value })
          }
        />
        <TextInput
          placeholder="password"
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
          inputMode="text"
          style={globalStyles.input}
          /* onChangeText={(value) =>
            setFormData({ ...formData, password: value })
          } */
        />
        <GeneralButton
          text={"Photo of your license"}
          onPressFunction={() =>
            navigation.navigate("Camera", { saveAs: "licenseImage" })
          }
        />
        <NextButton navigateTo={"TransportInfo"} />
      </View>
    </KeyboardAvoidingView>
  );
};
