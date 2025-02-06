import React from "react"
import { Star } from "lucide-react"

export default function StarRatingStatistics({ avg, count, stars = [] }) {
	let maxCount = stars[0] // 그래프 스타일용
	for (let index = 0; index < stars.length - 1; index++) {
		if (maxCount < stars[index + 1]) {
			maxCount = stars[index + 1]
		}
	}

	return (
		<>
			<p className="mt-[36px] justify-self-center">
				스모커들이 남긴 방문 리뷰에요!
			</p>
			<div className="mx-[20px] mb-[28px] mt-[6px] flex items-center justify-evenly gap-[10px]">
				<div className="flex flex-col items-center gap-[4px]">
					<Star className="h-6 w-6 fill-[#FFDD00] text-[#FFDD00]" />
					<p className="text-[16px] font-bold text-[#252525]">{avg}</p>
					<p className="font-regular rounded-full bg-[#D9D9D9] px-[8px] text-[8px] text-[#252525]">
						{count}개 리뷰 별점 평균
					</p>
				</div>
				<div>
					{stars.map((ratingCount, index) => (
						<div
							key={index}
							className="flex items-center justify-start gap-[8px]"
						>
							<p className="w-[10px] text-center">{5 - index}</p>
							<div className="h-[4px] w-[52vw]">
								<div
									className={"h-full rounded-full bg-[#FFDD00]"}
									style={{
										width: `${(ratingCount / maxCount) * 100}%`,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
