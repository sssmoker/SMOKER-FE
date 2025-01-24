import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "@/components/common/button/ComButton"

const options = [
	"밀폐형 흡연부스예요",
	"깔끔해요",
	"쓰레기통이 있어요",
	"의자가 있어요",
	"장애인 편의시설이에요",
	"냉난방이 가능해요",
	"야외에 있어요",
]

export default function AddSmokingAreaDetailsPage() {
	const navigate = useNavigate()
	const location = useLocation()
	const [selectedOptions, setSelectedOptions] = useState([])

	const toggleOption = (option) => {
		setSelectedOptions((prev) =>
			prev.includes(option)
				? prev.filter((o) => o !== option)
				: [...prev, option],
		)
	}

	const handleComplete = () => {
		const data = {
			...location.state,
			details: selectedOptions,
		}
		console.log("등록 데이터:", data)
		alert("등록이 완료되었습니다!")
		navigate("/home")
	}

	return (
		<div className="space-y-4 p-6">
			<h1 className="text-xl font-bold">흡연 부스의 정보를 선택해주세요.</h1>
			<div className="flex flex-wrap gap-2">
				{options.map((option) => (
					<button
						key={option}
						className={`rounded border px-4 py-2 ${
							selectedOptions.includes(option) ? "bg-purple-500 text-white" : ""
						}`}
						onClick={() => toggleOption(option)}
					>
						{option}
					</button>
				))}
			</div>
			<Button size="lg" color="purple" onClick={handleComplete}>
				완료
			</Button>
		</div>
	)
}
