import React from "react"
import BackButton from "@/components/common/button/BackButton"
import HistoryCard from "@/components/smoking-history/HistoryCard"
import ComButton from "@/components/common/button/ComButton"
import { useLocation, useNavigate } from "react-router-dom"
import { useSmokingAreaUpdateHistory } from "@/utils/queries"
import { smokingAreaHistoryDummy } from "@/mock/smokingAreaHistoryDummy"

export default function SmokingAreaHistoryPage() {
	const location = useLocation()
	const data = location.state
	const queryParams = new URLSearchParams(location.search)
	const smokingAreaId = queryParams.get("id")

	const navigate = useNavigate()

	const handleMoveToUpdate = () => {
		navigate(`/list/smoking-area/update?id=${smokingAreaId}`, { state: data })
	}

	// 토근 없을 시 로그인 화면으로 이동 플로우 추가하기
	// api 연결
	// const { data, error, isLoading } = useSmokingAreaUpdateHistory(
	// 	smokingAreaId,
	// 	0,
	// )
	const dataList = smokingAreaHistoryDummy
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
					{data.location.address}
				</h1>
				<p className="mt-[6px] text-center text-sm text-gray-500">
					정확한 정보 공유는 매너있는 하루를 만들어요!
				</p>

				{/* 흰 박스 */}
				<div className="mt-3 h-[calc(100%-180px)] w-full rounded-t-2xl border border-white bg-white px-4 py-5">
					<ul className="flex max-h-[calc(100%-80px)] flex-col divide-y overflow-y-scroll">
						{dataList?.updatedHistories.map((item, i) => (
							<HistoryCard key={i} {...item} />
						))}
					</ul>
					<div className="mt-3 flex justify-center">
						<ComButton
							onClick={handleMoveToUpdate}
							children="정보 수정하러 가기"
							size="xl"
						/>
					</div>
				</div>
			</div>
		</>
	)
}
