import React from "react"
import { Star } from "lucide-react"
import UpdateButton from "./UpdateButton"

export default function SmokingAreaInfo({ smoking_name, region }) {
	return (
		<>
			<div className="mx-[20px] flex flex-col gap-[6px] py-[16px] text-[#252525]">
				<p className="font-regular text-[12px] text-[#b5b5b5]">
					내 위치에서 100m
				</p>
				<div className="mt-[-3px] flex items-center justify-between">
					<h2 className="text-[16px] font-bold">{smoking_name}</h2>
					<UpdateButton />
				</div>

				<p className="font-regular text-[10px]">{region}</p>
				<div className="flex items-center gap-[2px]">
					<Star className="h-3 w-3 fill-[#4517FF] text-[#4517FF]" />
					<span className="text-[10px] font-bold">4.3(3) ꞏ 저장 30</span>
				</div>
			</div>
		</>
	)
}
