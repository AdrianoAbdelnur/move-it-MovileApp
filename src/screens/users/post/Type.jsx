import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export const Type = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text>Tipe of goods (furniture, appliances)</Text>
        <TextInput
          placeholder="Type of goods"
          placeholderTextColor="white"
          keyboardType="default"
          inputMode="text"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Dim")}>
          <Text>Next</Text>
        </TouchableOpacity>
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
});
