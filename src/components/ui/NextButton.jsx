import React from "react";
import globalStyles from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../styles/colors";

export const NextButton = ({ toDo, navigateTo = null, isDisabled = false }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.nextButtonContainer}>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={
          navigateTo ? () => navigation.navigate(navigateTo) : () => toDo()
        }
        disabled={isDisabled}
      >
        <Text style={globalStyles.textButtons}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  nextButton: {
    backgroundColor: colors.primary,
    minWidth: 85,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 25,
    padding: 5,
  },
  nextButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
});
