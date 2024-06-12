import React from "react";
import globalStyles from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export const NextButton = ({ navigateTo }) => {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.nextButtonContainer}>
      <TouchableOpacity
        style={globalStyles.nextButton}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <Text style={globalStyles.textButtons}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};
