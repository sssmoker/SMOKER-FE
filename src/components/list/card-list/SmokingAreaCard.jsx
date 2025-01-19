import React, { useState } from "react"
import { Bookmark, Star } from "lucide-react"
import ImgList from "./ImgList"

export default function SmokingAreaCard({
	title,
	isBookmarked,
	rating,
	ratingCount,
	bookmarkCount,
	distance,
	imgList,
}) {
	const [bookmarked, setBookmarked] = useState(isBookmarked)

	const handleBookmark = () => {
		setBookmarked(!bookmarked)
	}

	return (
		<>
			{/* 수정필요: 선색, 폰트 사이즈 조정 */}
			<div className="flex flex-col gap-y-1.5 border-b-[0.5px] border-[#B5B5B5] p-5">
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
					<p className="ml-1 text-[8px] font-normal text-[#B5B5B5]">
						{`내 위치에서 ${distance}`}
					</p>
				</div>

				<ImgList imgList={imgList} />
			</div>
		</>
	)
}
