import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import colors from "../../../styles/colors";
import axios from "axios";
import { NextButton } from "../../../components/ui/NextButton";
import { FormContext } from "../../../contexts/FormContext";

export const Directions = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (origin && destination) {
      getDirections();
      setFormData({
        ...formData,
        directions: { from: origin, to: destination },
      });
    }
  }, [destination]);

  useEffect(() => {
    setDate(Math.floor(formData?.date?.getTime() / 1000));
  }, [formData]);

  const getDirections = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        {
          params: {
            origin: `place_id:${origin.place_id}`,
            destination: `place_id:${destination.place_id}`,
            key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
            mode: "driving",
            departure_time: date,
          },
        }
      );
      const result = response?.data?.routes[0]?.legs[0];
      setDistance(result?.distance?.text);
      setDuration(result?.duration?.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.searchContainer}>
            <Text style={globalStyles.generalInformationText}>
              Where do you want to transport the load from
            </Text>
            <GooglePlacesAutocomplete
              style={styles.input}
              placeholder="from"
              onPress={(data, details = null) => {
                setOrigin({
                  description: data.description,
                  place_id: data.place_id,
                });
              }}
              query={{
                key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: "en",
              }}
            />
            <Text
              style={[globalStyles.generalInformationText, { marginTop: 25 }]}
            >
              Where do you want to transport the load to
            </Text>
            <GooglePlacesAutocomplete
              placeholder="to"
              onPress={(data, details = null) => {
                console.log(data, details);
                setDestination({
                  description: data.description,
                  place_id: data.place_id,
                });
              }}
              query={{
                key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: "en",
              }}
            />
          </View>
        </View>
        {distance && duration && (
          <View>
            <Text style={globalStyles.generalInformationText}>
              Distance: {distance}
            </Text>
            <Text style={globalStyles.generalInformationText}>
              Duration: {duration}
            </Text>
          </View>
        )}
        <NextButton navigateTo={"Confirmation"} />
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
    width: "90%",
    backgroundColor: colors.background,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  googleInput: {
    backgroundColor: "red",
    borderColor: "#888",
    borderWidth: 1,
    fontSize: 55,
  },
});
