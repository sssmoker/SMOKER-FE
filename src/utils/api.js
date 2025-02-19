const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 공통 요청 함수 (JWT 없이 요청)
async function apiRequest(endpoint, method = "GET", body = null) {
	try {
		const options = {
			method,
			headers: { "Content-Type": "application/json" },
		}
		if (body) options.body = JSON.stringify(body)

		const response = await fetch(`${BASE_URL}${endpoint}`, options)
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			console.error(`API ERROR: ${endpoint}`, {
				status: response.status,
				statusText: response.statusText,
				error: errorData,
			})
			throw new Error(`${response.status}: ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error(`API REQUEST FAILED: ${endpoint}`, error)
		throw error
	}
}

// 세션 스토리지에서 토큰 가져오기
const getStoredTokens = () => {
	const tokens = sessionStorage.getItem("tokens")
	return tokens ? JSON.parse(tokens) : null
}

// JWT가 필요한 API 요청 (401 발생 시 자동 재발급)
export async function apiRequestWithAuth(
	endpoint,
	method = "GET",
	body = null,
) {
	try {
		let tokens = getStoredTokens()
		let accessToken = tokens?.accessToken

		const options = {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		}

		if (body) options.body = JSON.stringify(body)

		let response = await fetch(`${BASE_URL}${endpoint}`, options)

		// 401 발생 시 -> 자동으로 토큰 재발급 후 다시 요청
		if (response.status === 401) {
			try {
				const newAccessToken = await refreshAccessToken() // 새 accessToken 가져오기
				if (!newAccessToken) throw new Error("새로운 액세스 토큰 없음")

				// 새로운 accessToken으로 요청 다시 보내기
				options.headers.Authorization = `Bearer ${newAccessToken}`
				response = await fetch(`${BASE_URL}${endpoint}`, options)
			} catch (error) {
				console.error("토큰 갱신 실패 후 요청 불가:", error)
				throw error // 여기서는 로그인 상태를 변경하지 않음 (refreshAccessToken 내부에서 처리)
			}
		}

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			console.error(`API ERROR: ${endpoint}`, errorData)
			throw new Error(`${response.status}: ${response.statusText}`)
		}

		return await response.json()
	} catch (error) {
		console.error(`API REQUEST FAILED: ${endpoint}`, error)
		throw error
	}
}

// JWT 액세스 토큰 재발급
export const refreshAccessToken = async () => {
	try {
		const tokens = getStoredTokens()
		const refreshToken = tokens?.refreshToken
		if (!refreshToken) throw new Error("Refresh Token이 존재하지 않습니다.")

		const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${refreshToken}`,
			},
		})

		if (!response.ok) {
			throw new Error("토큰 재발급 실패")
		}

		const data = await response.json()

		// 새 accessToken, refreshToken 저장
		const newTokens = {
			accessToken: data.result.accessToken,
			refreshToken: data.result.refreshToken,
		}
		sessionStorage.setItem("tokens", JSON.stringify(newTokens))

		return newTokens.accessToken // 새 accessToken 반환
	} catch (error) {
		console.error("JWT 액세스 토큰 재발급 실패:", error)

		// 실패 시 즉시 로그아웃 처리
		sessionStorage.removeItem("tokens")
		sessionStorage.removeItem("member")
		window.location.href = "/login" // 강제 로그아웃 후 로그인 페이지 이동

		throw error
	}
}

// 흡연 구역 관련 API
export const fetchSmokingAreas = async ({ userLat, userLng, selectedFilter }) =>
	await apiRequest(
		`/api/smoking-area/list?userLat=${userLat}&userLng=${userLng}&filter=${selectedFilter}`,
	)
export const fetchSmokingAreaDetails = async (smokingAreaId) =>
	await apiRequest(`/api/smoking-area/${smokingAreaId}`)
export const searchSmokingArea = async (data) =>
	await apiRequest(`/api/smoking-area/search`, "POST", data)
export const registerSmokingArea = async (data) =>
	await apiRequest(`/api/smoking-area/register`, "POST", data)
export const updateSmokingArea = async (smokingAreaId, data) =>
	await apiRequest(`/api/smoking-area/update/${smokingAreaId}`, "PATCH", data)
export const fetchSmokingAreaMarkers = async () =>
	await apiRequest(`/api/smoking-area/marker`)

// 리뷰 관련 API
export const fetchReviews = async (smokingAreaId) =>
	await apiRequest(`/api/reviews/${smokingAreaId}?pageNumber=1`)
export const postReview = async (smokingAreaId, data) =>
	await apiRequest(`/api/reviews/${smokingAreaId}`, "POST", data)
export const fetchReviewStars = async (smokingAreaId) =>
	await apiRequest(`/api/reviews/${smokingAreaId}/starInfo`)

// 회원 관련 API
export const fetchUserInfo = async () =>
	await apiRequestWithAuth(`/api/member/`)
export const updateProfileImage = async (data) =>
	await apiRequestWithAuth(`/api/member/profileImage`, "PATCH", data)
export const updateNickname = async (data) =>
	await apiRequestWithAuth(`/api/member/nickname`, "PATCH", data)
export const fetchUserReviews = async () =>
	await apiRequestWithAuth(`/api/member/reviews`)
export const fetchMyUpdateHistory = async () =>
	await apiRequestWithAuth(`/api/member/update`)

// 저장된 흡연 구역
export const fetchSavedSmokingAreas = async () =>
	await apiRequest(`/api/saved-smoking-area`)
export const saveSmokingArea = async (smokingAreaId) =>
	await apiRequest(`/api/saved-smoking-area/${smokingAreaId}`, "POST")
export const deleteSavedSmokingArea = async (smokingAreaId) =>
	await apiRequest(`/api/saved-smoking-area/${smokingAreaId}`, "DELETE")

// 공지사항
export const fetchNotices = async (page = 1) =>
	await apiRequest(`/api/member/notices?page=${page}`)

export const fetchNoticeDetail = async (noticeId) =>
	await apiRequest(`/api/member/notices/detail/${noticeId}`)

// 업데이트 내역
export const fetchSmokingAreaUpdateHistory = async (smokingAreaId, page = 1) =>
	await apiRequest(
		`/api/updated-history/${smokingAreaId}/smokingArea?page=${page}`,
	)
export const fetchMemberUpdateHistory = async (memberId, page = 1) =>
	await apiRequest(`/api/updated-history/${memberId}/member?page=${page}`)

// 토큰 관련 API
export const reissueToken = async () =>
	await apiRequest(`/api/token/reissue`, "POST")

export const logout = async () =>
	await apiRequestWithAuth(`/api/auth/logout`, "POST")
//authAction에서 관리중
//export const deactivateAccount = async () =>
//await apiRequestWithAuth(`/api/auth/deactivate`, "DELETE")

// 오픈 API
export const fetchOpenApi = async (key) =>
	await apiRequest(`/api/open-api/${key}`)

// 헬스 체크
export const healthCheck = async () => await apiRequest(`/health`)
