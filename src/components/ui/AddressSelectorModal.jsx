import React, { useEffect, useRef } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";

export const AddressSelectorModal = ({
  showModal,
  setShowModal,
  setAddressToShow,
  setCenterLocation,
  setDistanceOption,
}) => {
  const autocompleteRef = useRef(null);
  const closeModal = () => {
    setShowModal(false);
  };

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
    if (newDir) {
      setAddressToShow(newDir.description);
      setCenterLocation(newDir.location);
      closeModal();
    }
  };

  const cancelSelection = () => {
    setDistanceOption("any");
    closeModal();
  };

  return (
    <Modal transparent={true} visible={showModal} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentModal}>
          <Text>Select an address</Text>
          {
            <GooglePlacesAutocomplete
              ref={autocompleteRef}
              placeholder="select a location"
              fetchDetails
              onPress={(data, details = null) => handleSelection(data, details)}
              query={{
                key: EXPO_PUBLIC_GOOGLE_MAP_KEY,
                language: "en",
                components: "country:au",
              }}
            />
          }
          <Text
            onPress={() => cancelSelection()}
            style={{ alignSelf: "flex-end" }}
          >
            cancel
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentModal: {
    backgroundColor: "#696969",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    minWidth: "80%",
    maxHeight: "70%",
  },
  accordionHeader: {
    padding: 10,
    backgroundColor: "#0000CD",
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionHeaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionIcon: {
    marginLeft: 10,
  },
  accordionContent: {
    overflow: "hidden",
  },
  accordionInnerContent: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalButton: {
    backgroundColor: "gray",
    textAlign: "center",
    marginLeft: "auto",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 15,
    fontSize: 15,
    margin: 8,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
