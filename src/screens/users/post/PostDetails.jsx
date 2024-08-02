import React, { useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../styles/colors";

export const PostDetails = ({ route }) => {
  const navigation = useNavigation();
  const { state: userState } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const { data } = route.params;

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

  const handleItemPress = (index) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };

  return (
    <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
      <Text style={globalStyles.generalText}>Title : {data?.title}</Text>
      {formatDate(data?.date?.date)}
      {data.date.timeDay === "specificTime" ? (
        <Text style={globalStyles.generalText}>
          Date: {fDate} at {fTime}
        </Text>
      ) : (
        <Text style={globalStyles.generalText}>Date: {fDate}</Text>
      )}
      {data.date.timeDay !== "specificTime" && (
        <Text style={globalStyles.generalText}>
          time of day: {data.date.timeDay}
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
                    description: {data.itemsDetails?.[currentLeg]?.description}
                  </Text>
                  {data?.itemsDetails?.[currentLeg]?.itemsList?.length > 0 && (
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
                          data={data?.itemsDetails?.[currentLeg]?.itemsList}
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
                  {data.itemsDetails[currentLeg].photoItems && (
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

      {data.offerSelected && (
        <Text style={globalStyles.generalText}>
          Transport Selected: {data?.offerSelected?.owner?.given_name}
        </Text>
      )}
      {data.offers.find((offer) => offer?.owner?._id === userState?.user?.id)
        ? userState.user.role == "transport" && (
            <Text>You have already offered for this job</Text>
          )
        : userState.user.role == "transport" && (
            <TouchableOpacity
              style={globalStyles.OptionsButton}
              onPress={() => navigation.navigate("Offer", { data })}
            >
              <Text style={globalStyles.textButtons}>Make an offer</Text>
            </TouchableOpacity>
          )}
      {userState.user.role === "user" &&
        data.status.mainStatus === "pending" &&
        data.offers.length !== 0 && (
          <TouchableOpacity
            style={globalStyles.OptionsButton}
            onPress={() => navigation.navigate("OffersList", { data })}
          >
            <Text style={globalStyles.textButtons}>See offers</Text>
          </TouchableOpacity>
        )}
      {userState.user.role === "user" &&
        data.status.mainStatus === "transportDone" && (
          <TouchableOpacity
            style={globalStyles.OptionsButton}
            onPress={() => navigation.navigate("TransporConfirm", { data })}
          >
            <Text style={globalStyles.textButtons}>Confirm transport</Text>
          </TouchableOpacity>
        )}
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
