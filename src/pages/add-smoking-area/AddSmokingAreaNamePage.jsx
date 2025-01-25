import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
	Title,
	OptionsList,
	CompleteButton,
} from "@/components/smoking-update/OptionsSelection"
import ComButton from "@/components/common/button/ComButton"

const options = [
	"밀폐형 흡연부스예요",
	"깔끔해요",
	"쓰레기통이 있어요",
	"의자가 있어요",
	"장애인 편의시설이에요",
	"냉난방이 가능해요",
	"야외에 있어요",
]

export default function AddSmokingAreaNamePage() {
	const navigate = useNavigate()
	const location = useLocation()
	const [name, setName] = useState("")
	const [showOptions, setShowOptions] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState([])

	const toggleOption = (option) => {
		setSelectedOptions((prev) =>
			prev.includes(option)
				? prev.filter((o) => o !== option)
				: [...prev, option],
		)
	}

	const handleNext = () => {
		if (name.trim()) {
			setShowOptions(true)
		} else {
			alert("흡연 구역 이름을 입력해주세요!")
		}
	}

	const handleComplete = () => {
		const data = {
			...location.state,
			name,
			details: selectedOptions,
		}
		console.log("등록 데이터:", data)
		alert("등록이 완료되었습니다!")
		navigate("/")
	}

	return (
		<div className="h-screen space-y-4 bg-white p-6">
			<Title text="정보를 업데이트해주세요!" />
			<Title text="흡연 구역의 이름을 입력해주세요." />
			<input
				type="text"
				className="w-full rounded border p-3"
				placeholder="예: 청파성당 앞 흡연 부스"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<ComButton size="xl" color="purple" onClick={handleNext}>
				다음
			</ComButton>
			{showOptions && (
				<div className="mt-[5vh]">
					<Title text="흡연 부스의 정보를 선택해주세요." />
					<OptionsList
						options={options}
						selectedOptions={selectedOptions}
						onToggle={toggleOption}
					/>
					<CompleteButton onClick={handleComplete} />
				</div>
			)}
		</div>
	)
}
