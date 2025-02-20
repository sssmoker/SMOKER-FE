import React, { useState } from "react"
import { Bookmark, Star } from "lucide-react"
import ImgCard from "./ImgCard"
import { useNavigate } from "react-router-dom"

export default function SmokingAreaCard({
	smokingAreaName,
	isBookmarked,
	rating,
	reviewCount,
	savedCount,
	distance,
	imageUrl,
	smokingAreaId,
	data,
}) {
	const navigate = useNavigate()
	const [bookmarked, setBookmarked] = useState(isBookmarked)

	const toggleBookmark = () => {
		setBookmarked(!bookmarked)
	}

	const handleMoveToSmokingArea = () => {
		navigate(`/list/smoking-area?id=${data.smokingAreaId}`, { state: data })
	}

	return (
		<>
			<li className="flex w-full gap-[16px] border-b-[0.5px] border-[#e6e6e6] px-5 py-4">
				{data.imageUrl && <ImgCard Img={`${data.imageUrl}`} />}
				<div className="flex w-full justify-between">
					<div
						onClick={handleMoveToSmokingArea}
						className="flex w-full flex-col gap-y-1"
					>
						<p className="text-[13px] font-semibold text-[#000]">
							{data.smokingAreaName}
						</p>

						<div className="flex items-center gap-0.5">
							<Star className="h-3 w-3 fill-[#4517FF] text-[#4517FF]" />
							<p className="text-[10px] font-normal text-[#252525]">
								{`${data.rating}(${data.reviewCount}) ꞏ 저장 ${data.savedCount}`}
							</p>
							{!data.imageUrl && (
								<p className="ml-1 text-[8px] font-normal text-[#B5B5B5]">
									{`내 위치에서 ${data.distance}m`}
								</p>
							)}
						</div>
						{data.imageUrl && (
							<p className="ml-1 text-[8px] font-normal text-[#B5B5B5]">
								{`내 위치에서 ${data.distance}m`}
							</p>
						)}
					</div>

					<Bookmark
						onClick={toggleBookmark}
						className={`h-5 w-5 text-[#252525] ${
							bookmarked ? "fill-[#252525]" : "fill-none"
						}`}
					/>
				</div>
			</li>
		</>
	)
}
