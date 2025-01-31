import React, { useState } from "react"
import { Bookmark, Star } from "lucide-react"
import ImgCard from "./ImgCard"

export default function SmokingAreaCard({
	title,
	isBookmarked,
	rating,
	ratingCount,
	bookmarkCount,
	distance,
	img,
}) {
	const [bookmarked, setBookmarked] = useState(isBookmarked)

	const handleBookmark = () => {
		setBookmarked(!bookmarked)
	}

	return (
		<>
			<li className="flex w-full gap-[16px] border-b-[0.5px] border-[#e6e6e6] px-5 py-4">
				{img && <ImgCard Img={img} />}
				<div className="flex w-full flex-col gap-y-1">
					<div className="flex justify-between">
						<p className="text-[13px] font-semibold text-[#000]">{title}</p>
						<Bookmark
							onClick={handleBookmark}
							className={`h-5 w-5 text-[#252525] ${
								bookmarked ? "fill-[#252525]" : "fill-none"
							}`}
						/>
					</div>

					<div className="flex items-center gap-0.5">
						<Star className="h-3 w-3 fill-[#4517FF] text-[#4517FF]" />
						<p className="text-[10px] font-normal text-[#252525]">
							{`${rating}(${ratingCount}) ꞏ 저장 ${bookmarkCount}`}
						</p>
						{!img && (
							<p className="ml-1 text-[8px] font-normal text-[#B5B5B5]">
								{`내 위치에서 ${distance}`}
							</p>
						)}
					</div>

					{img && (
						<p className="ml-1 text-[8px] font-normal text-[#B5B5B5]">
							{`내 위치에서 ${distance}`}
						</p>
					)}
				</div>
			</li>
		</>
	)
}
