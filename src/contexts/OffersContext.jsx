import { createContext, useReducer } from "react";

export const OfferContext = createContext();

import React from "react";
import OfferReducer from "../reducers/OfferReducer";
import { clientAxios } from "../api/ClientAxios";
import { TYPES } from "../actions/OfferActions";

const OfferProvider = ({ children }) => {
  const initialValues = {
    alerMsg: "",
    offers: [],
  };
  const [state, dispatch] = useReducer(OfferReducer, initialValues);

  const addOffer = async (offerData) => {
    try {
      const { data } = await clientAxios.post("/offer/addOffer", offerData);
      const { newOffer } = data;
      if (newOffer) {
        await clientAxios.put("/userPost/addNewOffer", {
          postId: offerData.post,
          newOfferId: newOffer._id,
        });
        dispatch({
          type: TYPES.ADDNEWOFFER,
          payload: newOffer,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyOffers = async (userId) => {
    try {
      const { data } = await clientAxios("/offer/myOffers/" + userId);
      const { myOffers } = data;
      if (myOffers) {
        dispatch({
          type: "GETOFFERS",
          payload: { myOffers },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const offerSelectOffer = async (offerId) => {
    try {
      clientAxios.patch("/offer/selectOffer/" + offerId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OfferContext.Provider
      value={{ state, addOffer, getMyOffers, offerSelectOffer }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export default OfferProvider;
