const OfferReducer = (state={}, action) => {
 switch (action.type) {
    case "ADDNEWOFFER":
        return{
            ...state,
            offers: [...state.offers, action.payload]
            }
    case "GETOFFERS":
    return{
        ...state,
        offers: action.payload.myOffers
    }     
    default:
        return state
 }
}

export default OfferReducer