import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { ScrollView } from "react-native-gesture-handler";

export const NotiModal = ({
  modalVisible,
  closeNotiModal,
  notiList,
  setChatWith,
}) => {
  const navigation = useNavigation();
  const { state: userState } = useContext(AuthContext);

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
        <ScrollView style={styles.modalContent}>
          {notiList?.map((noti) => {
            if (noti.type === "transportCancelled") {
              return (
                <TouchableOpacity
                  key={noti.post._id + noti.type}
                  onPress={() => {
                    navigation.navigate("Details", { data: noti.post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>
                      We're sorry, but {noti.post.transportCancel[0].given_name}{" "}
                      canceled the service for your post {noti.post.title}.
                    </Text>
                    {noti.post.status.mainStatus === "expired" ? (
                      <Text style={styles.secondaryNotiText}>
                        And the post has also expired. Please update the date to
                        receive new offers or cancel it
                      </Text>
                    ) : noti.post.offers.length > 0 ? (
                      <Text style={styles.secondaryNotiText}>
                        Please choose another offer or wait for new ones.
                      </Text>
                    ) : (
                      <Text style={styles.secondaryNotiText}>
                        Let´s whait for new offers
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }
            if (noti.type === "newOffer") {
              return (
                <TouchableOpacity
                  key={noti.post._id + noti.type}
                  onPress={() => {
                    navigation.navigate("Details", { data: noti.post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>
                      You have new offers in your post for {noti?.post?.title}
                    </Text>
                    <Text style={styles.secondaryNotiText}>See the offers</Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (noti.type === "transportDone") {
              return (
                <TouchableOpacity
                  key={noti.post._id + noti.type}
                  onPress={() => {
                    navigation.navigate("Details", { data: noti.post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>Transport {noti.post.title} done</Text>
                    <Text style={styles.secondaryNotiText}>
                      Confirm the transport
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (noti.type === "postExpired") {
              return (
                <TouchableOpacity
                  key={noti.post._id + noti.type}
                  onPress={() => {
                    navigation.navigate("Details", { data: noti.post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>Post {noti.post.title} is expired</Text>
                    <Text style={styles.secondaryNotiText}>
                      Change the date or cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (noti.type === "newMessage") {
              return (
                <TouchableOpacity
                  key={noti.post._id + noti.type}
                  onPress={() => {
                    setChatWith(
                      userState.user.role === "user"
                        ? noti.post.offerSelected.owner.given_name
                        : noti.post.owner.given_name
                    );
                    navigation.navigate("chat", {
                      post: noti.post,
                    });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>
                      You have a new message in your posts {noti.post.title}
                    </Text>
                    <Text style={styles.secondaryNotiText}>
                      See the message
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }

            if (noti.type === "offerAcepted") {
              return (
                <TouchableOpacity
                  key={noti.post._id + noti.type}
                  onPress={() => {
                    navigation.navigate("Details", { data: noti.post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>
                      {noti.post.owner.given_name} has selected your offer for{" "}
                      {noti.post.title}.
                    </Text>
                    <Text style={styles.secondaryNotiText}>See details</Text>
                  </View>
                </TouchableOpacity>
              );
            }
            if (noti.type === "OfferSelectedExpired") {
              return (
                <TouchableOpacity
                  key={noti.post._id + noti.type}
                  onPress={() => {
                    navigation.navigate("Details", { data: noti.post });
                    closeNotiModal();
                  }}
                >
                  <View style={styles.notiContainer}>
                    <Text>Post {noti.post.title} is expired</Text>
                    <Text style={styles.secondaryNotiText}>
                      You can initiate it when you are ready or cancel it asking
                      for help if you have a problem
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={closeNotiModal}>
          <Text style={styles.closeButtonText}>close</Text>
        </TouchableOpacity>
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
