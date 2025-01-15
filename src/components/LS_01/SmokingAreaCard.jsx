import React from "react"
import BookmarkSvg from "@/assets/icons/bookmark_icon.svg"
import StarSvg from "@/assets/icons/star_mini_icon.svg"
import SmokingAreaPng from "@/assets/dummy/LS_01_img1.png"

export default function SmokingAreaCard() {
	return (
		<>
			{/* 수정필요: 선색, 폰트 사이즈 조정 */}
			<div className="border-currentColor flex flex-col gap-y-1.5 border-b-2 p-5">
				<div className="flex justify-between">
					<p className="text-sm font-semibold">사당역 2번 출구 앞 흡연 부스</p>
					<img className="px-1" src={BookmarkSvg} alt="북마크" />
				</div>

				<div className="flex items-center gap-0.5">
					<img src={StarSvg} alt="별점" />
					<p className="text-2.5 font-normal text-gray-800">4.3(3) ꞏ 저장 30</p>
					<p className="text-2 ml-1 font-normal text-gray-400">
						내 위치에서 197m
					</p>
				</div>

				<div className="mt-0.5 flex gap-2">
					<img
						className="h-25.5 w-25.5 rounded-xl object-cover"
						src={SmokingAreaPng}
						alt="사진"
					/>
					<img
						className="h-25.5 w-25.5 rounded-xl object-cover"
						src={SmokingAreaPng}
						alt="사진"
					/>
					<img
						className="h-25.5 w-25.5 rounded-xl object-cover"
						src={SmokingAreaPng}
						alt="사진"
					/>
				</div>
			</div>
		</>
	)
}
