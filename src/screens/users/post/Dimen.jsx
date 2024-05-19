import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export const Dimen = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.dimensionsContainer}>
          <View style={styles.dimensionsInputs}>
            <Text>length(m)</Text>
            <TextInput
              placeholder="length"
              placeholderTextColor="white"
              keyboardType="number-pad"
              inputMode="numeric"
              style={styles.textInput}
            />
          </View>
          <View style={styles.dimensionsInputs}>
            <Text>width(m)</Text>
            <TextInput
              placeholder="width"
              placeholderTextColor="white"
              keyboardType="number-pad"
              inputMode="numeric"
              style={styles.textInput}
            />
          </View>
          <View style={styles.dimensionsInputs}>
            <Text>Height(m)</Text>
            <TextInput
              placeholder="Height"
              placeholderTextColor="white"
              keyboardType="number-pad"
              inputMode="numeric"
              style={styles.textInput}
            />
          </View>
          <View style={styles.dimensionsInputs}>
            <Text>weight(Kg)</Text>
            <TextInput
              placeholder="weight"
              placeholderTextColor="white"
              keyboardType="number-pad"
              inputMode="numeric"
              style={styles.textInput}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#34495e",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  dimensionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    minWidth: "90%",
    height: 40,
  },
  dimensionsInputs: {
    minWidth: "25%",
    maxWidth: "40%",
    display: "flex",
    flex: 1,
  },
});
