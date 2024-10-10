import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export const DropDownCustom = ({
  prevItem = null,
  items,
  onSelect,
  placeholder,
  multiSelection = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    multiSelection ? [] : null
  );

  const toggleDropdown = () => {
    if (!isVisible) {
      Keyboard.dismiss();
    }
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (prevItem) {
      if (multiSelection && Array.isArray(prevItem)) {
        setSelectedItems(prevItem);
      } else {
        setSelectedItems({ label: prevItem.label, value: prevItem.value });
      }
    }
  }, [prevItem]);

  const handleSelect = (item) => {
    if (multiSelection) {
      const index = selectedItems.findIndex((i) => i.value === item.value);
      let updatedItems;
      if (index === -1) {
        updatedItems = [...selectedItems, item];
      } else {
        updatedItems = selectedItems.filter((i) => i.value !== item.value);
      }

      setSelectedItems(updatedItems);
      onSelect(updatedItems);
    } else {
      setSelectedItems(item);
      onSelect(item);
      setIsVisible(false);
    }
  };

  const isItemSelected = (item) => {
    if (multiSelection && Array.isArray(selectedItems)) {
      return (
        selectedItems.find((selected) => selected.value === item.value) !==
        undefined
      );
    }
    return selectedItems?.value === item.value;
  };

  const renderSelectedLabel = () => {
    if (multiSelection) {
      if (selectedItems.length > 0) {
        return selectedItems.map((item) => item.label).join(", ");
      }
      return placeholder;
    }
    return selectedItems ? selectedItems.label : placeholder;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>{renderSelectedLabel()}</Text>
        <Entypo
          name={isVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color={"#000000"}
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
                  {isItemSelected(item) && (
                    <Entypo name="check" size={20} color={"green"} />
                  )}
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
    width: "96%",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#A9A9A9",
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
    maxHeight: 220,
  },
  item: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
  },
});
