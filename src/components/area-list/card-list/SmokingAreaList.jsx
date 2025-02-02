import React from "react"
import SmokingAreaCard from "./SmokingAreaCard"

export default function SmokingAreaList({ smokingAreas = [] }) {
	return (
		<>
			{/* key값 id로 수정하자 */}
			{smokingAreas.map((data, i) => (
				<SmokingAreaCard key={i} {...data} />
			))}
		</>
	)
}
