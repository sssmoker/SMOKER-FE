import React, { useState } from "react"
import Map from "@/components/smoking-area/LocationMap"

export default function SmokingAreaDetailPage({ detailInfoList, region }) {
	const [roadAddress, setRoadAddress] = useState(region) // 초기값으로 region 설정

	const options = {
		hasCigaretteDisposal: "담배꽁초 처리함",
		hasChair: "의자",
		hasTrashBin: "쓰레기통",
		hasVentilationSystem: "환기 시스템",
		isRegularlyCleaned: "정기적인 청소",
		hasAirConditioning: "공기 청정 기능",
		hasAirPurifier: "냉난방 기능",
		isAccessible: "휠체어 진입 가능",
		hasVoiceGuidance: "음성 안내 시스템",
		hasCCTV: "CCTV 설치",
		hasFireExtinguisher: "소화기 비치",
		hasSunshade: "햇빛 차단 시설",
		hasRainProtection: "비바람 차단 시설",
		hasEmergencyButton: "비상버튼",
	}

	return (
		<>
			<div className="mx-[20px] mt-[16px] flex flex-wrap justify-center gap-x-[12px] gap-y-[8px]">
				{Object.entries(options)
					.filter(([key]) => detailInfoList?.feature?.[key])
					.map(([key, value]) => (
						<div
							key={key}
							className="mx-[6px] my-[4px] inline-block rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 shadow-[0px_2px_2px_0px_rgba(69,23,255,0.20)] transition-all"
						>
							{value}
						</div>
					))}
			</div>
			<p className="mx-[20px] mt-[28px] text-center text-[16px] font-bold text-[#252525]">
				흡연 부스 위치
			</p>
			<p className="mt-1 text-center text-sm text-gray-600">{roadAddress}</p>
			<div className="mt-4 flex justify-center">
				<div className="h-[400px] w-[90vw] max-w-[600px] overflow-hidden rounded-xl border border-gray-500 shadow-lg">
					<Map roadAddress={roadAddress} />
				</div>
			</div>
		</>
	)
}
