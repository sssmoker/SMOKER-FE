import { combineReducers } from "redux"
import counterReducer from "./counterSlice"

const rootReducer = combineReducers({
	counter: counterReducer, // 상태 이름: 리듀서
})

export default rootReducer
