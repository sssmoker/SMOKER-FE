import React from "react"
import { Compass } from "lucide-react"

export default function AroundMeBtn() {
	return (
		<div className="flex flex-col items-center justify-center text-[#4517FF]">
			<Compass className="h-5 w-5" />
			<span className="mt-1 text-xs font-medium">내 주변</span>
		</div>
	)
}
