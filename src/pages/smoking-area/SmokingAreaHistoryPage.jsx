import React from "react"
import BackButton from "@/components/common/button/BackButton"
import HistoryCard from "@/components/smoking-history/HistoryCard"
import ComButton from "@/components/common/button/ComButton"
import { useLocation, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

export default function SmokingAreaHistoryPage() {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const smokingAreaId = queryParams.get("id")

	const navigate = useNavigate()

	const handleMoveToUpdate = () => {
		navigate(`/list/smoking-area/update?id=${smokingAreaId}`)
	}

	const { data, error, isLoading } = useQuery({
		queryKey: ["updatedHistory", smokingAreaId],
		queryFn: async () => {
			const response = await fetch(
				"http://localhost:3001/updated-history",
				// `/api/updated-history/${smokingAreaId}/smokingArea`
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			)
			if (!response.ok) {
				const errorMessage = await response.text()
				throw new Error(`데이터 호출 실패: ${errorMessage}`)
			}
			const jsonResponse = await response.json()
			return jsonResponse?.result
		},
		retry: false, // 재시도 방지
		// retry: 2, // 2번만 재시도
		// retryDelay: 2000, // 2초 간격으로 재시도
	})

	console.log("data: ", data) //

	// if (isLoading) {
	// 	return <div>로딩 중...</div>
	// }

	// if (error) {
	// 	return <div>에러 발생: {error.message}</div>
	// }

	return (
		<>
			<div className="container mx-auto h-screen bg-[#F5F3FF] px-4 py-6">
				<BackButton className="mb-4" />
				<h1 className="text-center text-[22px] font-black text-[#252525]">
					<span className="text-[#4517FF]">정보 수정/등록</span>
					<br />
					사당역 2번 출구 앞 흡연 부스
				</h1>
				<p className="mt-[6px] text-center text-sm text-gray-500">
					정확한 정보 공유는 매너있는 하루를 만들어요!
				</p>

				{/* 흰 박스 */}
				<div className="mt-3 h-[calc(100%-180px)] w-full rounded-t-2xl border border-white bg-white px-4 py-5">
					<ul className="flex max-h-[calc(100%-80px)] flex-col divide-y overflow-y-scroll">
						{data?.updatedHistories.map((item, i) => (
							<HistoryCard key={i} {...item} />
						))}
					</ul>
					<div className="mt-3 flex justify-center">
						<ComButton onClick={handleMoveToUpdate} size="xl">
							정보 수정하러 가기
						</ComButton>
					</div>
				</div>
			</div>
		</>
	)
}
