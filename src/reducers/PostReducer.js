import { TYPES } from "../actions/PostActions"


const PostReducer = (state={}, action) => {
    switch (action.type) {
        case TYPES.ADDNEWPOST:
            console.log(action.payload.newPost)
            return{
                ...state,
                alertMsg: action.payload.alertMsg,
                posts: [...state.posts, action.payload.newPost]
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
        case TYPES.CLEARALERTMSG:
            return {
                ...state,
                alertMsg: ""
            }

    default:
        return state
}
}

export default PostReducer