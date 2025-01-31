import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"

export default function NoticePage() {
	const navigate = useNavigate()
	const [notices, setNotices] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const noticesPerPage = 7 // 한 페이지당 공지 개수

	useEffect(() => {
		// 공지사항 데이터 가져오기 (예제 API)
		const fetchNotices = async () => {
			try {
				const response = await fetch("http://localhost:3001/notices") // 실제 API 엔드포인트로 변경
				const data = await response.json()
				setNotices(data)
			} catch (error) {
				console.error("Failed to fetch notices:", error)
			}
		}
		fetchNotices()
	}, [])

	// 페이지별 공지사항 데이터 자르기
	const indexOfLastNotice = currentPage * noticesPerPage
	const indexOfFirstNotice = indexOfLastNotice - noticesPerPage
	const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice)

	// 페이지 변경 핸들러
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	return (
		<div className="flex h-screen flex-col bg-white">
			{/* 헤더 */}
			<header className="flex items-center border-b border-gray-300 p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>공지 사항</span>
			</header>

			{/* 공지사항 리스트 */}
			<ul className="flex-1 overflow-y-auto">
				{currentNotices.length > 0 ? (
					currentNotices.map((notice, index) => (
						<li
							key={index}
							className="cursor-pointer border-b px-4 py-4"
							onClick={() => navigate(`/my-page/notice/${notice.id}`)} // 공지 상세 페이지 이동
						>
							<h3 className="text-md font-semibold">{notice.title}</h3>
							<p className="text-sm text-gray-500">{notice.date}</p>
						</li>
					))
				) : (
					<p className="p-6 text-center text-gray-500">
						등록된 공지사항이 없습니다.
					</p>
				)}
			</ul>

			{/* 페이지네이션 */}
			<div className="flex justify-center space-x-4 border-t p-4">
				<button
					className="text-gray-500"
					disabled={currentPage === 1}
					onClick={() => handlePageChange(currentPage - 1)}
				>
					&lt;
				</button>
				{[1, 2, 3].map((page) => (
					<button
						key={page}
						className={`px-2 font-bold ${
							page === currentPage ? "text-black" : "text-gray-500"
						}`}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</button>
				))}
				<button
					className="text-gray-500"
					disabled={currentPage === 3}
					onClick={() => handlePageChange(currentPage + 1)}
				>
					&gt;
				</button>
			</div>
		</div>
	)
}
