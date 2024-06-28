import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import { NextButton } from "../../../../components/ui/NextButton";
import { useNavigation } from "@react-navigation/native";
import { FormContext } from "../../../../contexts/FormContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { PhotoButton } from "../../../../components/ui/PhotoButton";

export const TransportInfo = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const { state: user } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <TextInput
          placeholder={
            user.user.transportInfo.vehicle
              ? user.user.transportInfo.vehicle
              : "type of vehicle"
          }
          keyboardType="ascii-capable"
          textContentType="username"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({
              transportInfo: { ...formData.transportInfo, vehicle: value },
            })
          }
        />
        <TextInput
          placeholder={
            user.user.transportInfo.registrationPlate
              ? user.user.transportInfo.registrationPlate
              : "registration plate"
          }
          keyboardType="phone-pad"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({
              transportInfo: {
                ...formData.transportInfo,
                registrationPlate: value,
              },
            })
          }
        />
        <PhotoButton
          primaryText={"Vehicle Photo"}
          secondaryText={"(General)"}
          icon={"camera"}
          fileName={"generalImg"}
          onPressFunction={() =>
            navigation.navigate("Camera", { saveAs: "generalImg" })
          }
        />
        <PhotoButton
          primaryText={"Vehicle Photo"}
          secondaryText={"(Cargo Area)"}
          icon={"camera"}
          fileName={"cargoAreaImg"}
          onPressFunction={() =>
            navigation.navigate("Camera", { saveAs: "cargoAreaImg" })
          }
        />
        <NextButton navigateTo={"DriverInfo"} />
      </View>
    </KeyboardAvoidingView>
  );
};
