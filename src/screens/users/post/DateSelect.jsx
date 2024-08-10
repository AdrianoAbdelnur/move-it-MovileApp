import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
      formatDate(formData.date.date);
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
    if (formData?.date?.date) {
      if (formData.date.timeDay) {
        navigation.navigate("Directions");
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
      <Text style={globalStyles.generalText}>
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
