import React from "react"

export default function BackgroundImg({ bgImg }) {
	return (
		<>
			<img
				src={bgImg}
				alt="이미지"
				className={`relative top-[-52px] z-[0] mb-[-52px] h-[226px] w-full object-cover object-center`}
			/>
		</>
	)
}
