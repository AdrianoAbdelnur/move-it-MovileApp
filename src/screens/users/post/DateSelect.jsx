import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { GeneralButton } from "../../../components/ui/GeneralButton";
import { NextButton } from "../../../components/ui/NextButton";
import { FormContext } from "../../../contexts/FormContext";
import { useUpdateObj } from "../../../hooks/useUpdateObj";

export const DateSelect = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("Please select a date");
  const navigation = useNavigation();
  const { formatDate, fDate, fTime } = useFormatDate();
  const { formData, setFormData } = useContext(FormContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [updateObj] = useUpdateObj(setFormData);

  useEffect(() => {
    if (formData?.date?.date) {
      const date = new Date(formData?.date?.date);
      formatDate(date);
    }
    if (formData?.date?.timeDay) {
      setSelectedOption(formData.date.timeDay);
    }
  }, []);

  useEffect(() => {
    if (fDate) {
      if (
        selectedOption === "Morning" ||
        selectedOption === "Afternoon" ||
        selectedOption === "Evening"
      ) {
        setInfo(fDate + " in the " + selectedOption);
      } else if (selectedOption === "At Any Time") {
        setInfo(fDate + " at any time");
      } else if (selectedOption === "specificTime") {
        setInfo(fDate + " at " + fTime);
      } else if (fDate) {
        setInfo(fDate + " (please select a time of the day)");
      }
    }
  }, [fDate, fTime, selectedOption]);

  useEffect(() => {
    if (selectedOption) {
      updateObj("date.timeDay", selectedOption);
    }
  }, [selectedOption]);

  const checkInfo = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (formData?.date?.date) {
      if (formData?.date?.timeDay) {
        if (formData?.date?.date >= today) {
          if (isTimeOfDayValid(formData.date.timeDay, formData.date.date)) {
            if (formData?._id) {
              navigation.navigate("Confirmation");
            } else navigation.navigate("Directions");
          } else {
            Alert.alert(
              "Invalid Time Selection",
              "The selected time of day has already passed."
            );
          }
        } else alert("Please select new date");
      } else alert("Select a time of day");
    } else alert("You must select a date");
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
    formatDate(selectedDate);
    updateObj("date.date", selectedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const isTimeOfDayValid = (selectedOption, date) => {
    const now = new Date();
    if (date.toDateString() !== now.toDateString()) {
      return true;
    }

    const morningEnd = new Date();
    morningEnd.setHours(12, 0, 0, 0);
    const afternoonEnd = new Date();
    afternoonEnd.setHours(17, 0, 0, 0);
    const eveningEnd = new Date();
    eveningEnd.setHours(23, 59, 59, 999);

    switch (selectedOption) {
      case "Morning":
        return now <= morningEnd;
      case "Afternoon":
        return now <= afternoonEnd;
      case "Evening":
        return now <= eveningEnd;
      case "At Any Time":
      case "specificTime":
        return true;
      default:
        return false;
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.generalText}>Select the date</Text>
      <GeneralButton
        text={"Select the date"}
        onPressFunction={() => showMode("date")}
      />
      <View style={{ margin: 20 }}>
        <Text style={globalStyles.generalText}>Select an option:</Text>
        <TouchableOpacity onPress={() => setSelectedOption("Morning")}>
          <Text style={globalStyles.generalText}>
            {selectedOption === "Morning" ? "🔘" : "⚪️"} Morning
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("Afternoon")}>
          <Text style={globalStyles.generalText}>
            {selectedOption === "Afternoon" ? "🔘" : "⚪️"} Afternoon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("Evening")}>
          <Text style={globalStyles.generalText}>
            {selectedOption === "Evening" ? "🔘" : "⚪️"} Evening
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("At Any Time")}>
          <Text style={globalStyles.generalText}>
            {selectedOption === "At Any Time" ? "🔘" : "⚪️"} At any time
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedOption("specificTime")}>
          <Text style={globalStyles.generalText}>
            {selectedOption === "specificTime" ? "🔘" : "⚪️"} At a specific
            time
          </Text>
        </TouchableOpacity>
      </View>
      {selectedOption === "specificTime" && (
        <GeneralButton
          text={"Select the time"}
          onPressFunction={() => showMode("time")}
        />
      )}
      <Text
        style={[
          globalStyles.generalText,
          {
            color:
              new Date(formData?.date?.date) <=
                new Date().setHours(0, 0, 0, 0) ||
              (selectedOption &&
                !isTimeOfDayValid(
                  selectedOption,
                  new Date(formData?.date?.date)
                ))
                ? "red"
                : "white",
          },
        ]}
      >
        Date for your transport: {"\n"} {info}
      </Text>
      <NextButton toDo={checkInfo} />
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          minuteInterval={5}
          minimumDate={new Date()}
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
