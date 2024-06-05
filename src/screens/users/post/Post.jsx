import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const Post = () => {
  return (
    <View style={styles.container}>
      <Text>Tipe of goods (furniture, appliances)</Text>
      <TextInput
        placeholder="Height"
        placeholderTextColor="white"
        keyboardType="number-pad"
        inputMode="numeric"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  textInput: {
    minWidth: "90%",
    margin: 10,
    paddingHorizontal: 5,
    height: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: "#3c3c3c",
    color: "white",
    fontSize: 25,
  },
  input: {
    width: "70%",
    backgroundColor: "red",
  },
});
