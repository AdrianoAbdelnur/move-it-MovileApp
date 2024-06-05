import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { FormUserContext } from "../../../contexts/FormUserContext";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { InputAutocomplete } from "../../../components/InputAutocomplete";

export const Directions = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormUserContext);
  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalInformationText}>
          Where do you want to transport the load from
        </Text>
        <TextInput
          placeholder="FROM"
          keyboardType="default"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({
              ...formData,
              directions: { ...formData.directions, from: value },
            })
          }
        />
        <Text style={globalStyles.generalInformationText}>
          Where do you want to transport the load to
        </Text>
        <TextInput
          placeholder="TO"
          keyboardType="default"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({
              ...formData,
              directions: { ...formData.directions, to: value },
            })
          }
        />
        <View style={globalStyles.nextButtonContainer}>
          <TouchableOpacity
            style={globalStyles.nextButton}
            onPress={() => navigation.navigate("Date")}
          >
            <Text style={globalStyles.textButtons}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  searchContainer: {
    width: "90%",
    height: 400,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    borderColor: "#888",
    borderWidth: 1,
  },
});
