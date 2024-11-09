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
                posts: found? newPostsList : [...state.posts, action.payload.newPost],
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
                alertMsg: action.payload.alertMsg || "",
                posts: state.posts.map((post)=>
                    post._id === action.payload.newPost._id? action.payload.newPost : post
                ) 
            }
        case TYPES.ADDOFFERINPOST:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload.postId) {
                    const existingOfferIndex = post.offers.findIndex(
                      (offer) => offer._id === action.payload.newOfferId
                    );
                    if (existingOfferIndex !== -1) {
                      const updatedOffers = post.offers.map((offer, index) =>
                        index === existingOfferIndex
                          ? {
                              ...offer,
                              expiredTime: action.payload.expiredTime,
                              price: action.payload.price,
                              status: action.payload.status,
                              owner: {
                                _id: action.payload.ownerId,
                                given_name: action.payload.ownerName,
                              },
                            }
                          : offer
                      );
                      return {
                        ...post,
                        offers: updatedOffers,
                      };
                    } else {
                      return {
                        ...post,
                        offers: [
                          ...post.offers,
                          {
                            _id: action.payload.newOfferId,
                            expiredTime: action.payload.expiredTime,
                            price: action.payload.price,
                            status: action.payload.status,
                            owner: {
                              _id: action.payload.ownerId,
                              given_name: action.payload.ownerName,
                              review: action.payload?.review,
                              expoPushToken: action.payload?.expoPushToken
                            },
                          },
                        ],
                      };
                    }
                  }
                  return post;
                }),
              };
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
        case TYPES.REMOVEPOSTS :
            return {
              alertMsg: "",
              posts: [],
              isLoading: false,
            }
    default:
        return state
}
}

export default PostReducer