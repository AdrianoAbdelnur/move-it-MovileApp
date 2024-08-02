import React, { useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { NextButton } from "../../../components/ui/NextButton";
import colors from "../../../styles/colors";
import { FormContext } from "../../../contexts/FormContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export const Title = () => {
  const { formData, setFormData } = useContext(FormContext);
  const { state: userState } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      setFormData({});
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const checkInfo = () => {
    if (formData?.title?.length > 4) {
      navigation.navigate("Date");
    } else alert("Title must have at least 5 caracters");
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.generalText}>Add a title for your move:</Text>
        <Text style={[globalStyles.generalInformationText]}>
          (e.g., "Move TV to New Apartment," "Full House Move," "Office
          Furniture Relocation").
        </Text>
        <TextInput
          placeholder="Title for your move"
          keyboardType="default"
          inputMode="text"
          style={globalStyles.input}
          maxLength={25}
          onChangeText={(value) =>
            setFormData({
              ...formData,
              title: value,
              owner: userState.user.id,
              directions: [],
            })
          }
        />
        <NextButton toDo={checkInfo} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: colors.background,
    paddingTop: 15,
  },
});
