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
import { NextButton } from "../../../components/ui/NextButton";
import { FormContext } from "../../../contexts/FormContext";

export const Dimen = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <View style={styles.dimensionsInputs}>
          <Text style={globalStyles.generalInformationText}>length(m)</Text>
          <TextInput
            placeholder="length"
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
        <NextButton navigateTo={"Date"} />
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
