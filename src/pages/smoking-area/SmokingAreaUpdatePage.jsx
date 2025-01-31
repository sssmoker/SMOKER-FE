import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import ComButton from "@/components/common/button/ComButton"
import {
	Title,
	OptionsList,
} from "@/components/smoking-update/OptionsSelection"

const options = [
	"환풍시설이 있어요",
	"깔끔해요",
	"쓰레기통이 있어요",
	"의자가 있어요",
	"장애인 편의시설이에요",
	"냉난방이 가능해요",
	"야외에 있어요",
]

export default function SmokingAreaUpdatePage() {
	const navigate = useNavigate()
	const [selectedOptions, setSelectedOptions] = useState([])

	const toggleOption = (option) => {
		setSelectedOptions((prev) =>
			prev.includes(option)
				? prev.filter((o) => o !== option)
				: [...prev, option],
		)
	}

	const handleSubmit = () => {
		navigate("/list/smoking-area")
	}

	return (
		<>
			<div className="container mx-auto h-screen bg-[#F5F3FF] px-4 py-6">
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

				{/* 흰 박스 */}
				<div className="mb-[8px] mt-[32px] w-full rounded-2xl border border-white bg-white px-6 py-8">
					<Title text="흡연 부스의 정보를 수정해주세요." />
					<OptionsList
						options={options}
						selectedOptions={selectedOptions}
						onToggle={toggleOption}
					/>
				</div>

				<a
					href="https://naver.com"
					className="text-[11px] font-semibold text-[#828282]"
					target="_blank"
					rel="noopener noreferrer"
				>
					존재하지 않는 장소인가요?{" "}
					<span className="text-[#4517FF] underline">신고하러 가기</span>
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
