import React, { useContext, useEffect } from "react";
import globalStyles from "../../../styles/globalStyles";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormUserContext } from "../../../contexts/FormUserContext";

export const Dimen = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormUserContext);
  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <View style={styles.dimensionsInputs}>
          <Text style={globalStyles.generalInformationText}>length(m)</Text>
          <TextInput
            placeholder="length"
            placeholderTextColor="white"
            keyboardType="number-pad"
            inputMode="numeric"
            style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
            onChangeText={(value) =>
              setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, length: value },
              })
            }
          />
        </View>
        <View style={styles.dimensionsInputs}>
          <Text style={globalStyles.generalInformationText}>width(m)</Text>
          <TextInput
            placeholder="width"
            placeholderTextColor="white"
            keyboardType="number-pad"
            inputMode="numeric"
            style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
            onChangeText={(value) =>
              setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, width: value },
              })
            }
          />
        </View>
        <View style={styles.dimensionsInputs}>
          <Text style={globalStyles.generalInformationText}>height(m)</Text>
          <TextInput
            placeholder="Height"
            placeholderTextColor="white"
            keyboardType="number-pad"
            inputMode="numeric"
            style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
            onChangeText={(value) =>
              setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, height: value },
              })
            }
          />
        </View>
        <View style={styles.dimensionsInputs}>
          <Text style={globalStyles.generalInformationText}>weight(Kg)</Text>
          <TextInput
            placeholder="weight"
            placeholderTextColor="white"
            keyboardType="number-pad"
            inputMode="numeric"
            style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
            onChangeText={(value) =>
              setFormData({
                ...formData,
                dimensions: { ...formData.dimensions, weight: value },
              })
            }
          />
        </View>
        <View style={globalStyles.nextButtonContainer}>
          <TouchableOpacity
            style={globalStyles.nextButton}
            onPress={() => navigation.navigate("Directions")}
          >
            <Text style={globalStyles.textButtons}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  dimensionsInputs: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
});
