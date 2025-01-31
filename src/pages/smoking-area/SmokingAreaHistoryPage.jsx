import HistoryCard from "@/components/smoking-history/HistoryCard"
import React from "react"

export default function SmokingAreaHistoryPage() {
	return (
		<>
			<div>
				<ul className="flex flex-col divide-y">
					<HistoryCard />
				</ul>
			</div>
		</>
	)
}
