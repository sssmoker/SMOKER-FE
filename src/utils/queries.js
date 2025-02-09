import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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
	reissueToken,
	logout,
	fetchOpenApi,
} from "@/utils/api"

//  흡연 구역 목록 가져오기
export const useSmokingAreas = () =>
	useQuery({
		queryKey: ["smokingAreas"],
		queryFn: fetchSmokingAreas,
		retry: 1,
		onError: (error) =>
			console.error("흡연 구역 목록을 불러오는 데 실패했습니다.", error),
	})

//  특정 흡연 구역 상세 조회
export const useSmokingAreaDetails = (smokingAreaId) =>
	useQuery({
		queryKey: ["smokingAreaDetails", smokingAreaId],
		queryFn: () => fetchSmokingAreaDetails(smokingAreaId),
		enabled: !!smokingAreaId,
		retry: 1,
		onError: (error) => console.error("흡연 구역 상세 조회 실패:", error),
	})

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
export const useReviews = (smokingAreaId) =>
	useQuery({
		queryKey: ["reviews", smokingAreaId],
		queryFn: () => fetchReviews(smokingAreaId),
		enabled: !!smokingAreaId,
		retry: 1,
		onError: (error) => console.error("리뷰 목록 조회 실패:", error),
	})

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
export const useReviewStars = (smokingAreaId) =>
	useQuery({
		queryKey: ["reviewStars", smokingAreaId],
		queryFn: () => fetchReviewStars(smokingAreaId),
		enabled: !!smokingAreaId,
		retry: 1,
		onError: (error) => console.error("별점 조회 실패:", error),
	})

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
export const useReissueToken = () =>
	useMutation({
		mutationFn: reissueToken,
		onSuccess: (data) => console.log("토큰 재발급 성공:", data),
		onError: (error) => console.error("토큰 재발급 실패:", error),
	})

//  로그아웃
export const useLogout = () =>
	useMutation({
		mutationFn: logout,
		onSuccess: () => console.log("로그아웃 성공"),
		onError: (error) => console.error("로그아웃 실패:", error),
	})

//  Open API 조회
export const useOpenApi = (key) =>
	useQuery({
		queryKey: ["openApi", key],
		queryFn: () => fetchOpenApi(key),
		enabled: !!key,
		retry: 1,
		onError: (error) => console.error("Open API 조회 실패:", error),
	})
