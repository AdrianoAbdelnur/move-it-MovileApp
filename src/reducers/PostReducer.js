import { TYPES } from "../actions/PostActions"


const PostReducer = (state={}, action) => {
    switch (action.type) {
        case TYPES.ADDNEWPOST:
            let found= false;
            const newPostsList = state.posts.map(post => {
                if(action.payload.newPost._id === post._id) {
                    found = true;
                    return action.payload.newPost;
                }
                return post
            })
            return{
                ...state,
                alertMsg: action.payload.alertMsg,
                posts: found? newPostsList: [...state.posts, action.payload.newPost],
                isLoading: false    
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
        case TYPES.LOADING :
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
    default:
        return state
}
}

export default PostReducer