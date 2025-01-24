import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./index"

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

// 미들웨어 역할을 합니다 일단.
