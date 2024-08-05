import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../../styles/globalStyles";
import { NextButton } from "../../../../components/ui/NextButton";
import { useNavigation } from "@react-navigation/native";
import { FormContext } from "../../../../contexts/FormContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { PhotoButton } from "../../../../components/ui/PhotoButton";
import { GeneralButton } from "../../../../components/ui/GeneralButton";

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
        {!formData?.transportInfo?.generalImg ? (
          <GeneralButton
            text={"Vehicle Photo"}
            secondaryText={"(General)"}
            icon={"camera"}
            onPressFunction={() => {
              navigation.navigate("Camera", {
                path: `transportInfo.generalImg`,
              });
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() =>
              setFormData({
                ...formData,
                transportInfo: {
                  ...formData?.transportInfo,
                  generalImg: null,
                },
              })
            }
          >
            <Text>General photo uploaded </Text>
            <Text>change?</Text>
          </TouchableOpacity>
        )}
        {!formData?.transportInfo?.cargoAreaImg ? (
          <GeneralButton
            text={"Vehicle Photo"}
            secondaryText={"(Cargo Area)"}
            icon={"camera"}
            onPressFunction={() => {
              navigation.navigate("Camera", {
                path: `transportInfo.cargoAreaImg`,
              });
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() =>
              setFormData({
                ...formData,
                transportInfo: {
                  ...formData?.transportInfo,
                  cargoAreaImg: null,
                },
              })
            }
          >
            <Text>Cargo Area photo uploaded </Text>
            <Text>change?</Text>
          </TouchableOpacity>
        )}
        <NextButton navigateTo={"DriverInfo"} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  changePhotoButton: {
    backgroundColor: "grey",
    minWidth: "70%",
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
