import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import ComButton from "@/components/common/button/ComButton"
import {
	Title,
	OptionsList,
} from "@/components/smoking-update/OptionsSelection"
import CompleteToast from "@/components/smoking-add/completeToast"
const optionMap = {
	"담배꽁초 처리함": "hasCigaretteDisposal",
	"의자 ": "hasChair",
	"쓰레기통 ": "hasTrashBin",
	"환기 시스템": "hasVentilationSystem",
	"정기적인 청소": "isRegularlyCleaned",
	"공기 청정 기능": "hasAirPurifier",
	"냉난방 기능": "hasAirConditioning",
	"휠체어 진입 가능": "isAccessible",
	"음성 안내 시스템": "hasVoiceGuidance",
	"CCTV 설치": "hasCCTV",
	"소화기 비치": "hasFireExtinguisher",
	"햇빛 차단 시설": "hasSunshade",
	"비바람 차단 시설": "hasRainProtection",
	"비상버튼 ": "hasEmergencyButton",
}

const optionKeys = Object.fromEntries(
	Object.values(optionMap).map((key) => [key, false]),
)

export default function SmokingAreaUpdatePage() {
	// /api/smoking-area/update/{smokingAreaId}
	const navigate = useNavigate()

	const [showCompleteToast, setShowCompleteToast] = useState(false)
	// const [selectedOptions, setSelectedOptions] = useState([])
	const [selectedOptionsData, setSelectedOptionsData] = useState(optionKeys)

	const toggleOption = (option) => {
		const key = optionMap[option]
		if (!key) return

		setSelectedOptionsData((prev) => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	const handleSubmit = () => {
		setShowCompleteToast(true)
		setTimeout(() => {
			navigate("/list/smoking-area")
		}, 3200)
		console.log("optionKeys: ", selectedOptionsData)
	}

	return (
		<>
			<div className="container mx-auto h-screen bg-[#F5F3FF] px-4 py-6">
				<CompleteToast
					isVisible={showCompleteToast}
					onClose={() => setShowCompleteToast(false)}
				/>
				<div className="flex items-start gap-[12px]">
					<BackButton className="mb-4" />
					<div>
						<h1 className="mt-[6px] text-[16px] font-bold text-[#000]">
							사당역 2번 출구 앞 흡연 부스
						</h1>
						<p className="font-regular mt-[6px] text-[13px] text-[#555]">
							방문 후기를 남겨주세요!
						</p>
					</div>
				</div>
				<div className="mb-[8px] mt-[32px] w-full rounded-2xl border border-white bg-white px-6 py-8">
					<Title text="흡연 부스의 정보를 수정해주세요." />
					<OptionsList
						options={Object.keys(optionMap)}
						selectedOptions={Object.keys(optionMap).filter(
							(option) => selectedOptionsData[optionMap[option]],
						)}
						onToggle={toggleOption}
					/>
				</div>

				<a
					href="https://www.notion.so/redsummerluv/Smoker-146d9c6dcc318005aa4aed726c5a9c17?pvs=4"
					className="text-[11px] font-semibold text-[#828282]"
					target="_blank"
					rel="noopener noreferrer"
				>
					존재하지 않는 장소인가요?{" "}
					<span className="text-[#4517FF] underline">클릭</span>
				</a>

				<div className="mt-8 flex justify-center">
					<ComButton onClick={handleSubmit} size="xl">
						완료
					</ComButton>
				</div>
			</div>
		</>
	)
}
