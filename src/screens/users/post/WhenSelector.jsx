import React, { useContext } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { useNavigation } from "@react-navigation/native";
import { useUpdateObj } from "../../../hooks/useUpdateObj";
import { FormContext } from "../../../contexts/FormContext";
import globalStyles from "../../../styles/globalStyles";

export const WhenSelector = () => {
  const navigation = useNavigation();
  const { setFormData } = useContext(FormContext);
  const [updateObj] = useUpdateObj(setFormData);

  const fixDate = () => {
    updateObj("date.date", new Date());
    updateObj("date.timeDay", "now");
    navigation.navigate("Directions");
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>
          Select when you want to make your move:
        </Text>
        <Text style={[globalStyles.generalInformationText]}>
          (If you select now, your post will be valid for 48 hours).
        </Text>
        <GeneralButton text="Right now" onPressFunction={fixDate} />
        <Text style={[globalStyles.generalInformationText]}>
          (You can select an specific day for your move).
        </Text>
        <GeneralButton
          text="Select a date"
          onPressFunction={() => navigation.navigate("Date")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
