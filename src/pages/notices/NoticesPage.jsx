import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"

export default function NoticesPage() {
	const navigate = useNavigate()
	const [notices, setNotices] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [isFirst, setIsFirst] = useState(true)
	const [isLast, setIsLast] = useState(false)
	const containerRef = useRef(null)

	useEffect(() => {
		const fetchNotices = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/notices?_page=${currentPage}&_limit=5`,
				)
				const data = await response.json()

				if (data) {
					setNotices(data) // json-server는 배열을 반환하므로 그대로 설정
					setTotalPages(2) // json-server에서는 자동 페이지네이션 기능이 없으므로, 수동 설정 필요
					setIsFirst(currentPage === 1)
					setIsLast(currentPage === totalPages)
				}
			} catch (error) {
				console.error("Failed to fetch notices:", error)
			}
		}

		fetchNotices()
	}, [currentPage])

	/* 
	//백백엔드 API 적용
	useEffect(() => {
    const fetchNotices = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/member/notices?page=${currentPage}&size=5`
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
		<div className="relative flex h-screen flex-col bg-white">
			<header className="flex flex-none items-center border-b border-gray-300 bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>공지 사항</span>
			</header>

			<div ref={containerRef} className="flex-grow overflow-auto">
				<ul className="border-b border-gray-300 bg-white">
					{notices.map((notice, index) => (
						<li
							key={notice.noticeId}
							className={`flex cursor-pointer flex-col justify-center px-4 py-4 ${
								index === 0 ? "border-t-0" : "border-t border-gray-300"
							}`}
							onClick={() => navigate(`../notices/detail/${notice.noticeId}`)}
						>
							<h3 className="text-md font-semibold">{notice.title}</h3>
							<p className="mt-1 text-xs text-gray-400">
								{formatDateTime(notice.updatedAt)}
							</p>
						</li>
					))}
				</ul>
			</div>

			<div className="flex flex-none items-center justify-center border-t border-gray-300 bg-white py-3 text-sm">
				<span
					className={`cursor-pointer px-2 ${isFirst ? "text-gray-400" : "hover:text-blue-500"}`}
					onClick={() =>
						!isFirst && setCurrentPage((prev) => Math.max(prev - 1, 1))
					}
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
					className={`cursor-pointer px-2 ${isLast ? "text-gray-400" : "hover:text-blue-500"}`}
					onClick={() =>
						!isLast && setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
				>
					{">"}
				</span>
			</div>
		</div>
	)
}
