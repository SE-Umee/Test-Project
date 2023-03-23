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
        case actionTypes.EDIT_NEWS:
            console.log('====================================');
            console.log(",,,,,,,", action.data);
            console.log('====================================');
            let index = state.news.findIndex(news => news.id === action.data.id);
            let cloneNews = [...state.news];
            cloneNews[index] = action.data;
            return {
                ...state,
                news: cloneNews
            }
        default: {
            return state
        }
    }
}