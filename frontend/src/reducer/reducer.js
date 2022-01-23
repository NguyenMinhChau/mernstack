import {actions} from '../exportStore';

export const initialState = {
    user: null,
    posts: []
}

export const getCurrentUser = payload => {
    return {
        type: actions.GET_CURRENT_USER,
        payload
    }
}
export const getAllPost = payload => {
    return {
        type: actions.GET_ALL_POST,
        payload
    }
}
export const createOnePost = payload => {
    return {
        type: actions.CREATE_ONE_POST,
        payload
    }
}
export const updateOnePost = payload => {
    return {
        type: actions.UPDATE_ONE_POST,
        payload
    }
}
export const deleteOnePost = payload => {
    return {
        type: actions.DELETE_ONE_POST,
        payload
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case actions.GET_CURRENT_USER: 
            return {
                ...state,
                user: action.payload
            }
        case actions.GET_ALL_POST:
            return {
                ...state,
                posts: action.payload
            }
        case actions.CREATE_ONE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case actions.UPDATE_ONE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return post;
                    }
                })
            }
        case actions.DELETE_ONE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state;
    }
}
export default reducer;