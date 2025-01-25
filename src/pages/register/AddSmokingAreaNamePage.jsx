import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import ComButton from "@/components/common/button/ComButton"
import OptionsSelection from "@/components/smoking-update/OptionsSelection"

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

	const handleNext = () => {
		if (name.trim()) {
			setShowOptions(true)
		} else {
			alert("흡연 구역 이름을 입력해주세요!")
		}
	}

	const handleComplete = () => {
		navigate("/add-smoking-area-details", {
			state: { ...location.state, name },
		})
	}

	return (
		<div className="h-screen space-y-4 bg-white p-6">
			<h1 className="pb-[5vh] font-bold text-gray-500">
				정보를 업데이트해주세요 !
			</h1>
			<h1 className="text-xl font-bold">흡연 구역의 이름을 입력해주세요.</h1>
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
				<div className="mt-4">
					<OptionsSelection onComplete={handleComplete} />
				</div>
			)}
		</div>
	)
}
