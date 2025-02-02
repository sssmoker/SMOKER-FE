import React from "react"
import SmokingAreaCard from "./SmokingAreaCard"

export default function SmokingAreaList({ smokingAreas = [] }) {
	return (
		<>
			{smokingAreas.length ? (
				smokingAreas.map((data) => (
					<SmokingAreaCard key={data.smoking_id} {...data} />
				))
			) : (
				<div className="mt-[10vh] flex flex-col items-center">
					<p className="text-[15px] font-bold text-[#555]">
						근처에 흡연 구역이 없습니다.
					</p>
				</div>
			)}
		</>
	)
}
