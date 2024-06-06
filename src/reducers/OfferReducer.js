import { TYPES } from "../actions/OfferActions"

const OfferReducer = (state={}, action) => {
 switch (action.type) {
    case TYPES.ADDNEWOFFER:
        return{
            ...state,
            offers: [...state.offers, action.payload]
            }
    case TYPES.GETOFFERS:
    return{
        ...state,
        offers: action.payload.myOffers
    }     
    default:
        return state
 }
}

export default OfferReducer