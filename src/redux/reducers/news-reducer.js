import actionTypes from "../action-types"

const initialState = {
    news: [],
}

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEWS:
            return {
                ...state,
                news: [...state.news, action.data]
            };
        default: {
            return state
        }
    }
}