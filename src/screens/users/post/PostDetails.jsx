import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { ItemsListShower } from "../../../components/itemsList/ItemsListShower";
import { ScrollView } from "react-native-gesture-handler";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { PostContext } from "../../../contexts/PostsContext";
import { FormContext } from "../../../contexts/FormContext";
import { clientAxios } from "../../../api/ClientAxios";
import { CustomCancelModal } from "../../../components/ui/CustomCancelModal";
import { CustomConfirmModal } from "../../../components/ui/CustomConfirmModal";
import { usePushNotifications } from "../../../hooks/usePushNotifications";
import CountdownTimer from "../../../components/ui/CountdownTimer ";

export const PostDetails = ({ route }) => {
  const navigation = useNavigation();

  const { state: userState } = useContext(AuthContext);
  const {
    state: postsState,
    uptateStatus,
    addPost,
    clearAlertMsg,
  } = useContext(PostContext);
  const { sendPushNotification } = usePushNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const { formData, setFormData } = useContext(FormContext);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [data, setData] = useState({});
  const { data: dato } = route.params;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [confirmationFuction, setConfirmationFuction] = useState(null);
  const [myActiveOffer, setMyActiveOffer] = useState(false);
  const [lastOfferExpired, setLastOfferExpired] = useState(false);

  useEffect(() => {
    setData(postsState?.posts?.find((post) => post._id === dato._id));
  }, [postsState]);

  useEffect(() => {
    if (data?.status?.transportCancelled) {
      uptateStatus({
        postId: data._id,
        newStatus: {
          ...data.status,
          transportCancelled: false,
        },
      });
    }
    if (data?.status?.offerAcepted && userState.user.role === "transport") {
      uptateStatus({
        postId: data._id,
        newStatus: {
          ...data.status,
          offerAcepted: false,
        },
      });
    }
    if (userState.user.role === "transport" && data?.offers?.length > 0) {
      setMyActiveOffer(checkOffer());
    }
  }, [data]);

  let fDate = "";
  let fTime = "";

  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    fDate = `${day}/${month}/${year}`;
    fTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const toggleDropdown = (currentLeg) => {
    setIsOpen({ ...isOpen, [currentLeg]: !isOpen[currentLeg] });
  };

  const cancelPost = () => {
    uptateStatus({
      postId: data._id,
      newStatus: {
        ...data.status,
        mainStatus: "cancelled",
      },
    });
    navigation.navigate("home");
  };

  const changeDate = async () => {
    try {
      await clientAxios.patch("/offer/modifyStatus", {
        offerId: data.offers,
        newStatus: "expired",
      });
    } catch (error) {
      console.log(error);
    }
    if (data?.date?.timeDay !== "now") {
      setFormData({
        ...data,
        date: { ...data.date, date: new Date(data.date.date) },
        status: { ...data.status, mainStatus: "pending", newOffers: false },
        offerSelected: null,
      });
      navigation.navigate("Date");
    } else {
      const formData = {
        ...data,
        date: { ...data.date, date: new Date() },
        status: { ...data.status, mainStatus: "pending", newOffers: false },
        offerSelected: null,
      };
      addPost(formData);
    }
  };

  const getImage = async (imageType) => {
    try {
      const { data: image } = await clientAxios(
        "/user/getImage/" + data?.offerSelected?.owner?._id + "/" + imageType
      );
      if (image.imageData) {
        navigation.navigate("Image", { image: image.imageData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postsState.alertMsg === "Post updated successfully") {
      Alert.alert("POST INFORMATION", postsState.alertMsg, [
        {
          text: "OK",
          onPress: () => handleOk(),
        },
      ]);
    }
  }, [postsState]);

  const handleOk = () => {
    clearAlertMsg();
    navigation.navigate("home");
    setFormData({});
  };

  const confirmInitiateFuction = () => {
    setModalText(`Are you ready to initiate this service?`);
    setShowConfirmModal(true);
    setConfirmationFuction(() => () => {
      uptateStatus({
        postId: data._id,
        newStatus: {
          ...data.status,
          mainStatus: "inProgress",
        },
      });
      sendPushNotification(
        data?.owner.expoPushToken,
        "Service started",
        `${userState?.user?.given_name} has started the service for ${data?.title}`
      );
      setConfirmationFuction(null);
      setShowConfirmModal(false);
    });
  };

  const confirmCompletedFuction = () => {
    setModalText(
      `Do you confirm that you have completed the service? Once confirmed, you will need to wait for the user's confirmation.`
    );
    setShowConfirmModal(true);
    setConfirmationFuction(() => () => {
      uptateStatus({
        postId: data._id,
        newStatus: {
          ...data.status,
          mainStatus: "transportDone",
        },
      });
      sendPushNotification(
        data?.owner.expoPushToken,
        "Service completed",
        `${userState?.user?.given_name} reports that the service for ${data?.title} has been completed`
      );
      setShowConfirmModal(false);
      navigation.navigate("driverHome");
    });
  };

  const checkOffer = () => {
    const myOfferFound = data.offers.find((offer) => {
      return (
        offer?.owner?._id === userState?.user?.id && offer.status === "Pending"
      );
    });
    if (myOfferFound) {
      const now = new Date().getTime();

      if (new Date(myOfferFound?.expiredTime).getTime() < now) {
        updateOfferStatus(myOfferFound._id);
        return false;
      } else return myOfferFound;
    } else return false;
  };

  const updateOfferStatus = async (id) => {
    try {
      const { data } = await clientAxios.patch("/offer/modifyStatus", {
        offerId: id,
        newStatus: "expired",
      });
      const { updatedOffers: newOffer } = data;
      modifyOfferInPost({
        ownerId: userState.user.id,
        ownerName: userState.user.given_name,
        postId: newOffer.post,
        newOfferId: newOffer._id,
        expiredTime: newOffer.expiredTime,
        status: newOffer.status,
        price: newOffer.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const nonExpiredOffers = (offers) => {
    const now = new Date().getTime();
    const nonExpired = offers.find(
      (offer) => new Date(offer.expiredTime).getTime() > now
    );
    if (nonExpired) {
      return true;
    } else {
      if (data.status.newOffers === true) {
        uptateStatus({
          postId: data._id,
          newStatus: { ...data.status, newOffers: false },
        });
      }
      return false;
    }
  };

  const checkLastOffer = () => {
    const now = new Date().getTime();
    const expiredTimeLastOffer = offers[offers.length - 1].expiredTime;
    if (new Date(expiredTimeLastOffer).getTime() < now) {
      return true;
    } else return false;
  };

  return (
    <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={globalStyles.generalText}>Title : {data?.title}</Text>
        {formatDate(data?.date?.date)}
        {userState.user.role === "transport" && (
          <Text style={globalStyles.generalText}>
            Owner: {data?.owner?.given_name}
          </Text>
        )}
        {data?.date?.timeDay === "specificTime" ? (
          <Text style={globalStyles.generalText}>
            Date: {fDate} at {fTime}
          </Text>
        ) : (
          <Text style={globalStyles.generalText}>Date: {fDate}</Text>
        )}
        {data?.date?.timeDay !== "specificTime" && (
          <Text style={globalStyles.generalText}>
            time of day: {data?.date?.timeDay}
          </Text>
        )}

        {data?.directions?.map((dir, index) => {
          const splitedDir = dir.description.split(",");
          const currentLeg = `leg${index + 1}`;
          return (
            <View key={splitedDir + index}>
              {index == 0 ? (
                <Text style={[globalStyles.generalText, { marginBottom: 0 }]}>
                  From: {splitedDir[0]}
                </Text>
              ) : index == data?.directions.length - 1 ? (
                <Text style={[globalStyles.generalText, { marginBottom: 0 }]}>
                  End of the Route: {splitedDir[0]}
                </Text>
              ) : (
                <Text style={[globalStyles.generalText, { marginBottom: 0 }]}>
                  To: {splitedDir[0]}
                </Text>
              )}
              {data.itemsDetails?.[currentLeg]?.description && (
                <View style={styles.detailsContainer}>
                  <View style={styles.arrowContainer}>
                    <View style={styles.arrowLine} />
                    <View style={styles.arrowHeadTop} />
                    <View style={styles.arrowHeadBottom} />
                  </View>
                  <View
                    style={{
                      marginLeft: 30,
                      backgroundColor: "gray",
                      borderRadius: 15,
                      padding: 10,
                      width: "80%",
                    }}
                  >
                    <Text style={globalStyles.generalText}>
                      Goods Details in this leg:
                    </Text>
                    <Text
                      style={[
                        globalStyles.generalInformationText,
                        { marginLeft: 20 },
                      ]}
                    >
                      description:{" "}
                      {data.itemsDetails?.[currentLeg]?.description}
                    </Text>
                    {data?.itemsDetails?.[currentLeg]?.itemsList?.length >
                      0 && (
                      <View style={{ marginLeft: 20 }}>
                        <TouchableOpacity
                          style={styles.header}
                          onPress={() => toggleDropdown(currentLeg)}
                        >
                          <Text style={globalStyles.generalInformationText}>
                            Items List
                          </Text>
                          <Entypo
                            name={
                              isOpen[currentLeg] ? "chevron-up" : "chevron-down"
                            }
                            size={24}
                            color="black"
                          />
                        </TouchableOpacity>
                        {isOpen[currentLeg] &&
                          data?.itemsDetails?.[currentLeg]?.itemsList.map(
                            (item, index) => (
                              <ItemsListShower
                                key={index}
                                item={item}
                                index={index}
                              />
                            )
                          )}
                      </View>
                    )}
                    {data.itemsDetails[currentLeg].photoItems && (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Image", {
                            image: data.itemsDetails[currentLeg].photoItems,
                          })
                        }
                      >
                        <Text
                          style={[
                            globalStyles.generalInformationText,
                            { marginLeft: 20, marginTop: 10, color: "blue" },
                          ]}
                        >
                          View attached image
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Text>
                      distance: {data?.itemsDetails?.[currentLeg]?.distance}
                    </Text>
                    <Text>
                      duration: {data?.itemsDetails?.[currentLeg]?.duration}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        {data.offerSelected && userState.user.role === "user" && (
          <>
            <Text style={globalStyles.generalText}>
              Transport Selected: {data?.offerSelected?.owner?.given_name}
            </Text>
            <TouchableOpacity onPress={() => getImage("profilePhotoImg")}>
              <Text
                style={[
                  globalStyles.generalText,
                  { marginLeft: 20, color: "#FFFF00" },
                ]}
              >
                View {data?.offerSelected?.owner?.given_name} profile photo
              </Text>
            </TouchableOpacity>
          </>
        )}
        {userState.user.role === "transport" && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Maps", {
                directions: data.directions,
              })
            }
          >
            <Text
              style={[
                globalStyles.generalText,
                { marginLeft: 20, color: "blue" },
              ]}
            >
              View map
            </Text>
          </TouchableOpacity>
        )}
        {userState.user.role === "transport" &&
          data?.status?.mainStatus === "complaint" && (
            <Text style={globalStyles.generalInformationText}>
              This service has an ongoing complaint. We will help you resolve it
              as soon as possible.{" "}
            </Text>
          )}
        {userState.user.role === "transport" &&
          data?.status?.mainStatus === "offerSelected" && (
            <GeneralButton
              text="initiate service"
              onPressFunction={() => confirmInitiateFuction()}
            />
          )}
        {userState.user.role === "transport" &&
          data?.status?.mainStatus === "inProgress" && (
            <GeneralButton
              text="Service completed"
              onPressFunction={() => confirmCompletedFuction()}
            />
          )}
        {myActiveOffer
          ? userState.user.role == "transport" && (
              <View>
                <Text style={globalStyles.generalText}>
                  You have already made an offer for this job, and your offer
                  was {myActiveOffer?.price} AUD
                </Text>
                <View style={styles.expireContainer}>
                  <Text style={[globalStyles.generalText, { marginRight: 5 }]}>
                    Expire in:
                  </Text>
                  <CountdownTimer
                    expiredTime={myActiveOffer.expiredTime}
                    onExpire={() => setMyActiveOffer(checkOffer())}
                  />
                </View>
              </View>
            )
          : userState.user.role == "transport" &&
            data?.status?.mainStatus === "pending" && (
              <GeneralButton
                text="Make an offer"
                onPressFunction={() => navigation.navigate("Offer", { data })}
              />
            )}
        {userState.user.role === "user" &&
          data?.status?.mainStatus === "pending" &&
          checkLastOffer && (
            <Text style={[globalStyles.generalInformationText, { margin: 10 }]}>
              Some of your offers have expired
            </Text>
          )}
        {userState.user.role === "user" &&
          data?.status?.mainStatus === "pending" &&
          nonExpiredOffers(data?.offers) && (
            <TouchableOpacity
              style={globalStyles.OptionsButton}
              onPress={() => navigation.navigate("OffersList", { data })}
            >
              <Text style={globalStyles.textButtons}>See offers</Text>
            </TouchableOpacity>
          )}
        {userState.user.role === "user" &&
          data?.status?.mainStatus === "transportDone" && (
            <TouchableOpacity
              style={globalStyles.OptionsButton}
              onPress={() => navigation.navigate("TransporConfirm", { data })}
            >
              <Text style={globalStyles.textButtons}>Confirm transport</Text>
            </TouchableOpacity>
          )}
        {userState.user.role === "user" &&
          data?.status?.mainStatus === "expired" && (
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <GeneralButton
                text={
                  data?.date?.timeDay === "now" ? "Repost now" : "Change Date"
                }
                onPressFunction={changeDate}
              />
              <GeneralButton text="cancel Post" onPressFunction={cancelPost} />
            </View>
          )}
        {((data?.status?.mainStatus === "pending" &&
          userState.user.role === "user") ||
          data?.status?.mainStatus === "offerSelected" ||
          data?.status?.mainStatus === "inProgress") && (
          <View style={styles.cancelButtonContainer}>
            <Text style={globalStyles.generalInformationText}>
              If you need to cancel the service,{" "}
              <Text
                style={styles.pressHereText}
                onPress={() => setShowCancelModal(true)}
              >
                press here
              </Text>
              .
            </Text>
            <CustomCancelModal
              showModal={showCancelModal}
              setShowModal={setShowCancelModal}
              post={data}
            />
          </View>
        )}
      </ScrollView>
      <CustomConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        text={modalText}
        confirmFunction={confirmationFuction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 15,
  },
  arrowLine: {
    width: 2,
    flex: 1,
    backgroundColor: "white",
  },
  arrowHeadTop: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    position: "absolute",
    top: 0,
  },
  arrowHeadBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    position: "absolute",
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  detailsItemContainer: {
    width: "100%",
    flexDirection: "column",
  },
  cancelButtonContainer: {
    marginTop: 70,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  pressHereText: {
    fontSize: 14,
    color: "#FFFF00",
    fontWeight: "bold",
  },
  expireContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
