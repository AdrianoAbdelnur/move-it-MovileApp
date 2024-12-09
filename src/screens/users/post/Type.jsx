import globalStyles from "../../../styles/globalStyles";
import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FormContext } from "../../../contexts/FormContext";
import colors from "../../../styles/colors";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useUpdateObj } from "../../../hooks/useUpdateObj";
import { Entypo } from "@expo/vector-icons";
export const Type = ({ leg }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [difficultAccess, setDifficultAccess] = useState(false);
  const [updateObj] = useUpdateObj(setFormData);
  const currentLeg = `leg${leg + 1}`;

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const toggleCheckbox = () => {
    console.log(difficultAccess);
    setDifficultAccess(!difficultAccess);
  };

  const navigation = useNavigation();

  const addItemsList = () => {
    if (!formData.itemsDetails[currentLeg].itemsList) {
      updateObj(`itemsDetails.${currentLeg}.itemsList`, []);
    }
    navigation.navigate("ItemsList", { leg });
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.generalText}>Add a Description:</Text>

          <TextInput
            style={styles.multilineInput}
            multiline
            numberOfLines={4}
            value={formData?.itemsDetails[currentLeg]?.description}
            placeholder="Include as many details as possible to ensure the transporter has a clear understanding of the journey. You can also add a list of items to be moved or a photo if you want."
            onChangeText={(value) =>
              updateObj(`itemsDetails.${currentLeg}.description`, value)
            }
          />
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={toggleCheckbox}
          >
            <View
              style={[
                styles.checkbox,
                difficultAccess && { backgroundColor: "#007AFF" }, // Cambia el fondo si está marcado
              ]}
            >
              {difficultAccess && (
                <Entypo name="check" size={18} color="#fff" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              There is difficult access (e.g., stairs, narrow spaces).
            </Text>
          </TouchableOpacity>
          {difficultAccess && (
            <TextInput
              style={[styles.multilineInput, { height: 120 }]}
              multiline
              numberOfLines={4}
              value={formData?.itemsDetails[currentLeg]?.difficultAccess}
              placeholder="Please describe the difficulty (e.g., narrow stairs, no parking space) and specify whether it is at the pickup location, the drop-off location, or both."
              onChangeText={(value) =>
                updateObj(`itemsDetails.${currentLeg}.difficultAccess`, value)
              }
            />
          )}
          <GeneralButton
            text={"Add a list of items"}
            secondaryText={"(optional)"}
            icon={"add-to-list"}
            onPressFunction={addItemsList}
          />

          {!formData?.itemsDetails?.[currentLeg]?.photoItems ? (
            <GeneralButton
              text={"Add a photo"}
              secondaryText={"(optional)"}
              icon={"camera"}
              onPressFunction={() => {
                navigation.navigate("Camera", {
                  path: `itemsDetails.${currentLeg}.photoItems`,
                });
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={() =>
                setFormData({
                  ...formData,
                  itemsDetails: {
                    ...formData.itemsDetails,
                    [currentLeg]: {
                      ...formData.itemsDetails[currentLeg],
                      photoItems: null,
                    },
                  },
                })
              }
            >
              <Text>Item Photo uploaded </Text>
              <Text>change?</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  multilineInput: {
    minWidth: "100%",
    borderColor: colors.border,
    height: 150,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: colors.textPrimary,
    textAlignVertical: "top",
    fontSize: 15,
  },
  scrollViewContainer: {
    backgroundColor: colors.background,
    paddingTop: 15,
  },
  changePhotoButton: {
    backgroundColor: "grey",
    minWidth: "70%",
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
