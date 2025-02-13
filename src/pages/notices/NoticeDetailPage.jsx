import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useNoticeDetail } from "@/utils/queries"
import BackButton from "@/components/common/button/BackButton"

export default function NoticeDetailPage() {
	const navigate = useNavigate()
	const { noticeId } = useParams()
	const { data, isLoading, isError } = useNoticeDetail(noticeId)

	if (isLoading)
		return <p className="p-6 text-center text-gray-500">로딩 중...</p>
	if (isError)
		return (
			<p className="p-6 text-center text-red-500">
				공지사항을 찾을 수 없습니다.
			</p>
		)

	const notice = data?.result

	return (
		<div className="relative flex h-full flex-col overflow-auto bg-white pb-20">
			<header className="flex flex-none items-center border-b border-gray-300 bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>{notice.title}</span>
			</header>

			<div className="p-4">
				<p className="text-xs text-gray-400">{notice.updatedAt}</p>
				<hr className="my-2 border-gray-300" />
				<p className="whitespace-pre-wrap text-sm text-gray-800">
					{notice.content}
				</p>
			</div>
		</div>
	)
}
