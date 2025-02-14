import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"

export default function NoticeDetailPage() {
	const { noticeId } = useParams()
	const [notice, setNotice] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNoticeDetail = async () => {
			try {
				const response = await fetch("http://localhost:3001/notices")
				if (!response.ok) throw new Error("공지사항 목록을 불러올 수 없습니다.")
				const data = await response.json()

				const foundNotice = data.find(
					(item) => item.noticeId === Number(noticeId),
				)

				if (!foundNotice) throw new Error("공지사항을 찾을 수 없습니다.")

				setNotice(foundNotice)
			} catch (error) {
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchNoticeDetail()
	}, [noticeId])

	if (isLoading)
		return (
			<p className="p-6 text-center text-gray-500">공지사항을 불러오는 중...</p>
		)
	if (error) return <p className="p-6 text-center text-red-500">{error}</p>
	if (!notice)
		return <p className="p-6 text-center text-gray-500">공지사항이 없습니다.</p>
	/* 백엔드 연결시
	const { noticeId } = useParams();
	const { data, error, isLoading } = useNoticeDetail(noticeId);

	if (isLoading) return <p className="p-6 text-center text-gray-500">공지사항을 불러오는 중...</p>;
	if (error) return <p className="p-6 text-center text-red-500">공지사항을 불러오지 못했습니다.</p>;
	if (!data || !data.result) return <p className="p-6 text-center text-gray-500">공지사항이 없습니다.</p>;

	const notice = data.result;
		*/

	const formatDate = (dateString) => {
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
			<header className="flex flex-none items-center justify-center bg-white p-4 text-lg font-bold">
				<BackButton className="absolute left-4" />
				<span className="w-full text-center">{notice.title}</span>
			</header>

			<div className="border-b-8 border-gray-200 p-4">
				<h3 className="text-md font-semibold">{notice.title}</h3>
				<p className="mt-1 text-xs text-gray-400">
					{formatDate(notice.updatedAt)}
				</p>
			</div>

			<div className="flex-grow bg-white p-4">
				<p className="whitespace-pre-wrap text-sm text-gray-800">
					{notice.content}
				</p>
			</div>
		</div>
	)
}
