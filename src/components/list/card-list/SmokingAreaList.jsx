import React from "react"
import SmokingAreaCard from "./SmokingAreaCard"
import smokingAreaListDummy from "@/data/smokingAreaListDummy"

export default function SmokingAreaList() {
	return (
		<>
			{smokingAreaListDummy.map((data, i) => (
				<SmokingAreaCard key={i} {...data} />
			))}
		</>
	)
}
