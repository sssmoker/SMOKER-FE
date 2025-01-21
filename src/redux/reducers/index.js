import { combineReducers } from "redux"
import authReducer from "./authReducer"
import smokingAreaReducer from "./smokingAreaReducer"

export default combineReducers({
	auth: authReducer, // 사용자 인증 상태
	smokingArea: smokingAreaReducer, // 흡연 구역 상태
})
