import globalStyles from "../../../styles/globalStyles";
import React, { useContext, useEffect } from "react";
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

export const Type = ({ leg }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [updateObj] = useUpdateObj(setFormData);
  const currentLeg = `leg${leg + 1}`;

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
    width: "100%",
    borderColor: colors.border,
    height: 150,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: colors.textPrimary,
    textAlignVertical: "top",
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
});
