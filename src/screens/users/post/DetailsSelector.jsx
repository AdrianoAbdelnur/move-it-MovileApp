import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { NextButton } from "../../../components/ui/NextButton";
import { Type } from "./Type";
import { FormContext } from "../../../contexts/FormContext";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUpdateObj } from "../../../hooks/useUpdateObj";

export const DetailsSelector = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const [updateObj] = useUpdateObj(setFormData);

  useEffect(() => {
    const newItemsDetails = {};
    for (let i = 0; i < formData?.directions?.length - 1; i++) {
      const key = `leg${i + 1}`;
      newItemsDetails[key] = { description: "" };
    }
    updateObj("itemsDetails", newItemsDetails);
  }, []);

  const handleArrowPress = (selection) => {
    setCurrentIndex((prevIndex) => {
      if (
        prevIndex + selection < formData?.directions?.length - 1 &&
        prevIndex + selection >= 0
      ) {
        return prevIndex + selection;
      }
      return prevIndex;
    });
  };

  const findFirstEmptyDescription = () => {
    for (const leg in formData?.itemsDetails) {
      if (formData?.itemsDetails[leg]?.description === "") {
        return leg;
      }
    }
    return null;
  };

  const checkInfo = () => {
    const firstEmptyLeg = findFirstEmptyDescription();
    if (firstEmptyLeg) {
      const index = parseInt(firstEmptyLeg.slice(3), 10) - 1;
      alert(`The description field is required`);
      setCurrentIndex(index);
    } else {
      navigation.navigate("Confirmation");
    }
  };
  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        {formData?.directions?.length > 2 ? (
          <View style={styles.legSelectorContainer}>
            <TouchableOpacity onPress={() => handleArrowPress(-1)}>
              <Entypo name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={globalStyles.generalText}>
              Details for leg {currentIndex + 1}
            </Text>
            <TouchableOpacity onPress={() => handleArrowPress(1)}>
              <Entypo name="chevron-right" size={32} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={[globalStyles.generalText, { alignSelf: "center" }]}>
            Details for the delivery
          </Text>
        )}

        <Text
          style={[globalStyles.generalInformationText, { alignSelf: "center" }]}
        >
          from:{" "}
          {formData?.directions?.[currentIndex]?.description.split(",")[0]} to:
          {formData?.directions?.[currentIndex + 1]?.description.split(",")[0]}
        </Text>
        {formData?.itemsDetails?.leg1 && <Type leg={currentIndex} />}
        <NextButton toDo={checkInfo} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  legSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
});
