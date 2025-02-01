import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import LongButton from "@/components/common/button/LongButton"

// 이름 수정 저장, 기존 닉네임 불러오기 기능 다시 구현 예정
export default function EditNamePage() {
	const navigate = useNavigate()
	const [nickname, setNickname] = useState("")
	const [originalNickname, setOriginalNickname] = useState("") // 원래 닉네임 저장
	const [isLoading, setIsLoading] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false) // 수정 완료 상태 체크

	useEffect(() => {
		// 기존 닉네임 불러오기
		const fetchNickname = async () => {
			try {
				const response = await fetch("http://localhost:3001/member")
				const data = await response.json()
				setNickname(data.user_name)
				setOriginalNickname(data.user_name) // 원래 닉네임 저장
			} catch (error) {
				console.error("Failed to fetch nickname:", error)
			}
		}
		fetchNickname()
	}, [])

	const handleUpdateNickname = async () => {
		if (!nickname.trim() || nickname === originalNickname) return

		setIsLoading(true)
		try {
			await fetch("http://localhost:3001/member", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ user_name: nickname }),
			})

			setOriginalNickname(nickname) // 원래 닉네임 업데이트
			setIsUpdated(true) // 수정 완료 상태 변경

			// 2초 후 다시 원래 상태로 변경
			setTimeout(() => {
				setIsUpdated(false)
			}, 2000)
		} catch (error) {
			console.error("Failed to update nickname:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex h-screen flex-col bg-gray-100">
			<header className="flex items-center p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>이름 수정</span>
			</header>

			<div className="mx-auto mt-10 w-full max-w-sm px-6">
				{" "}
				<label className="block text-sm font-bold">이름</label>
				<input
					type="text"
					className="mt-1 w-full rounded-lg border p-2"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleUpdateNickname()}
				/>
				<LongButton
					className={`mt-6 w-full ${
						isUpdated
							? "bg-[#828282] text-white"
							: "bg-[#4517FF] hover:bg-indigo-700"
					}`}
					onClick={handleUpdateNickname}
					disabled={isLoading || isUpdated}
				>
					{isUpdated ? "수정 완료" : "수정"}
				</LongButton>
			</div>
		</div>
	)
}
