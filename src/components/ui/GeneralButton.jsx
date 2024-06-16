import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";

export const GeneralButton = ({ text, onPressFunction }) => {
  return (
    <TouchableOpacity style={styles.GeneralButton} onPress={onPressFunction}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  GeneralButton: {
    width: "90%",
    height: 75,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    margin: 10,
  },
});
