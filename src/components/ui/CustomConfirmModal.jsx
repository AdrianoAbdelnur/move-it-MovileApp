import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export const CustomConfirmModal = ({
  showModal,
  setShowModal,
  text,
  confirmFunction = () => setShowModal(false),
}) => {
  return (
    <Modal transparent={showModal} visible={showModal} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentModal}>
          <Text>{text}</Text>
          <View style={styles.buttonsContainer}>
            <Pressable onPress={() => setShowModal(false)}>
              <Text
                style={[
                  styles.modalButton,
                  { backgroundColor: "red", color: "white" },
                ]}
              >
                cancel
              </Text>
            </Pressable>
            <Pressable onPress={confirmFunction}>
              <Text style={styles.modalButton}>confirm</Text>
            </Pressable>
          </View>
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
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    minWidth: "80%",
  },
  modalText: {
    fontSize: 12,
    color: "white",
    marginBottom: 5,
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
  modalTitleError: {
    color: "red",
    fontSize: 20,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
