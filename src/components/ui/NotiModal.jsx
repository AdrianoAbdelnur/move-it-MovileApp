import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const NotiModal = ({ modalVisible, closeNotiModal, notiList }) => {
  const navigation = useNavigation();
  const [transportInfo, setTransportInfo] = useState({});

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy > 50) {
        closeNotiModal();
      }
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeNotiModal}
    >
      <View style={styles.modalContainer} {...panResponder.panHandlers}>
        <View style={styles.modalContent}>
          {notiList.map((post) => {
            if (post.status === "newOffers") {
              return (
                <TouchableOpacity
                  key={post._id}
                  onPress={() => {
                    navigation.navigate("Details", { data: post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>
                      You have new offers in your post for {post.goodsType}
                    </Text>
                    <Text style={styles.secondaryNotiText}>
                      Confirm the transport
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (post.status === "transportDone") {
              return (
                <TouchableOpacity
                  key={post._id}
                  onPress={() => {
                    navigation.navigate("Details", { data: post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>Transport {post.goodsType} done</Text>
                    <Text style={styles.secondaryNotiText}>
                      Confirm the transport
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
          <TouchableOpacity style={styles.closeButton} onPress={closeNotiModal}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 50,
  },
  modalContent: {
    width: "80%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    position: "absolute",
    backgroundColor: "blue",
    padding: 10,
    bottom: 20,
    right: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  notiContainer: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
  },
  secondaryNotiText: {
    alignSelf: "center",
    color: "blue",
  },
});
