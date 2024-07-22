import { TYPES } from "../actions/PostActions"


const PostReducer = (state={}, action) => {
    switch (action.type) {
        case TYPES.ADDNEWPOST:
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
                posts: action.payload.relevantPosts
            }
        case TYPES.CLEARALERTMSG:
            return {
                ...state,
                alertMsg: ""
            }
        case TYPES.UPDATEPOST:
            return {
                ...state,
                posts: state.posts.map((post)=>
                    post._id === action.payload.newPost._id? action.payload.newPost : post
                ) 
            }
        case TYPES.ADDOFFERINPOST:
            return {
                ...state,
                posts: state.posts.map((post)=>
                    post._id === action.payload.postId? {...post, offers:[...post.offers, {_id: action.payload.newOfferId, owner:{_id:action.payload.ownerId, given_name:action.payload.ownerName}}]}: post
               ) 
            }
        case TYPES.ADDMESSAGE:
        return {
            ...state,
            posts: state.posts.map((post)=>
                post._id === action.payload.postId? {...post, chatMessages: [action.payload.newMessage, ...post.chatMessages]}: post
            ) 
        }
        case TYPES.UPDATEMYSTATUS:
        return {
            ...state,
            posts: state.posts.map((post)=>
                post._id === action.payload.postId? {...post, status: action.payload.newStatus}: post
            ) 
        }
    default:
        return state
}
}

export default PostReducer