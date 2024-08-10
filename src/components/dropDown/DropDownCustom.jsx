import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export const DropDownCustom = ({
  prevItem = null,
  items,
  onSelect,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (prevItem) {
      console.log("aaa", prevItem);
      setSelectedItem({ label: prevItem, value: prevItem });
    }
  }, [prevItem]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Entypo
          name={isVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color={"#f1f1f1"}
        />
      </TouchableOpacity>
      {isVisible && (
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
    maxHeight: 200,
  },
  item: {
    padding: 8,
  },
  itemText: {
    fontSize: 16,
  },
});
