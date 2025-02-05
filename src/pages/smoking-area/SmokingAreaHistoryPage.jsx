import React from "react"
import BackButton from "@/components/common/button/BackButton"
import HistoryCard from "@/components/smoking-history/HistoryCard"
import ComButton from "@/components/common/button/ComButton"
import { useNavigate } from "react-router-dom"

export default function SmokingAreaHistoryPage() {
	const navigate = useNavigate()

	const handleMoveToUpdate = () => {
		navigate("/list/smoking-area/update")
	}

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
						{/* map 함수 추가 */}
						<HistoryCard />
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
