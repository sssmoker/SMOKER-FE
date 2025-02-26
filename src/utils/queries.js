import {
	useQuery,
	useMutation,
	useQueryClient,
	useQueries,
} from "@tanstack/react-query"
import {
	fetchSmokingAreas,
	fetchSmokingAreaDetails,
	registerSmokingArea,
	updateSmokingArea,
	fetchSmokingAreaMarkers,
	fetchReviews,
	postReview,
	fetchReviewStars,
	fetchUserInfo,
	updateProfileImage,
	updateNickname,
	fetchUserReviews,
	fetchSavedSmokingAreas,
	saveSmokingArea,
	deleteSavedSmokingArea,
	fetchNotices,
	fetchNoticeDetail,
	fetchSmokingAreaUpdateHistory,
	fetchMemberUpdateHistory,
	apiRequestWithAuth,
	reissueToken,
	logout,
	fetchOpenApi,
	healthCheck,
	searchSmokingArea,
} from "@/utils/api"

//  흡연 구역 목록 가져오기
export const useSmokingAreas = ({ userLat, userLng, selectedFilter }) =>
	useQuery({
		queryKey: ["smokingAreas", userLat, userLng],
		queryFn: () => fetchSmokingAreas({ userLat, userLng, selectedFilter }),
		retry: 1,
		onError: (error) =>
			console.error("흡연 구역 목록을 불러오는 데 실패했습니다.", error),
	})

//  흡연 구역 검색 목록
export const useSearchSmokingAreas = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: searchSmokingArea,
		onSuccess: () => {
			queryClient.invalidateQueries(["smokingAreas"])
		},
		onError: (error) => console.error("흡연 구역 검색 실패:", error),
	})
}

// 특정 흡연 구역 상세 조회, 리뷰 목록 조회, 총 별점 및 개수 조회
export const useSmokingAreaDetailsPage = (smokingAreaId) =>
	useQueries({
		queries: [
			{
				queryKey: ["smokingAreaDetails", smokingAreaId],
				queryFn: () => fetchSmokingAreaDetails(smokingAreaId),
				enabled: !!smokingAreaId,
				retry: 1,
				onError: (error) => console.error("흡연 구역 상세 조회 실패:", error),
			},
			{
				queryKey: ["reviews", smokingAreaId],
				queryFn: () => fetchReviews(smokingAreaId),
				enabled: !!smokingAreaId,
				retry: 1,
				onError: (error) => console.error("리뷰 목록 조회 실패:", error),
			},
			{
				queryKey: ["reviewStars", smokingAreaId],
				queryFn: () => fetchReviewStars(smokingAreaId),
				enabled: !!smokingAreaId,
				retry: 1,
				onError: (error) => console.error("별점 조회 실패:", error),
			},
		],
	})
//  특정 흡연 구역 상세 조회
// export const useSmokingAreaDetails = (smokingAreaId) =>
// 	useQuery({
// 		queryKey: ["smokingAreaDetails", smokingAreaId],
// 		queryFn: () => fetchSmokingAreaDetails(smokingAreaId),
// 		enabled: !!smokingAreaId,
// 		retry: 1,
// 		onError: (error) => console.error("흡연 구역 상세 조회 실패:", error),
// 	})

//  흡연 구역 등록
export const useRegisterSmokingArea = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: registerSmokingArea,
		onSuccess: () => {
			queryClient.invalidateQueries(["smokingAreas"])
		},
		onError: (error) => console.error("흡연 구역 등록 실패:", error),
	})
}

//  흡연 구역 수정
export const useUpdateSmokingArea = (smokingAreaId) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data) => updateSmokingArea(smokingAreaId, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["smokingAreaDetails", smokingAreaId])
		},
		onError: (error) => console.error("흡연 구역 수정 실패:", error),
	})
}

//  흡연 구역 마커 조회
export const useSmokingAreaMarkers = () =>
	useQuery({
		queryKey: ["smokingAreaMarkers"],
		queryFn: fetchSmokingAreaMarkers,
		retry: 1,
		onError: (error) =>
			console.error("마커 데이터를 불러오는 데 실패했습니다.", error),
	})

//  리뷰 목록 조회
// export const useReviews = (smokingAreaId) =>
// 	useQuery({
// 		queryKey: ["reviews", smokingAreaId],
// 		queryFn: () => fetchReviews(smokingAreaId),
// 		enabled: !!smokingAreaId,
// 		retry: 1,
// 		onError: (error) => console.error("리뷰 목록 조회 실패:", error),
// 	})

//  리뷰 등록
export const usePostReview = (smokingAreaId) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data) => postReview(smokingAreaId, data),
		onSuccess: () => {
			queryClient.invalidateQueries(["reviews", smokingAreaId])
		},
		onError: (error) => console.error("리뷰 등록 실패:", error),
	})
}

//  총 별점 및 개수 조회
// export const useReviewStars = (smokingAreaId) =>
// 	useQuery({
// 		queryKey: ["reviewStars", smokingAreaId],
// 		queryFn: () => fetchReviewStars(smokingAreaId),
// 		enabled: !!smokingAreaId,
// 		retry: 1,
// 		onError: (error) => console.error("별점 조회 실패:", error),
// 	})

