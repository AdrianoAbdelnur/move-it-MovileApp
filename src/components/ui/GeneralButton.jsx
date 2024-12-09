import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../styles/colors";
import { Entypo } from "@expo/vector-icons";

export const GeneralButton = ({
  text,
  onPressFunction,
  secondaryText = null,
  icon = null,
}) => {
  return (
    <TouchableOpacity style={styles.GeneralButton} onPress={onPressFunction}>
      <View style={styles.infoContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            <Entypo name={icon} size={28} color={"#000000"} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>{text}</Text>
          {secondaryText && (
            <Text style={styles.secondaryButtonText}>{secondaryText}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  GeneralButton: {
    width: "80%",
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: "#000000",
    fontSize: 12,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
  },
  iconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    height: "100%",
    borderRadius: 20,
  },
  textContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
