import React, { useContext, useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";
import { View } from "react-native";
import { FormContext } from "../contexts/FormContext";

export const InputAutocomplete = ({ placeHolder }) => {
  const { formData, setFormData } = useContext(FormContext);
  const autocompleteRef = useRef(null);

  const handleSelection = (data, details) => {
    console.log(data, details);
    setFormData({
      ...formData,
      directions: [
        ...formData.directions,
        {
          description: details.formatted_address,
          place_id: details.place_id,
          location: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
          address_components: details.address_components,
        },
      ],
    });
    setTimeout(() => {
      autocompleteRef.current.setAddressText("");
    }, 100);
  };

  return (
    <View>
      <GooglePlacesAutocomplete
        ref={autocompleteRef}
        placeholder={placeHolder}
        fetchDetails
        onPress={(data, details = null) => handleSelection(data, details)}
        query={{
          key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "en",
          components: "country:au",
        }}
      />
    </View>
  );
};
