import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { DropDownCustom } from "../dropDown/DropDownCustom";
import { AddressSelectorModal } from "./AddressSelectorModal";
import * as Location from "expo-location";
import globalStyles from "../../styles/globalStyles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "../../contexts/AuthContext";
import colors from "../../styles/colors";

const items = [
  { label: "1 km", value: 1 },
  { label: "5 km", value: 5 },
  { label: "10 km", value: 10 },
  { label: "20 km", value: 20 },
];

const AccordionItem = ({
  title,
  subtitle,
  children,
  isExpanded,
  onPress,
  height,
}) => {
  const animatedHeight = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? height : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.accordionHeader}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.accordionHeaderText}>{title}</Text>
          <Text style={globalStyles.generalInformationText}>{subtitle}</Text>
        </View>
        <Entypo
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="white"
          style={styles.accordionIcon}
        />
      </TouchableOpacity>

      <Animated.View
        style={[styles.accordionContent, { height: animatedHeight }]}
      >
        {isExpanded && (
          <View style={styles.accordionInnerContent}>{children}</View>
        )}
      </Animated.View>
    </View>
  );
};

export const FilterPostsModal = ({
  showModal,
  setShowModal,
  posts,
  setFilteredPosts,
  centerLocation,
  setCenterLocation,
  maxDistance,
  setMaxDistance,
}) => {
  const { state: userState } = useContext(AuthContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [dateOption, setDateOption] = useState("any");
  const [distanceOption, setDistanceOption] = useState("any");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [addressToShow, setAddressToShow] = useState("Any location");

  const [date, setDate] = useState({ when: "Any date", date: new Date() });

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSelectDateOption = (option) => {
    setDateOption(option);

    if (option === "any") {
      setDate({ when: "Any date", date: new Date() });
    }

    if (option === "date") {
      setShowDateSelector(true);
    }

    if (option === "now") {
      setDate({ when: "Now", date: new Date() });
    }
  };

  const handleSelectDistanceOption = (option) => {
    setDistanceOption(option);
    if (option === "any") {
      setAddressToShow("Any location");
      setCenterLocation("any");
    }
    if (option === "My current location") {
      getUserLocation();
      setAddressToShow("Your current Location");
    }
    if (option === "Choose Address") {
      setShowAddressModal(true);
    }
  };

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude: yourLatitude, longitude: yourLongitude } = coords;

      setCenterLocation({ latitude: yourLatitude, longitude: yourLongitude });
    } catch (error) {
      console.error("An error occurred while trying to get location:", error);
    }
  };

  const onChange = (e, selectedDate) => {
    setDate({ when: "Specific", date: selectedDate });
    setShowDateSelector(false);
  };

  const filter = () => {
    let filtered = posts;

    if (date.when === "Now") {
      const currentTimeDay = getCurrentTimeDay();
      filtered = posts.filter((post) => {
        return (
          isToday(post?.date?.date) &&
          (post?.date?.timeDay === "now" ||
            post?.date?.timeDay === "At Any Time" ||
            post?.date?.timeDay === currentTimeDay) &&
          post?.status?.mainStatus === "pending" &&
          !offeredPost(post)
        );
      });
    } else if (date.when === "Specific") {
      filtered = posts.filter((post) => {
        return (
          new Date(post?.date?.date).setHours(0, 0, 0, 0) ===
            new Date(date.date).setHours(0, 0, 0, 0) &&
          post?.status?.mainStatus === "pending" &&
          !offeredPost(post)
        );
      });
    }

    if (centerLocation !== "any") {
      if (maxDistance.value !== "any") {
        filtered = filtered.filter((post) => {
          const distance = getDistance(
            centerLocation.latitude,
            centerLocation.longitude,
            post.directions[0].location.latitude,
            post.directions[0].location.longitude
          );
          return distance < maxDistance.value;
        });
      }
    }
    setFilteredPosts(filtered);
    closeModal();
  };

  const offeredPost = (post) => {
    const offered = post.offers.find(
      (offer) =>
        offer.owner._id === userState.user.id && offer.status !== "expired"
    );
    if (offered) {
      return true;
    }
    return false;
  };

  const getCurrentTimeDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Evening";
    } else {
      return null;
    }
  };

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        (1 - Math.cos(dLon))) /
        2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

  return (
    <Modal transparent={true} visible={showModal} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.contentModal}>
          <AccordionItem
            title="Filter by date"
            subtitle={
              date.when !== "Specific" ? date.when : date.date.toDateString()
            }
            isExpanded={expandedIndex === 0}
            onPress={() => handlePress(0)}
            height={150}
          >
            <View style={{ margin: 20 }}>
              <Text>Select an option:</Text>
              <TouchableOpacity onPress={() => handleSelectDateOption("any")}>
                <Text>{dateOption === "any" ? "🔘" : "⚪️"} Any date</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectDateOption("now")}>
                <Text>{dateOption === "now" ? "🔘" : "⚪️"} Now</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectDateOption("date")}>
                <Text>
                  {dateOption === "date" ? "🔘" : "⚪️"} Select a date
                </Text>
              </TouchableOpacity>
            </View>
          </AccordionItem>

          <AccordionItem
            title="Filter by distance"
            subtitle={addressToShow}
            isExpanded={expandedIndex === 1}
            onPress={() => handlePress(1)}
            height={320}
          >
            <Text>from:</Text>
            <View>
              <Text>Select an option:</Text>
              <TouchableOpacity
                onPress={() => handleSelectDistanceOption("any")}
              >
                <Text>
                  {distanceOption === "any" ? "🔘" : "⚪️"} Any location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleSelectDistanceOption("My current location")
                }
              >
                <Text>
                  {distanceOption === "My current location" ? "🔘" : "⚪️"} My
                  current location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelectDistanceOption("Choose Address")}
              >
                <Text>
                  {distanceOption === "Choose Address" ? "🔘" : "⚪️"} Choose
                  Address
                </Text>
              </TouchableOpacity>
              {distanceOption !== "any" && (
                <DropDownCustom
                  items={items}
                  prevItem={maxDistance}
                  placeholder="any distance"
                  onSelect={(value) => setMaxDistance(value)}
                />
              )}
            </View>
          </AccordionItem>

          <View style={styles.buttonsContainer}>
            <Pressable onPress={() => closeModal()}>
              <Text
                style={[
                  styles.modalButton,
                  { backgroundColor: "#8B0000", color: "white" },
                ]}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={() => filter()}>
              <Text style={styles.modalButton}>filter</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <AddressSelectorModal
        showModal={showAddressModal}
        setShowModal={setShowAddressModal}
        setAddressToShow={setAddressToShow}
        setCenterLocation={setCenterLocation}
        setDistanceOption={setDistanceOption}
      />
      {showDateSelector && (
        <RNDateTimePicker
          testID="dateTimePicker"
          minuteInterval={5}
          minimumDate={new Date()}
          value={date.date}
          mode="date"
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
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
  },
  accordionHeader: {
    padding: 10,
    backgroundColor: colors.background,
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
