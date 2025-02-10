import React from "react"
import { Compass } from "lucide-react"

export default function AroundMeBtn({ onClick }) {
	return (
		<button
			onClick={() => {
				console.log("내 주변 버튼 클릭됨!") // 디버깅 로그 추가
				if (onClick) {
					onClick() // 클릭 이벤트 실행
				} else {
					console.error("onClick 함수가 전달되지 않음")
				}
			}}
			className="flex flex-col items-center justify-center text-[#4517FF] focus:outline-none"
		>
			<Compass className="h-5 w-5" />
			<span className="mt-1 text-xs font-medium">내 주변</span>
		</button>
	)
}
