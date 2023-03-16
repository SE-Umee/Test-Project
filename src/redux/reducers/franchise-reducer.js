import actionTypes from "../action-types";


const initialState = {
    franchises: [],
}

export const franchisesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_ALL_FRANCHISE:
            return {
                ...state,
                franchises: action.data,
            };
        case actionTypes.ADD_NEW_FRANCHISE:
            return {
                ...state,
                franchises: action.data ? [...state.franchises, action.data] : []
            };
        default: {
            return state
        }
    }
}