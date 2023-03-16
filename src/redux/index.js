import { combineReducers } from "redux";

import { franchisesReducer } from "./reducers/franchise-reducer";

export const rootReducer = () => combineReducers({
    franchise: franchisesReducer,
})