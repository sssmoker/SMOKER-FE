import React, { useState } from "react"
import SmokingAreaCard from "./SmokingAreaCard"

export default function SmokingAreaList() {
	// dummy data list
	const [dataList, setDataList] = useState([
		{
			title: "사당역 1번 출구 앞 흡연 부스",
			isBookmarked: true,
			rating: 4.3,
			ratingCount: 3,
			bookmarkCount: 30,
			distance: "197m",
		},
		{
			title: "사당역 2번 출구 앞 흡연 부스",
			isBookmarked: false,
			rating: 4.3,
			ratingCount: 3,
			bookmarkCount: 30,
			distance: "197m",
		},
		{
			title: "사당역 3번 출구 앞 흡연 부스",
			isBookmarked: false,
			rating: 4.3,
			ratingCount: 3,
			bookmarkCount: 30,
			distance: "197m",
		},
		{
			title: "사당역 4번 출구 앞 흡연 부스",
			isBookmarked: false,
			rating: 4.3,
			ratingCount: 3,
			bookmarkCount: 30,
			distance: "197m",
		},
		{
			title: "사당역 4번 출구 앞 흡연 부스",
			isBookmarked: false,
			rating: 4.3,
			ratingCount: 3,
			bookmarkCount: 30,
			distance: "197m",
		},
		{
			title: "사당역 4번 출구 앞 흡연 부스",
			isBookmarked: false,
			rating: 4.3,
			ratingCount: 3,
			bookmarkCount: 30,
			distance: "197m",
		},
		{
			title: "사당역 4번 출구 앞 흡연 부스",
			isBookmarked: false,
			rating: 4.3,
			ratingCount: 3,
			bookmarkCount: 30,
			distance: "197m",
		},
	])

	return (
		<>
			{dataList.map((data, i) => (
				<SmokingAreaCard key={i} {...data} />
			))}
		</>
	)
}
