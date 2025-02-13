const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 공통 요청 함수
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

// 흡연 구역 관련 API
export const fetchSmokingAreas = async () =>
	await apiRequest(`/api/smoking-area/list`)
export const fetchSmokingAreaDetails = async (smokingAreaId) =>
	await apiRequest(`/api/smoking-area/${smokingAreaId}`)
export const registerSmokingArea = async (data) =>
	await apiRequest(`/api/smoking-area/register`, "POST", data)
export const updateSmokingArea = async (smokingAreaId, data) =>
	await apiRequest(`/api/smoking-area/update/${smokingAreaId}`, "PATCH", data)
export const fetchSmokingAreaMarkers = async () =>
	await apiRequest(`/api/smoking-area/marker`)

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

// 저장된 흡연 구역
export const fetchSavedSmokingAreas = async () =>
	await apiRequest(`/api/saved-smoking-area`)
export const saveSmokingArea = async (smokingAreaId) =>
	await apiRequest(`/api/saved-smoking-area/${smokingAreaId}`, "POST")
export const deleteSavedSmokingArea = async (smokingAreaId) =>
	await apiRequest(`/api/saved-smoking-area/${smokingAreaId}`, "DELETE")

// 공지사항
export const fetchNotices = async () => await apiRequest(`/api/member/notices`)
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
export const logout = async () => await apiRequest(`/api/token/logout`)

// 오픈 API
export const fetchOpenApi = async (key) =>
	await apiRequest(`/api/open-api/${key}`)

// 헬스 체크
export const healthCheck = async () => await apiRequest(`/health`)
