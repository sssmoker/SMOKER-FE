import React from "react"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

function UpdateButton({ smokingAreaId, data = {} }) {
	const navigate = useNavigate()

	const handleMoveToUpdate = () => {
		navigate(`/list/smoking-area/history?id=${smokingAreaId}`, { state: data })
	}

	return (
		<>
			<button
				onClick={handleMoveToUpdate}
				className="font-regular h-[22px] w-[60px] rounded-full border border-solid border-[#B5B5B5] bg-white text-[10px] text-[#252525]"
			>
				정보수정
			</button>
		</>
	)
}

export default function SmokingAreaInfo({
	smokingAreaId,
	smoking_name = "",
	region = "",
	distance = 0, //
	review_num = 0,
	rating = 0,
	bookmark_count = 0, //
	data = {},
}) {
	return (
		<>
			<div className="mx-[20px] flex flex-col gap-[6px] py-[16px] text-[#252525]">
				<p className="font-regular text-[12px] text-[#b5b5b5]">
					내 위치에서 {distance}m
				</p>
				<div className="mt-[-3px] flex items-center justify-between">
					<h2 className="text-[16px] font-bold">{smoking_name}</h2>
					<UpdateButton smokingAreaId={smokingAreaId} data={data} />
				</div>

				<p className="font-regular text-[10px]">{region}</p>
				<div className="flex items-center gap-[2px]">
					<Star className="h-3 w-3 fill-[#4517FF] text-[#4517FF]" />
					<span className="text-[10px] font-bold">
						{review_num}({rating}) ꞏ 저장 {bookmark_count}
					</span>
				</div>
			</div>
		</>
	)
}
