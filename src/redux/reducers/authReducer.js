const initialState = {
	user: null,
	accessToken: null,
	isLoading: false,
	error: null,
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case "KAKAO_LOGIN_REQUEST":
			return { ...state, isLoading: true, error: null }
		case "KAKAO_LOGIN_SUCCESS":
			return {
				...state,
				isLoading: false,
				user: action.payload,
				accessToken: action.payload.accessToken,
			}
		case "KAKAO_LOGIN_FAILURE":
			return { ...state, isLoading: false, error: action.payload }
		case "LOGOUT":
			return { ...state, user: null, accessToken: null }
		default:
			return state
	}
}
