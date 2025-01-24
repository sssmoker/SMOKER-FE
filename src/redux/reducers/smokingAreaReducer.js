const initialState = {
	savedAreas: [], // 저장된 흡연 구역
	currentArea: null, // 현재 선택된 흡연 구역
	isLoading: false, // 로딩 상태
	error: null, // 오류 메시지
}

export default function smokingAreaReducer(state = initialState, action) {
	switch (action.type) {
		case "FETCH_SAVED_AREAS_REQUEST": // 저장된 흡연 구역 데이터 요청
			return {
				...state,
				isLoading: true,
			}
		case "FETCH_SAVED_AREAS_SUCCESS": // 저장된 흡연 구역 데이터 성공적으로 로드
			return {
				...state,
				isLoading: false,
				savedAreas: action.payload,
			}
		case "FETCH_SAVED_AREAS_FAILURE": // 저장된 흡연 구역 데이터 로드 실패
			return {
				...state,
				isLoading: false,
				error: action.payload,
			}
		case "SET_CURRENT_AREA": // 현재 선택된 구역 설정
			return {
				...state,
				currentArea: action.payload,
			}
		default:
			return state
	}
}
