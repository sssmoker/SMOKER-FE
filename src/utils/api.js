const BASE_URL = "http://localhost:3001"

// 저장된 흡연 구역 가져오기
export async function fetchSavedSmokingAreas() {
	try {
		const response = await fetch(`${BASE_URL}/savedSmokingAreas`)
		return response.json()
	} catch (error) {
		console.error("저장된 흡연 구역 데이터를 가져오지 못했습니다:", error)
		throw error
	}
}

// 특정 흡연 구역의 상세 정보 가져오기
export async function fetchSmokingAreaDetails(id) {
	try {
		const response = await fetch(`${BASE_URL}/smokingAreas/${id}`)
		return response.json()
	} catch (error) {
		console.error(
			`ID가 ${id}인 흡연 구역의 상세 정보를 가져오지 못했습니다:`,
			error,
		)
		throw error
	}
}

// 흡연 구역의 리뷰 데이터 가져오기
export async function fetchReviews(smokingAreaId) {
	try {
		const response = await fetch(
			`${BASE_URL}/reviews?smoking_id=${smokingAreaId}`,
		)
		return response.json()
	} catch (error) {
		console.error(
			`흡연 구역 ID가 ${smokingAreaId}인 리뷰 데이터를 가져오지 못했습니다:`,
			error,
		)
		throw error
	}
}

// 사용자 정보 가져오기
export async function fetchUserInfo() {
	try {
		const response = await fetch(`${BASE_URL}/users/1`) // 로그인된 사용자 ID가 1이라고 가정
		return response.json()
	} catch (error) {
		console.error("사용자 정보를 가져오지 못했습니다:", error)
		throw error
	}
}
