import React, { useState, useEffect, useRef } from "react"

export default function DetailSection() {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5
	const containerRef = useRef(null)
	const [containerHeight, setContainerHeight] = useState("auto")
	const [updates, setUpdates] = useState([])

	useEffect(() => {
		if (containerRef.current) {
			const screenHeight = window.innerHeight
			setContainerHeight(`${screenHeight - 180}px`)
		}
	}, [])

	// 🟢 memberId=1의 업데이트 데이터 가져오기
	useEffect(() => {
		const fetchUpdates = async () => {
			try {
				const response = await fetch("http://localhost:3001/updates?memberId=1") // memberId=1 고정
				const data = await response.json()

				const sortedUpdates = data.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
				)
				setUpdates(sortedUpdates)
			} catch (error) {
				console.error("[DetailSection] 업데이트 정보 불러오기 실패:", error)
			}
		}

		fetchUpdates()
	}, [])

	// 업데이트 내역이 없을 때 표시할 UI
	if (!updates.length) {
		return (
			<p className="mt-4 text-center text-gray-500">
				업데이트 내역이 없습니다.
			</p>
		)
	}

	// 날짜 포맷 함수
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

	// 페이지네이션 계산
	const totalPages = Math.ceil(updates.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const paginatedUpdates = updates.slice(startIndex, startIndex + itemsPerPage)

	return (
		<div
			className="relative flex h-full flex-col overflow-auto bg-white pb-20"
			ref={containerRef}
		>
			<div
				className="flex-grow bg-white px-1"
				style={{ maxHeight: containerHeight }}
			>
				<ul className="w-full border-b border-gray-300 bg-white">
					{paginatedUpdates.map((update) => (
						<li
							key={update.updateHistoryId}
							className="w-full border-t border-gray-300 bg-white px-4 py-2"
						>
							<h3 className="text-sm font-semibold text-gray-800">
								{update.smokingAreaName}
							</h3>
							<p className="text-xs text-gray-500">
								{formatDate(update.createdAt)}
							</p>
							<p className="text-sm text-gray-600">{update.content}</p>
						</li>
					))}
				</ul>
			</div>

			{totalPages > 1 && (
				<div className="bottom-0 left-0 right-0 flex items-center justify-center space-x-4 border-gray-300 bg-white py-3 text-sm">
					<span
						className={`cursor-pointer ${currentPage === 1 ? "text-gray-400" : "hover:text-blue-500"}`}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					>
						{"<"}
					</span>

					{[...Array(totalPages)].map((_, i) => (
						<span
							key={i}
							className={`cursor-pointer px-2 ${currentPage === i + 1 ? "font-bold" : "hover:text-blue-500"}`}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</span>
					))}

					<span
						className={`cursor-pointer ${currentPage === totalPages ? "text-gray-400" : "hover:text-blue-500"}`}
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
