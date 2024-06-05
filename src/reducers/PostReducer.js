
const PostReducer = (state={}, action) => {
    switch (action.type) {
        case "ADDNEWPOST":
            return{
                ...state,
                posts: [...state.posts, action.payload]
                }   
        case "GETPOSTS":
            return{
                ...state,
                posts: action.payload.myPost
            }   
        case "GETPENDINGPOSTS":
            return{
                ...state,
                posts: action.payload.pendingPost
            }   

    default:
        return state
}
}

export default PostReducer