import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";

export const InputAutocomplete = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {}}
      query={{
        key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
        language: "en",
      }}
    />
  );
};
