import React, { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";
import { usePushNotifications } from "../../hooks/usePushNotifications";

export const CustomCancelModal = ({ showModal, setShowModal, post }) => {
  const { state: userState, addCancellation } = useContext(AuthContext);
  const { addPost, uptateStatus } = useContext(PostContext);
  const { sendPushNotification } = usePushNotifications();
  const navigation = useNavigation();

  const cancelService = () => {
    if (userState.user.role === "transport") {
      const newOffersList = post.offers.filter(
        (offer) => offer != post.offerSelected._id
      );
      const newPost = {
        ...post,
        offers: newOffersList,
        status: {
          ...post?.status,
          mainStatus: "pending",
          transportCancelled: true,
        },
        offerSelected: null,
        transportCancel: [userState?.user?.id, ...(post.transportCancel || [])],
      };
      addPost(newPost);
      sendPushNotification(
        post?.owner.expoPushToken,
        "Service Canceled",
        `${userState?.user?.given_name} has canceled the service for a ${post.title}`
      );
      navigation.navigate("driverHome");
    } else if (
      userState.user.role === "user" &&
      post.status.mainStatus === "offerSelected"
    ) {
      uptateStatus({
        postId: post._id,
        newStatus: {
          ...post.status,
          mainStatus: "cancelled",
          userCancelled: true,
        },
      });
      sendPushNotification(
        post?.offerSelected.owner.expoPushToken,
        "Service Canceled",
        `${userState?.user?.given_name} has canceled the service for a ${post.title}`
      );
      navigation.navigate("PostsList");
    } else if (
      userState.user.role === "user" &&
      post.status.mainStatus !== "offerSelected"
    ) {
      uptateStatus({
        postId: post._id,
        newStatus: {
          ...post.status,
          mainStatus: "cancelled",
        },
      });
      navigation.navigate("PostsList");
    }
    const cancellationInfo = {
      serviceId: post._id,
      cancelledDate: new Date().toISOString(),
      ...(userState?.user?.role === "user" && { refunded: false }),
    };
    addCancellation(cancellationInfo);
    setShowModal(false);
  };

  return (
    <Modal transparent={true} visible={showModal} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentModal}>
          {userState.user.role === "user" &&
            post.status.mainStatus === "offerSelected" && (
              <Text>
                Are you sure you want to cancel the service? Please note that,
                according to our terms and conditions, canceling a service after
                it has been accepted will incur a fee. Would you like to confirm
                the cancellation or proceed with the service?
              </Text>
            )}
          {userState.user.role === "user" &&
            post.status.mainStatus !== "offerSelected" && (
              <Text>
                Are you sure you want to cancel the service? Would you like to
                confirm the cancellation or proceed with the service?
              </Text>
            )}
          {userState.user.role === "transport" && (
            <View>
              <Text>
                We understand that you may have issues that require you to
                cancel, so we won't charge you anything this time. However,
                fulfilling our commitments is a priority, so please be aware
                that frequent cancellations may result in a temporary or
                permanent suspension of your account. Please let us know if
                there's anything we can do to assist you.
              </Text>
              <Text
                style={{ color: "blue", textAlign: "right" }}
                onPress={() => console.log("ask")}
              >
                Ask for help
              </Text>
            </View>
          )}
          <View style={styles.buttonsContainer}>
            <Pressable onPress={cancelService}>
              <Text
                style={[
                  styles.modalButton,
                  { backgroundColor: "red", color: "white" },
                ]}
              >
                cancel service
              </Text>
            </Pressable>
            <Pressable onPress={() => setShowModal(false)}>
              <Text style={styles.modalButton}>Keep service</Text>
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
