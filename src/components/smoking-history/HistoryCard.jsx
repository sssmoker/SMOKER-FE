import React from "react"

export default function HistoryCard({ memberName, updateCount, updatedAt }) {
	return (
		<>
			<li className="px-[30px] py-[20px]">
				<div className="flex-start flex items-center gap-[4px]">
					<p className="text-[13px] font-semibold text-[#252525]">
						{memberName}
					</p>
					<span className="font-regular text-[8px] text-[#B5B5B5]">
						업데이트 참여 수 {updateCount} ꞏ {updatedAt.slice(0, 10)}
					</span>
				</div>
				<p className="font-regular mt-[4px] text-[11px] text-[#252525]">
					장소 정보를 수정했어요.
				</p>
			</li>
		</>
	)
}
