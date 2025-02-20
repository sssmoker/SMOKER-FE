import React from "react"
import { Compass } from "lucide-react"

export default function AroundMeButton({ onClick }) {
	return (
		<button
			onClick={() => {
				if (onClick) {
					onClick()
				} else {
					console.error("onClick 함수가 전달되지 않음")
				}
			}}
			className="flex flex-col items-center justify-center text-[#4517FF] focus:outline-none"
		>
			<Compass className="h-5 w-5" />
			<span className="mt-1 w-[24px] text-[8px] font-medium">내 주변</span>
		</button>
	)
}
