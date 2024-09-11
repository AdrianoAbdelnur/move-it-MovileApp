import React, { useContext, useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../styles/colors";
import { AuthContext } from "../../contexts/AuthContext";

export const CustomModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { state: AuthState, updateMessage } = useContext(AuthContext);

  useEffect(() => {
    if (AuthState?.message?.message && AuthState?.message?.message !== "") {
      console.log("Aqui", AuthState?.message?.message);
      setShowModal(true);
    }
  }, [AuthState?.message?.message]);

  return (
    <Modal transparent={true} visible={showModal} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentModal}>
          {AuthState?.message?.type && (
            <Text
              style={
                AuthState?.message?.type == "Error"
                  ? styles.modalTitleError
                  : ""
              }
            >
              {AuthState?.message?.type} !
            </Text>
          )}
          <Text style={styles.modalText}>{AuthState?.message?.message}</Text>
          <Pressable
            onPress={() => {
              setShowModal(false);
              updateMessage();
            }}
          >
            <Text style={styles.modalButton}>Ok</Text>
          </Pressable>
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
    fontSize: 15,
    color: "white",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: colors.primary,
    textAlign: "center",
    marginLeft: "auto",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  modalTitleError: {
    color: "red",
    fontSize: 20,
  },
});
