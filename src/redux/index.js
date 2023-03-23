import { combineReducers } from "redux";

import { franchisesReducer } from "./reducers/franchise-reducer";
import { newsReducer } from "./reducers/news-reducer";

export const rootReducer = () => combineReducers({
    franchise: franchisesReducer,
    news: newsReducer,
})