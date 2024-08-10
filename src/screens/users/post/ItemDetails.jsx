import React, { useContext, useEffect, useState } from "react";
import globalStyles from "../../../styles/globalStyles";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FormContext } from "../../../contexts/FormContext";
import colors from "../../../styles/colors";
import { useIsFocused } from "@react-navigation/native";
import { useUpdateObj } from "../../../hooks/useUpdateObj";

export const ItemDetails = ({ route }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [item, setItem] = useState({});
  const isFocused = useIsFocused();
  const { leg } = route.params;
  const currentLeg = `leg${leg + 1}`;
  const [updateObj] = useUpdateObj(setFormData);

  useEffect(() => {
    if (route.params.data.name) {
      setItem(route.params.data);
    }
  }, [route.params.data.name]);

  useEffect(() => {
    if (!isFocused) {
      const newItemsList = formData.itemsDetails[currentLeg].itemsList.map(
        (i) => {
          if (i.name === item.name) {
            return item;
          }
          return i;
        }
      );
      updateObj(`itemsDetails.${currentLeg}.itemsList`, newItemsList);
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.generalText}>{item.name} description</Text>
          <Text style={globalStyles.generalText}>Add a Description:</Text>
          <TextInput
            style={[styles.multilineInput]}
            multiline
            numberOfLines={4}
            value={item?.details?.description}
            placeholder="Include as many details as possible to ensure the transporter has a clear understanding of item"
            onChangeText={(value) =>
              setItem({
                ...item,
                details: {
                  ...item?.details,
                  description: value,
                },
              })
            }
          />
          <Text style={globalStyles.generalText}>
            You may also add dimensions if you wish.
          </Text>
          <View style={styles.dimensionsInputs}>
            <Text style={[globalStyles.generalText, { flex: 1 }]}>
              length(m)
            </Text>
            <TextInput
              placeholder="length"
              keyboardType="number-pad"
              inputMode="numeric"
              style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
              value={item?.details?.dimensions?.length}
              onChangeText={(value) =>
                setItem({
                  ...item,
                  details: {
                    ...item?.details,
                    dimensions: { ...item?.details?.dimensions, length: value },
                  },
                })
              }
            />
          </View>
          <View style={styles.dimensionsInputs}>
            <Text style={[globalStyles.generalText, { flex: 1 }]}>
              width(m)
            </Text>
            <TextInput
              placeholder="width"
              keyboardType="number-pad"
              inputMode="numeric"
              style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
              value={item?.details?.dimensions?.width}
              onChangeText={(value) =>
                setItem({
                  ...item,
                  details: {
                    ...item?.details,
                    dimensions: { ...item?.details?.dimensions, width: value },
                  },
                })
              }
            />
          </View>
          <View style={styles.dimensionsInputs}>
            <Text style={[globalStyles.generalText, { flex: 1 }]}>
              height(m)
            </Text>
            <TextInput
              placeholder="height"
              keyboardType="number-pad"
              inputMode="numeric"
              style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
              value={item?.details?.dimensions?.height}
              onChangeText={(value) =>
                setItem({
                  ...item,
                  details: {
                    ...item?.details,
                    dimensions: { ...item?.details?.dimensions, height: value },
                  },
                })
              }
            />
          </View>
          <View style={styles.dimensionsInputs}>
            <Text style={[globalStyles.generalText, { flex: 1 }]}>
              weight(Kg)
            </Text>
            <TextInput
              placeholder="weight"
              keyboardType="number-pad"
              inputMode="numeric"
              style={[globalStyles.input, { flex: 1, marginLeft: 20 }]}
              value={item?.details?.dimensions?.weight}
              onChangeText={(value) =>
                setItem({
                  ...item,
                  details: {
                    ...item?.details,
                    dimensions: { ...item?.details?.dimensions, weight: value },
                  },
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  multilineInput: {
    width: "100%",
    borderColor: colors.border,
    height: 90,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: colors.textPrimary,
    textAlignVertical: "top",
    fontSize: 15,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#34495e",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dimensionsInputs: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 25,
  },
  scrollViewContainer: {
    backgroundColor: colors.background,
    paddingTop: 15,
  },
});
