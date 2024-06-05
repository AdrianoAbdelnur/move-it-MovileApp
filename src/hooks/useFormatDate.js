import React, { useState } from 'react'

export const useFormatDate = () => {
  
  const [fDate, setFDate] = useState()
  const [fTime, setFTime] = useState()

  const formatDate = (date) => {
        setFDate(date.toDateString());
        setFTime(amPmFunction(date));
  }

  const amPmFunction = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  
    return {
        formatDate, 
        fDate, 
        fTime
    }
  
}
