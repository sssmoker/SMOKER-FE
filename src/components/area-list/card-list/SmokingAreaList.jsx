import React, { useMemo } from "react"
import SmokingAreaCard from "./SmokingAreaCard"

export default function SmokingAreaList({ selectedFilter, smokingAreas = [] }) {
	const sortedDataList = useMemo(() => {
		return selectedFilter == "거리순"
			? [...smokingAreas].sort((x, y) => x.distance - y.distance)
			: [...smokingAreas].sort((x, y) => y.rating - x.rating)
	}, [selectedFilter, smokingAreas.length])

	return (
		<>
			{smokingAreas.length ? (
				sortedDataList.map((data) => (
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
