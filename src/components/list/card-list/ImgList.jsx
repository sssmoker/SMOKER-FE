import React, { useState } from "react"
import ImgCard from "./ImgCard"
import SmokingAreaPng from "@/assets/dummy/LS_01_img1.png" //

export default function ImgList() {
	const [imgList, setImgList] = useState([
		SmokingAreaPng,
		SmokingAreaPng,
		SmokingAreaPng,
		SmokingAreaPng,
	])

	return (
		<>
			<div className="mt-0.5 flex gap-2 overflow-x-scroll">
				{imgList.map((img, i) => (
					<ImgCard key={i} Img={img} />
				))}
			</div>
		</>
	)
}
