import globalStyles from "../../../styles/globalStyles";
import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../../../contexts/AuthContext";
import { NextButton } from "../../../components/ui/NextButton";
import { FormContext } from "../../../contexts/FormContext";

export const Type = () => {
  const { formData, setFormData } = useContext(FormContext);
  const { state: user } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>
          Type of goods (furniture, appliances)
        </Text>
        <TextInput
          placeholder="Type of goods"
          keyboardType="default"
          inputMode="text"
          style={globalStyles.input}
          onChangeText={(value) =>
            setFormData({ ...formData, goodsType: value, owner: user.user.id })
          }
        />
        <NextButton navigateTo={"Dimensions"} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
