import React, { useContext, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import colors from "../../../styles/colors";
import { NextButton } from "../../../components/ui/NextButton";
import { FormContext } from "../../../contexts/FormContext";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { useUpdateObj } from "../../../hooks/useUpdateObj";

export const Directions = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const autocompleteRef = useRef(null);
  const [directionSelected, setDirectionSelected] = useState(null);
  const [updateObj] = useUpdateObj(setFormData);

  const handleSelection = (data, details) => {
    const newDir = {
      description: details.formatted_address,
      place_id: details.place_id,
      location: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      },
      addressComponents: details.address_components,
    };
    if (directionSelected != null) {
      updateObj(
        "directions",
        formData.directions.map((dir, index) =>
          index == directionSelected ? newDir : dir
        )
      );
      setTimeout(() => {
        autocompleteRef.current.setAddressText("");
      }, 100);
      setDirectionSelected(null);
    } else updateObj("directions", [...formData.directions, newDir]);
    setTimeout(() => {
      autocompleteRef.current.setAddressText("");
    }, 100);
  };

  const changeDirection = (index) => {
    setDirectionSelected((prevIndex) => {
      if (prevIndex !== index) {
        return index;
      }
      if (prevIndex === index) {
        return null;
      }
    });
  };

  const removeDirection = (index) => {
    updateObj(
      "directions",
      formData.directions.filter((dir, i) => index !== i)
    );
  };

  const checkInfo = () => {
    if (formData?.directions?.length > 1) {
      navigation.navigate("DetailsSelector");
    } else
      alert(
        "You must select at least one starting address and one destination address for your delivery"
      );
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.searchContainer}>
            {formData.directions == 0 || directionSelected == 0 ? (
              <Text style={globalStyles.generalInformationText}>
                Where do you want to transport the load from?
              </Text>
            ) : (
              <Text style={globalStyles.generalInformationText}>
                Where do you want to transport the load to?
              </Text>
            )}
            <GooglePlacesAutocomplete
              ref={autocompleteRef}
              placeholder={
                formData?.directions?.length == 0 || directionSelected == 0
                  ? "From"
                  : formData?.directions?.length == 1 || directionSelected == 1
                  ? "to"
                  : "add a new leg"
              }
              fetchDetails
              onPress={(data, details = null) => handleSelection(data, details)}
              query={{
                key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: "en",
                components: "country:au",
              }}
            />
          </View>
        </View>
        <ScrollView style={styles.directionsList}>
          {formData?.directions?.map((dir, index) => {
            const splitedDir = dir.description.split(",");
            return (
              <TouchableOpacity
                key={dir.description + index}
                onPress={() => changeDirection(index)}
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginHorizontal: 10,
                  marginVertical: 8,
                  padding: 4,
                  backgroundColor: "#260026",
                }}
              >
                {index == 0 ? (
                  <Text style={globalStyles.generalText}>Start From</Text>
                ) : index == formData?.directions?.length - 1 ? (
                  <Text style={globalStyles.generalText}>End of the Route</Text>
                ) : (
                  <Text style={globalStyles.generalText}>To</Text>
                )}
                {index !== directionSelected ? (
                  <View style={styles.directionContainer}>
                    <View style={{ flex: 6 }}>
                      <Text
                        style={[
                          globalStyles.generalText,
                          { marginBottom: 0, marginLeft: 15 },
                        ]}
                      >
                        {splitedDir[0]}
                      </Text>
                      <Text
                        style={[
                          globalStyles.generalInformationText,
                          { marginLeft: 20 },
                        ]}
                      >
                        {splitedDir.slice(1).join(", ")}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => removeDirection(index)}
                    >
                      <Entypo name="trash" size={28} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text
                    style={[
                      globalStyles.generalInformationText,
                      { marginLeft: 20 },
                    ]}
                  >
                    Where?
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <NextButton toDo={checkInfo} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
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
    flex: 1,
    position: "absolute",
    backgroundColor: colors.background,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  googleInput: {
    backgroundColor: "red",
    borderColor: "#888",
    borderWidth: 1,
    fontSize: 55,
  },
  directionsList: {
    position: "absolute",
    width: "100%",
    height: "50%",
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    zIndex: -1,
  },
  directionContainer: {
    flexDirection: "row",
  },
});
