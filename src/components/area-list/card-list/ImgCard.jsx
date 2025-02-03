import React from "react"

export default function ImgCard({ Img }) {
	return (
		<>
			<img
				className="h-[84px] w-[84px] rounded-xl object-cover"
				src={Img || "N/A"}
				alt="사진"
			/>
		</>
	)
}
