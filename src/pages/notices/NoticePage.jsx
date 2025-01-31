import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"

export default function NoticePage() {
	const navigate = useNavigate()
	const [notices, setNotices] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const noticesPerPage = 7 // 한 페이지당 공지 개수
	const [totalPages, setTotalPages] = useState(1)

	console.log("Rendering pagination with totalPages:", totalPages)

	useEffect(() => {
		const fetchNotices = async () => {
			try {
				// 전체 공지 개수 가져오기 엔드 포인트 : api/member/notices?page=1
				const totalResponse = await fetch("http://localhost:3001/notices")
				const totalData = await totalResponse.json()
				const calculatedTotalPages = Math.ceil(
					totalData.length / noticesPerPage,
				)
				setTotalPages(calculatedTotalPages) // 총 페이지 수 설정

				// 현재 페이지 데이터 가져오기
				const response = await fetch(
					`http://localhost:3001/notices?_page=${currentPage}&_limit=${noticesPerPage}`,
				)
				const data = await response.json()
				setNotices(data)
			} catch (error) {
				console.error("Failed to fetch notices:", error)
			}
		}

		fetchNotices()
	}, [currentPage]) // currentPage 변경 시마다 호출

	// 페이지 변경 핸들러
	const handlePageChange = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber)
		}
	}

	return (
		<div className="flex h-screen flex-col bg-white">
			{/* 헤더 */}
			<header className="flex flex-none items-center border-b border-gray-300 p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>공지 사항</span>
			</header>

			{/* 공지사항 리스트 */}
			<div className="flex-grow">
				<ul className="grid h-full grid-rows-7 divide-y">
					{notices.length > 0 ? (
						notices.map((notice) => (
							<li
								key={notice.id}
								className="flex cursor-pointer flex-col justify-center px-4 py-4"
								onClick={() => navigate(`/notices/${notice.id}`)}
							>
								<h3 className="text-md font-semibold">{notice.title}</h3>
								<p className="mt-1 text-sm text-gray-500">
									{new Date(notice.created_at).toLocaleDateString("ko-KR")}
								</p>
							</li>
						))
					) : (
						<p className="p-6 text-center text-gray-500">
							등록된 공지사항이 없습니다.
						</p>
					)}
				</ul>
			</div>

			{/* 페이지네이션 - ui에 안뜸 수정 예정*/}
			{totalPages > 1 && (
				<div className="flex flex-none items-center justify-center space-x-4 border-t bg-white p-4">
					{/* 이전 버튼 */}
					<button
						className={`rounded px-3 py-1 ${
							currentPage === 1
								? "cursor-not-allowed text-gray-300"
								: "text-gray-700"
						}`}
						disabled={currentPage === 1}
						onClick={() => handlePageChange(currentPage - 1)}
					>
						&lt;
					</button>

					{/* 페이지 번호 */}
					<div className="flex space-x-2">
						{Array.from({ length: totalPages }, (_, index) => {
							console.log("Rendering page button:", index + 1) // ✅ 페이지 버튼 렌더링 확인
							return (
								<button
									key={index + 1}
									className={`rounded px-3 py-1 ${
										index + 1 === currentPage
											? "bg-blue-500 font-bold text-white"
											: "border border-gray-300 text-gray-700"
									}`}
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</button>
							)
						})}
					</div>

					{/* 다음 버튼 */}
					<button
						className={`rounded px-3 py-1 ${
							currentPage === totalPages
								? "cursor-not-allowed text-gray-300"
								: "text-gray-700"
						}`}
						disabled={currentPage === totalPages}
						onClick={() => handlePageChange(currentPage + 1)}
					>
						&gt;
					</button>
				</div>
			)}
		</div>
	)
}
