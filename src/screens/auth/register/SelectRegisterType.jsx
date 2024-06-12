import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { useNavigation } from "@react-navigation/native";

export const SelectRegisterType = () => {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.container}>
      <GeneralButton text={"Register as User"} />
      <GeneralButton
        text={"Register as Transport"}
        onPressFunction={() => navigation.navigate("PersonalTransport")}
      />
    </View>
  );
};
