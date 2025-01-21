import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "@/components/common/button/ComButton"

export default function AddSmokingAreaNamePage() {
	const navigate = useNavigate()
	const location = useLocation()
	const [name, setName] = useState("")

	const handleNext = () => {
		if (name.trim()) {
			navigate("/add-smoking-area-details", {
				state: { ...location.state, name },
			})
		} else {
			alert("흡연 구역 이름을 입력해주세요!")
		}
	}

	return (
		<div className="space-y-4 p-6">
			<h1 className="text-xl font-bold">흡연 구역의 이름을 입력해주세요.</h1>
			<input
				type="text"
				className="w-full rounded border p-3"
				placeholder="예: 청파성당 앞 흡연 부스"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Button size="lg" color="purple" onClick={handleNext}>
				다음
			</Button>
		</div>
	)
}
