const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 공통 요청 함수
async function apiRequest(endpoint, method = "GET", body = null) {
	const url = `${BASE_URL}${endpoint}`
	console.log(`📡 Request URL: ${url}`) // ✅ URL 확인
	console.log(`🔍 Request Method: ${method}`) // ✅ 요청 방식 확인
	if (body) console.log(`📤 Request Body:`, body) // ✅ 요청 본문 확인 (POST, PATCH 시)

	try {
		const options = {
			method,
			headers: { "Content-Type": "application/json" },
		}
		if (body) options.body = JSON.stringify(body)

		const response = await fetch(url, options)

		console.log(`📥 Response Status: ${response.status}`) // ✅ 응답 상태 확인

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			console.error(`❌ API ERROR: ${url}`, {
				status: response.status,
				statusText: response.statusText,
				error: errorData,
			})
			throw new Error(`${response.status}: ${response.statusText}`)
		}

		const jsonResponse = await response.json()
		console.log(`✅ Response Data:`, jsonResponse) // ✅ 응답 데이터 확인
		return jsonResponse
	} catch (error) {
		console.error(`🔥 API REQUEST FAILED: ${url}`, error)
		throw error
	}
}

export default apiRequest

export const fetchSmokingAreas = async ({ userLat, userLng }) =>
	apiRequest(`/api/smoking-area/list?userLat=${userLat}&userLng=${userLng}`)

export const fetchSmokingAreaMarkers = async (userLat, userLng) =>
	apiRequest(`/api/smoking-area/marker?userLat=${userLat}&userLng=${userLng}`)

export const fetchSmokingAreaDetails = async (
	smokingAreaId,
	userLat,
	userLng,
) =>
	apiRequest(
		`/api/smoking-area/${smokingAreaId}/simple?userLat=${userLat}&userLng=${userLng}`,
	)

export const searchSmokingAreas = async ({
	location,
	userLat,
	userLng,
	filter,
}) =>
	apiRequest(`/api/smoking-areas/search`, "POST", {
		location,
		userLat,
		userLng,
		filter,
	})

export const getCurrentLocation = async () =>
	apiRequest(`/api/location/current`)
export const getSmokingAreaMarkers = async ({ userLat, userLng }) =>
	apiRequest(`/api/smoking-area/marker?userLat=${userLat}&userLng=${userLng}`)

// 흡연 구역 관련 API
export const registerSmokingArea = async (data) =>
	await apiRequest(`/api/smoking-area/register`, "POST", data)
export const updateSmokingArea = async (smokingAreaId, data) =>
	await apiRequest(`/api/smoking-area/update/${smokingAreaId}`, "PATCH", data)

// 리뷰 관련 API
export const fetchReviews = async (smokingAreaId) =>
	await apiRequest(`/api/reviews/${smokingAreaId}`)
export const postReview = async (smokingAreaId, data) =>
	await apiRequest(`/api/reviews/${smokingAreaId}`, "POST", data)
export const fetchReviewStars = async (smokingAreaId) =>
	await apiRequest(`/api/reviews/${smokingAreaId}/starInfo`)

// 회원 관련 API
export const fetchUserInfo = async () => await apiRequest(`/api/member/`)
export const updateProfileImage = async (data) =>
	await apiRequest(`/api/member/profileImage`, "PATCH", data)
export const updateNickname = async (data) =>
	await apiRequest(`/api/member/nickname`, "PATCH", data)
export const fetchUserReviews = async () =>
	await apiRequest(`/api/member/reviews`)

// 저장된 흡연 구역 관련 API
export const fetchSavedSmokingAreas = async () =>
	await apiRequest(`/api/saved-smoking-area`)
export const saveSmokingArea = async (smokingAreaId) =>
	await apiRequest(`/api/saved-smoking-area/${smokingAreaId}`, "POST")
export const deleteSavedSmokingArea = async (smokingAreaId) =>
	await apiRequest(`/api/saved-smoking-area/${smokingAreaId}`, "DELETE")

// 공지사항 관련 API
export const fetchNotices = async () => await apiRequest(`/api/member/notices`)
export const fetchNoticeDetail = async (noticeId) =>
	await apiRequest(`/api/member/notices/detail/${noticeId}`)

// 업데이트 내역 관련 API
export const fetchSmokingAreaUpdateHistory = async (smokingAreaId, page = 1) =>
	await apiRequest(
		`/api/updated-history/${smokingAreaId}/smokingArea?page=${page}`,
	)
export const fetchMemberUpdateHistory = async (memberId, page = 1) =>
	await apiRequest(`/api/updated-history/${memberId}/member?page=${page}`)

// 토큰 관련 API
export const reissueToken = async () =>
	await apiRequest(`/api/token/reissue`, "POST")
export const logout = async () => await apiRequest(`/api/token/logout`)

// 오픈 API
export const fetchOpenApi = async (key) =>
	await apiRequest(`/api/open-api/${key}`)

// 헬스 체크
export const healthCheck = async () => await apiRequest(`/health`)

export const SmokingAreaAPI = {
	getList: fetchSmokingAreas,
	getDetails: fetchSmokingAreaDetails,
	getMarkers: fetchSmokingAreaMarkers,
	register: registerSmokingArea,
	update: updateSmokingArea,
	search: searchSmokingAreas,
}
