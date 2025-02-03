import React from "react"

export default function SmokingAreaDetailPage({ detailInfoList = [] }) {
	return (
		<>
			<div className="mx-[20px] mt-[16px] flex-wrap justify-center gap-x-[12px] gap-y-[8px]">
				{detailInfoList.map((option) => (
					<div
						key={option}
						className={`mx-[6px] my-[4px] inline-block rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 shadow-[0px_2px_2px_0px_rgba(69,23,255,0.20)] transition-all`}
					>
						{option}
					</div>
				))}
			</div>

			<p className="mx-[20px] mt-[28px] text-[16px] font-bold text-[#252525]">
				흡연 부스 위치
			</p>
		</>
	)
}
