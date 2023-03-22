import actionTypes from "../action-types";
import { franchise } from "../actions/franchise-action";


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
        case actionTypes.UPDATE_FRANCHISE:
            let index = state.franchises.findIndex(franchise => franchise._id === action.data._id);
            let _cloneFranchise = [...state.franchises];
            _cloneFranchise[index] = action.data
            return {
                ...state,
                franchises: _cloneFranchise
            };
        default: {
            return state
        }
    }
}