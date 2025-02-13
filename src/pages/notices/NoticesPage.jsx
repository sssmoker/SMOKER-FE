import React from "react"
import { useNavigate } from "react-router-dom"
import { useNotices } from "@/utils/queries" // React Query 훅 가져오기
import BackButton from "@/components/common/button/BackButton"

export default function NoticesPage() {
	const navigate = useNavigate()
	const { data, isLoading, isError } = useNotices() // API 요청

	if (isLoading)
		return <p className="p-6 text-center text-gray-500">로딩 중...</p>
	if (isError)
		return (
			<p className="p-6 text-center text-red-500">
				공지사항을 불러올 수 없습니다.
			</p>
		)

	const notices = data?.result?.notices || [] // API 응답 구조 반영

	return (
		<div className="relative flex h-full flex-col overflow-auto bg-white pb-20">
			<header className="flex flex-none items-center border-b border-gray-300 bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>공지 사항</span>
			</header>

			<div className="flex-grow">
				<ul className="divide-y bg-white">
					{notices.length > 0 ? (
						notices.map((notice) => (
							<li
								key={notice.noticeId}
								className="flex cursor-pointer flex-col justify-center px-4 py-4"
								onClick={() => navigate(`/notices/details/${notice.noticeId}`)}
							>
								<h3 className="text-md font-semibold">{notice.title}</h3>
								<p className="mt-1 text-xs text-gray-400">{notice.updatedAt}</p>
							</li>
						))
					) : (
						<p className="p-6 text-center text-gray-500">
							등록된 공지사항이 없습니다.
						</p>
					)}
				</ul>
			</div>
		</div>
	)
}
