import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const InputAutocomplete = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: "AIzaSyBmDIMyaD8ygX-9QWtnEBTD201A_mu5Iv8",
        language: "en",
      }}
    />
  );
};
