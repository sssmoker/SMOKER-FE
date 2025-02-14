import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"

export default function NoticesPage() {
	const navigate = useNavigate()
	const [notices, setNotices] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const noticesPerPage = 7

	useEffect(() => {
		const fetchNotices = async () => {
			try {
				const response = await fetch(`http://localhost:3001/notices`)
				const data = await response.json()

				if (data) {
					const totalDataCount = data.length
					const calculatedTotalPages = Math.ceil(
						totalDataCount / noticesPerPage,
					)

					setTotalPages(calculatedTotalPages)

					const startIndex = (currentPage - 1) * noticesPerPage
					const endIndex = startIndex + noticesPerPage
					setNotices(data.slice(startIndex, endIndex))
				}
			} catch (error) {
				console.error("Failed to fetch notices:", error)
			}
		}

		fetchNotices()
	}, [currentPage])
	/* 
	// 백엔드 API 적용
	useEffect(() => {
    const fetchNotices = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/member/notices?page=${currentPage}&size=7`
            );
            const data = await response.json()

            if (data?.result?.notices) {
                setNotices(data.result.notices)
                setTotalPages(data.result.totalPage)
                setIsFirst(data.result.isFirst)
                setIsLast(data.result.isLast)
            }
        } catch (error) {
            console.error("Failed to fetch notices:", error)
        }
    };

    fetchNotices();
}, [currentPage]);
	*/

	const formatDateTime = (dateString) => {
		const date = new Date(dateString)
		return date.toLocaleString("ko-KR", {
			year: "2-digit",
			month: "2-digit",
			day: "2-digit",
			hourCycle: "h23",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	return (
		<div className="relative flex min-h-screen flex-col bg-white">
			<header className="flex flex-none items-center border-b border-gray-300 bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>공지 사항</span>
			</header>

			<div className="flex flex-grow flex-col">
				<ul className="border-b border-gray-300 bg-white">
					{notices.map((notice, index) => (
						<li
							key={notice.noticeId}
							className={`flex cursor-pointer flex-col justify-center px-4 py-2 ${index === 0 ? "border-t-0" : "border-t border-gray-300"}`}
							onClick={() => navigate(`../notices/detail/${notice.noticeId}`)}
						>
							<h3 className="text-md font-semibold">{notice.title}</h3>
							<p className="mt-1 text-xs text-gray-400">
								{formatDateTime(notice.updatedAt)}
							</p>
						</li>
					))}
				</ul>

				{totalPages > 1 && (
					<div className="flex items-center justify-center bg-white py-3 text-sm">
						<span
							className={`cursor-pointer px-2 ${currentPage === 1 ? "text-gray-400" : "hover:text-bold"}`}
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						>
							{"<"}
						</span>

						{[...Array(totalPages)].map((_, i) => (
							<span
								key={i}
								className={`cursor-pointer px-2 ${currentPage === i + 1 ? "font-bold" : "hover:text-bold"}`}
								onClick={() => setCurrentPage(i + 1)}
							>
								{i + 1}
							</span>
						))}

						<span
							className={`cursor-pointer px-2 ${currentPage === totalPages ? "text-gray-400" : "hover:text-bold"}`}
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
						>
							{">"}
						</span>
					</div>
				)}
			</div>
		</div>
	)
}