//  사용자 정보 조회
export const useUserInfo = () =>
	useQuery({
		queryKey: ["userInfo"],
		queryFn: fetchUserInfo,
		retry: 1,
		onError: (error) => console.error("사용자 정보 조회 실패:", error),
	})

//  프로필 이미지 변경
export const useUpdateProfileImage = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateProfileImage,
		onSuccess: () => {
			queryClient.invalidateQueries(["userInfo"])
		},
		onError: (error) => console.error("프로필 이미지 변경 실패:", error),
	})
}

//  닉네임 변경
export const useUpdateNickname = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateNickname,
		onSuccess: () => {
			queryClient.invalidateQueries(["userInfo"])
		},
		onError: (error) => console.error("닉네임 변경 실패:", error),
	})
}

//  사용자가 작성한 리뷰 조회
export const useUserReviews = () =>
	useQuery({
		queryKey: ["userReviews"],
		queryFn: fetchUserReviews,
		retry: 1,
		onError: (error) => console.error("내가 작성한 리뷰 조회 실패:", error),
	})

//  저장된 흡연 구역 조회
export const useSavedSmokingAreas = () =>
	useQuery({
		queryKey: ["savedSmokingAreas"],
		queryFn: fetchSavedSmokingAreas,
		retry: 1,
		onError: (error) =>
			console.error("저장된 흡연 구역 목록 조회 실패:", error),
	})

//  흡연 구역 저장
export const useSaveSmokingArea = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: saveSmokingArea,
		onSuccess: () => {
			queryClient.invalidateQueries(["savedSmokingAreas"])
		},
		onError: (error) => console.error("흡연 구역 저장 실패:", error),
	})
}

//  저장된 흡연 구역 삭제
export const useDeleteSavedSmokingArea = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteSavedSmokingArea,
		onSuccess: () => {
			queryClient.invalidateQueries(["savedSmokingAreas"])
		},
		onError: (error) => console.error("저장된 흡연 구역 삭제 실패:", error),
	})
}

//  공지사항 조회
export const useNotices = () =>
	useQuery({
		queryKey: ["notices"],
		queryFn: fetchNotices,
		retry: 1,
		onError: (error) => console.error("공지사항 조회 실패:", error),
	})

//  공지사항 상세 조회
export const useNoticeDetail = (noticeId) =>
	useQuery({
		queryKey: ["noticeDetail", noticeId],
		queryFn: () => fetchNoticeDetail(noticeId),
		enabled: !!noticeId,
		retry: 1,
		onError: (error) => console.error("공지사항 상세 조회 실패:", error),
	})

//  흡연 구역 업데이트 내역 조회
export const useSmokingAreaUpdateHistory = (smokingAreaId, page = 0) =>
	useQuery({
		queryKey: ["smokingAreaUpdateHistory", smokingAreaId, page],
		queryFn: () => fetchSmokingAreaUpdateHistory(smokingAreaId, page),
		enabled: !!smokingAreaId,
		retry: 1,
		onError: (error) =>
			console.error("흡연 구역 업데이트 내역 조회 실패:", error),
	})

//  멤버 업데이트 내역 조회
export const useMemberUpdateHistory = (memberId, page = 0) =>
	useQuery({
		queryKey: ["memberUpdateHistory", memberId, page],
		queryFn: () => fetchMemberUpdateHistory(memberId, page),
		enabled: !!memberId,
		retry: 1,
		onError: (error) => console.error("멤버 업데이트 내역 조회 실패:", error),
	})

//  JWT 액세스 토큰 재발급
export const useReissueToken = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: reissueToken,
		onSuccess: (data) => {
			console.log("토큰 재발급 성공:", data)

			// 세션 스토리지에 최신 토큰 저장
			sessionStorage.setItem(
				"tokens",
				JSON.stringify({
					accessToken: data.result.accessToken,
					refreshToken: data.result.refreshToken,
				}),
			)

			// 모든 사용자 관련 데이터 새로고침
			queryClient.invalidateQueries(["userInfo"])
			queryClient.invalidateQueries(["savedSmokingAreas"]) // 저장된 흡연 구역
			queryClient.invalidateQueries(["userReviews"]) // 사용자가 작성한 리뷰
		},
		onError: (error) => console.error("토큰 재발급 실패:", error),
	})
}

// 로그아웃
export const useLogout = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			console.log("로그아웃 성공")

			// 세션 스토리지 정리
			sessionStorage.removeItem("tokens")
			sessionStorage.removeItem("member")

			// React Query 캐시 전체 삭제 (사용자 정보 및 관련 데이터 초기화)
			queryClient.clear()
		},
		onError: (error) => console.error("로그아웃 실패:", error),
	})
}

//  Open API 조회
export const useOpenApi = (key) =>
	useQuery({
		queryKey: ["openApi", key],
		queryFn: () => fetchOpenApi(key),
		enabled: !!key,
		retry: 1,
		onError: (error) => console.error("Open API 조회 실패:", error),
	})

//  서버 헬스 체크
export const useHealthCheck = () =>
	useQuery({
		queryKey: ["healthCheck"],
		queryFn: healthCheck,
		retry: 1,
		onError: (error) => console.error("서버 헬스 체크 실패:", error),
	})
