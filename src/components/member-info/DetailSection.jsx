import React, { useState, useEffect, useRef } from "react"

export default function DetailSection({ memberInfo }) {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5
	const containerRef = useRef(null)
	const [containerHeight, setContainerHeight] = useState("auto")

	useEffect(() => {
		if (containerRef.current) {
			// 화면 높이에 맞춰 조정 (네비바 고려)
			const screenHeight = window.innerHeight
			setContainerHeight(`${screenHeight - 180}px`) // 적절한 여백 설정
		}
	}, [])

	if (!memberInfo || !memberInfo.details) {
		return (
			<p className="mt-4 text-center text-gray-500">
				상세 정보를 불러오는 중...
			</p>
		)
	}

	const details = [...memberInfo.details].sort(
		(a, b) => new Date(b.date) - new Date(a.date),
	)

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date
			.toLocaleDateString("ko-KR", {
				year: "2-digit",
				month: "2-digit",
				day: "2-digit",
			})
			.replace(/\./g, ".")
	}

	const totalPages = Math.ceil(details.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const paginatedDetails = details.slice(startIndex, startIndex + itemsPerPage)

	return (
		<div
			className="relative flex h-full flex-col overflow-auto bg-white pb-20"
			ref={containerRef}
		>
			{/* 🔹 리스트 영역 (배경 흰색, 스크롤 가능) */}
			<div
				className="flex-grow bg-white px-1"
				style={{ maxHeight: containerHeight }}
			>
				<ul className="w-full border-b border-gray-300 bg-white">
					{paginatedDetails.map((detail, index) => (
						<li
							key={index}
							className="w-full border-t border-gray-300 bg-white px-4 py-2"
						>
							<h3 className="text-sm font-semibold text-gray-800">
								{detail.location}
							</h3>
							<p className="text-xs text-gray-500">{formatDate(detail.date)}</p>
							<p className="text-sm text-gray-600">{detail.description}</p>
						</li>
					))}
				</ul>
			</div>

			{totalPages > 1 && (
				<div className="bottom-0 left-0 right-0 flex items-center justify-center space-x-4 border-gray-300 bg-white py-3 text-sm">
					<span
						className={`cursor-pointer ${
							currentPage === 1 ? "text-gray-400" : "hover:text-blue-500"
						}`}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					>
						{"<"}
					</span>

					{[...Array(totalPages)].map((_, i) => (
						<span
							key={i}
							className={`cursor-pointer px-2 ${
								currentPage === i + 1 ? "font-bold" : "hover:text-blue-500"
							}`}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</span>
					))}

					<span
						className={`cursor-pointer ${
							currentPage === totalPages
								? "text-gray-400"
								: "hover:text-blue-500"
						}`}
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
					>
						{">"}
					</span>
				</div>
			)}
		</div>
	)
}
