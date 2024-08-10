import React, { useContext, useEffect } from "react";
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
import { GeneralButton } from "../../../../components/ui/GeneralButton";
import { DropDownCustom } from "../../../../components/dropDown/DropDownCustom";
import { useUpdateObj } from "../../../../hooks/useUpdateObj";

export const TransportInfo = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const { state: userState } = useContext(AuthContext);
  const [updateObj] = useUpdateObj(setFormData);

  useEffect(() => {
    if (userState?.user?.transportInfo) {
      const keyValue = Object.entries(userState?.user?.transportInfo);
      for (const item of keyValue) {
        const [key, value] = item;
        if (value !== false) {
          updateObj(`transportInfo.${key}`, value);
        }
      }
    }
  }, [userState]);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const items = [
    { label: "Truck", value: "Truck" },
    { label: "Van", value: "Van" },
    { label: "Ute", value: "Ute" },
    { label: "Trailer", value: "Trailer" },
    { label: "Pick up", value: "Pick up" },
  ];

  const handleSelect = (item) => {
    updateObj("transportInfo.vehicle", item.value);
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <DropDownCustom
          prevItem={userState?.user?.transportInfo?.vehicle}
          items={items}
          onSelect={handleSelect}
          placeholder="Select a type of vehicle"
        />
        <TextInput
          placeholder={
            userState.user.transportInfo.registrationPlate
              ? userState.user.transportInfo.registrationPlate
              : "Plate number"
          }
          keyboardType="phone-pad"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            updateObj("transportInfo.registrationPlate", value)
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
            onPress={() => updateObj("transportInfo.generalImg", null)}
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
            onPress={() => updateObj("transportInfo.cargoAreaImg", null)}
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
    minWidth: "80%",
    height: 60,
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
