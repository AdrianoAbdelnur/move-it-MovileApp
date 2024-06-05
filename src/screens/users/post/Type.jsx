import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../../styles/globalStyles";
import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FormUserContext } from "../../../contexts/FormUserContext";
import { AuthContext } from "../../../contexts/AuthContext";

export const Type = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormUserContext);
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
        <View style={globalStyles.nextButtonContainer}>
          <TouchableOpacity
            style={globalStyles.nextButton}
            onPress={() => {
              navigation.navigate("Dimensions");
            }}
          >
            <Text style={globalStyles.textButtons}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
