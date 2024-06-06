import { TYPES } from "../actions/PostActions"


const PostReducer = (state={}, action) => {
    switch (action.type) {
        case TYPES.ADDNEWPOST:
            return{
                ...state,
                posts: [...state.posts, action.payload]
                }   
        case TYPES.GETPOSTS:
            return{
                ...state,
                posts: action.payload.myPost
            }   
        case TYPES.GETPENDINGPOSTS:
            return{
                ...state,
                posts: action.payload.pendingPost
            }   

    default:
        return state
}
}

export default PostReducer