import React from "react"

export default function ImgCard({ Img }) {
	return (
		<>
			<img
				className="h-25.5 w-25.5 rounded-xl object-cover"
				src={Img}
				alt="사진"
			/>
		</>
	)
}
