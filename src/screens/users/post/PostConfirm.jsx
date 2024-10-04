import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { PostContext } from "../../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";
import { FormContext } from "../../../contexts/FormContext";
import { Entypo } from "@expo/vector-icons";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { ItemsListShower } from "../../../components/itemsList/ItemsListShower";
import axios from "axios";
import { useUpdateObj } from "../../../hooks/useUpdateObj";
import { LoadingComponent } from "../../../components/ui/LoadingComponent";

export const PostConfirm = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const { addPost, state: postsState, clearAlertMsg } = useContext(PostContext);
  const { formatDate, fDate, fTime } = useFormatDate();
  const [isOpen, setIsOpen] = useState(false);
  const [updateObj] = useUpdateObj(setFormData);

  useEffect(() => {
    for (let i = 0; i < formData?.directions?.length - 1; i++) {
      getRouteInfo(
        formData?.directions[i].place_id,
        formData?.directions[i + 1].place_id,
        (currentLeg = `leg${i + 1}`)
      );
    }
    if (formData.date.date) {
      formatDate(formData.date.date);
    }
    const legsQuantity = Object.keys(formData?.itemsDetails).length;
    let legsObjet = {};
    for (let i = 1; i <= legsQuantity; i++) {
      legsObjet[`leg${i}`] = false;
    }
    setIsOpen(legsObjet);
  }, []);

  useEffect(() => {
    if (postsState.alertMsg === "New Post added successfully") {
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

  const onSubmit = () => {
    addPost(formData);
  };

  const toggleDropdown = (currentLeg) => {
    setIsOpen({ ...isOpen, [currentLeg]: !isOpen[currentLeg] });
  };

  const getRouteInfo = async (origin, destination, currentLeg) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${EXPO_PUBLIC_GOOGLE_MAP_KEY}`
      );
      const route = response.data.routes[0];
      const distance = route.legs[0].distance.text;
      const duration = route.legs[0].duration.text;
      updateObj(`itemsDetails.${currentLeg}.duration`, duration);
      updateObj(`itemsDetails.${currentLeg}.distance`, distance);
    } catch (error) {
      console.log(error);
    }
  };

  if (postsState.isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={globalStyles.generalText}>Title : {formData?.title}</Text>
        <Text style={globalStyles.generalText}>date : {fDate}</Text>
        {formData?.date?.timeDay === "specificTime" ? (
          <Text style={globalStyles.generalText}>time : {fTime}</Text>
        ) : (
          <Text style={globalStyles.generalText}>
            time: {formData?.date?.timeDay}
          </Text>
        )}
        {formData?.directions?.map((dir, index) => {
          const splitedDir = dir.description.split(",");
          const currentLeg = `leg${index + 1}`;
          return (
            <View key={splitedDir + index}>
              {index == 0 ? (
                <Text style={[globalStyles.generalText, { marginBottom: 0 }]}>
                  From: {splitedDir[0]}
                </Text>
              ) : index == formData?.directions.length - 1 ? (
                <Text style={[globalStyles.generalText, { marginBottom: 0 }]}>
                  End of the Route: {splitedDir[0]}
                </Text>
              ) : (
                <Text style={[globalStyles.generalText, { marginBottom: 0 }]}>
                  To: {splitedDir[0]}
                </Text>
              )}
              {formData.itemsDetails?.[currentLeg]?.description && (
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
                      {formData.itemsDetails?.[currentLeg]?.description}
                    </Text>
                    {formData?.itemsDetails?.[currentLeg]?.itemsList?.length >
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
                          formData?.itemsDetails?.[currentLeg]?.itemsList.map(
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
                    {formData.itemsDetails[currentLeg].photoItems && (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Image", {
                            image: formData.itemsDetails[currentLeg].photoItems,
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
                      distance: {formData.itemsDetails[currentLeg].distance}
                    </Text>
                    <Text>
                      duration: {formData.itemsDetails[currentLeg].duration}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <GeneralButton text="Confirm" onPressFunction={onSubmit} />
        </View>
      </ScrollView>
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
  listItem: {
    /* borderBottomWidth: 1,
    borderBottomColor: "#ddd", */
  },
  detailsItemContainer: {
    width: "100%",
    flexDirection: "column",
  },
});
