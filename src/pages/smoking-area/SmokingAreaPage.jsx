import React, { useEffect, useState } from "react"
import Topbar from "@/components/smoking-area/default/Topbar"
import BackgroundImg from "@/components/smoking-area/default/BackgroundImg"
import SmokingAreaInfo from "@/components/smoking-area/default/SmokingAreaInfo"

import DummyPng from "@/assets/dummy/SM_01_img1.png" // imageUrl

export default function SmokingAreaPage() {
	const [bgImg, setBgImg] = useState(DummyPng) // imageUrl
	const [smokingArea, setSmokingArea] = useState({})

	useEffect(() => {
		const fetchSmokingArea = async () => {
			try {
				const response = await fetch(`http://localhost:3001/smokingAreas`)
				const data = await response.json()
				console.log(data[0])

				setSmokingArea(data[0] || {})
			} catch (error) {
				console.error("흡연 구역 데이터를 가져오지 못했습니다.", error)
			}
		}

		fetchSmokingArea()
	}, [])

	return (
		<div className="bg-white">
			<Topbar />
			{/* 이미지 연결 예정 */}
			{bgImg && <BackgroundImg bgImg={bgImg} />}

			{/* api 추후 수정 예정 */}
			<SmokingAreaInfo {...smokingArea} />
		</div>
	)
}
