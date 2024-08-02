import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
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
import colors from "../../../styles/colors";
import { GeneralButton } from "../../../components/ui/GeneralButton";

export const PostConfirm = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const { addPost, state: postsState, clearAlertMsg } = useContext(PostContext);
  const { formatDate, fDate, fTime } = useFormatDate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
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
    if (postsState.alertMsg === "New Post added") {
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

  const handleItemPress = (index) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };

  return (
    <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
      <Text style={globalStyles.generalText}>Title : {formData?.title}</Text>
      <Text style={globalStyles.generalText}>date : {fDate}</Text>
      <Text style={globalStyles.generalText}>time : {fTime}</Text>
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
                      {isOpen[currentLeg] && (
                        <FlatList
                          style={{ maxHeight: 100 }}
                          data={formData?.itemsDetails?.[currentLeg]?.itemsList}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => (
                            <View>
                              <TouchableOpacity
                                style={styles.listItem}
                                onPress={() => handleItemPress(index)}
                              >
                                <Text
                                  style={{
                                    color: item.details
                                      ? colors.background
                                      : "black",
                                    fontSize: 13,
                                  }}
                                >
                                  {item.quantity} {item.name}
                                </Text>
                              </TouchableOpacity>
                              {selectedItemIndex === index && item.details && (
                                <View style={[styles.detailsItemContainer]}>
                                  {item?.details?.description && (
                                    <Text
                                      style={{
                                        color: "blue",
                                        flexShrink: 1,
                                        overflow: "hidden",
                                        textBreakStrategy: "balanced",
                                        marginLeft: 10,
                                      }}
                                    >
                                      Description: {item?.details?.description}
                                    </Text>
                                  )}
                                  {item?.details?.dimensions?.length && (
                                    <Text
                                      style={{ color: "blue", marginLeft: 10 }}
                                    >
                                      length:{" "}
                                      {item?.details?.dimensions?.length}
                                    </Text>
                                  )}
                                  {item?.details?.dimensions?.width && (
                                    <Text
                                      style={{ color: "blue", marginLeft: 10 }}
                                    >
                                      width: {item?.details?.dimensions?.width}
                                    </Text>
                                  )}
                                  {item?.details?.dimensions?.height && (
                                    <Text
                                      style={{ color: "blue", marginLeft: 10 }}
                                    >
                                      height:{" "}
                                      {item?.details?.dimensions?.height}
                                    </Text>
                                  )}
                                  {item?.details?.dimensions?.weight && (
                                    <Text
                                      style={{ color: "blue", marginLeft: 10 }}
                                    >
                                      weight:{" "}
                                      {item?.details?.dimensions?.weight}
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          )}
                        />
                      )}
                    </View>
                  )}
                  {formData.itemsDetails[currentLeg].photoItems && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Image", { currentLeg })
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
                </View>
              </View>
            )}
          </View>
        );
      })}
      <GeneralButton text="Confirm" onPressFunction={onSubmit} />
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
