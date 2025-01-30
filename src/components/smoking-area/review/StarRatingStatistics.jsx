import React from "react"
import { Star } from "lucide-react"

export default function StarRatingStatistics() {
	const dummyStarRating = [28, 12, 3, 1, 0] // api로 수정 예정
	let maxCount = dummyStarRating[0] // 그래프 스타일용
	for (let index = 0; index < dummyStarRating.length - 1; index++) {
		if (maxCount < dummyStarRating[index + 1]) {
			maxCount = dummyStarRating[index + 1]
		}
	}

	return (
		<>
			<p className="mt-[36px] justify-self-center">
				스모커들이 남긴 방문 리뷰에요!
			</p>
			<div className="mx-[20px] mb-[28px] mt-[6px] flex items-center justify-evenly gap-[10px]">
				<div className="flex flex-col items-center gap-[6px]">
					<p className="font-regular rounded-full bg-[#D9D9D9] px-[8px] text-[8px] text-[#252525]">
						20개 리뷰 별점 평균
					</p>
					<Star className="h-5 w-5 fill-[#FFDD00] text-[#FFDD00]" />
					<p className="text-[16px] font-bold text-[#252525]">4.3</p>
				</div>
				<div>
					{dummyStarRating.map((ratingCount, index) => (
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
