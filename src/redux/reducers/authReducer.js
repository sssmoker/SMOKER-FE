const initialState = {
	user: null,
	accessToken: null,
	refreshToken: null,
	isLoading: false,
	error: null,
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case "KAKAO_LOGIN_REQUEST":
		case "GOOGLE_LOGIN_REQUEST":
		case "DEACTIVATE_ACCOUNT_REQUEST":
			return { ...state, isLoading: true, error: null }

		case "KAKAO_LOGIN_SUCCESS":
		case "GOOGLE_LOGIN_SUCCESS":
		case "REFRESH_TOKEN_SUCCESS":
			return {
				...state,
				isLoading: false,
				user: action.payload,
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken,
			}

		case "KAKAO_LOGIN_FAILURE":
		case "GOOGLE_LOGIN_FAILURE":
		case "REFRESH_TOKEN_FAILURE":
		case "DEACTIVATE_ACCOUNT_FAILURE":
			return { ...state, isLoading: false, error: action.payload }

		case "LOGOUT":
		case "DEACTIVATE_ACCOUNT_SUCCESS":
			return { ...state, user: null, accessToken: null, refreshToken: null }

		default:
			return state
	}
}
