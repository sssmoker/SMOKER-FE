import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import LongButton from "@/components/common/button/LongButton"

export default function EditNamePage() {
	const navigate = useNavigate()
	const [nickname, setNickname] = useState("")
	const [originalNickname, setOriginalNickname] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	// 🟢 memberId=1의 닉네임 가져오기
	useEffect(() => {
		const fetchMemberInfo = async () => {
			try {
				const response = await fetch("http://localhost:3001/members/1") // memberId=1 고정
				const data = await response.json()

				setNickname(data.nickName)
				setOriginalNickname(data.nickName)
			} catch (error) {
				console.error("[EditNamePage] 회원 정보 불러오기 실패:", error)
			}
		}

		fetchMemberInfo()
	}, [])

	// 닉네임 수정 함수
	const handleUpdateNickname = async () => {
		if (!nickname.trim() || nickname === originalNickname) return

		setIsLoading(true)
		try {
			const url = "http://localhost:3001/members/1" // memberId=1 고정
			const response = await fetch(url, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nickName: nickname }),
			})

			if (!response.ok) {
				throw new Error(`닉네임 변경 실패 (status: ${response.status})`)
			}

			const updatedMember = { memberId: 1, nickName: nickname }
			sessionStorage.setItem("member", JSON.stringify(updatedMember))

			setOriginalNickname(nickname)
			setIsUpdated(true)

			setTimeout(() => setIsUpdated(false), 2000)
		} catch (error) {
			console.error("닉네임 변경 오류:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex h-screen flex-col bg-white">
			<header className="flex items-center p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>이름 수정</span>
			</header>

			<div className="mx-auto mt-10 w-full max-w-sm px-6">
				<label className="block text-sm font-bold">이름</label>
				<input
					type="text"
					className="mt-1 w-full rounded-lg border p-2"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					onFocus={() => {
						if (!isEditing) {
							setNickname("")
							setIsEditing(true)
						}
					}}
					onBlur={() => {
						if (!nickname.trim()) {
							setNickname(originalNickname)
							setIsEditing(false)
						}
					}}
					onKeyDown={(e) => e.key === "Enter" && handleUpdateNickname()}
				/>
				<LongButton
					className={`mt-6 w-full ${
						isUpdated
							? "cursor-default bg-[#828282] text-white"
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
