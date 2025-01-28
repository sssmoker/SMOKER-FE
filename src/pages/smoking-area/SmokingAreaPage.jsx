import React, { useState } from "react"
import Topbar from "@/components/smoking-area/default/Topbar"
import BackgroundImg from "@/components/smoking-area/default/BackgroundImg"
import DummyPng from "@/assets/dummy/SM_01_img1.png" // imageUrl

export default function SmokingAreaPage() {
	const [bgImg, setBgImg] = useState(DummyPng) // imageUrl

	return (
		<>
			<Topbar />
			{bgImg && <BackgroundImg bgImg={bgImg} />}

			<p>smoking-area([SM_01] 흡연 구역 정보)</p>
		</>
	)
}
