const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI

// 로그인 요청마다 state 동적 생성, 따로 관리하면 GOOGLE_STATE를 미리 생성
const generateRandomState = () => Math.random().toString(36).substring(2, 15)

export const GOOGLE_AUTH_URL = () =>
	`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=email+profile&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&state=${generateRandomState()}`
