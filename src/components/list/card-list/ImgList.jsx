import React from "react"
import ImgCard from "./ImgCard"

export default function ImgList({ imgList }) {
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
