// AddSmokingAreaPage.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddSmokingAreaPage() {
	const navigate = useNavigate()
	const [address, setAddress] = useState("서울 동작구 남부순환로 2089")

	const handleNext = () => {
		navigate("/add-smoking-area/details")
	}

	return (
		<div className="h-screen w-full bg-gray-100">
			<header className="bg-white p-4 shadow-md">
				<h1 className="text-lg font-bold">
					등록할 흡연 구역의 위치를 설정해주세요.
				</h1>
				<p className="text-sm text-gray-600">
					정확한 위치가 맞는지 확인해주세요.
				</p>
			</header>

			{/* 지도 표시 영역 */}
			<div id="map" className="h-[60%] bg-gray-300"></div>

			{/* 위치 정보 및 버튼 */}
			<div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
				<p className="text-gray-800">{address}</p>
				<button
					onClick={handleNext}
					className="mt-4 w-full rounded-md bg-purple-500 py-3 text-white"
				>
					다음
				</button>
			</div>
		</div>
	)
}
