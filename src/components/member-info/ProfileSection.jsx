import React, { useState, useEffect } from "react"
import { Camera, Plus } from "lucide-react"

export default function ProfileSection({ navigate }) {
	const [memberInfo, setMemberInfo] = useState(null)
	const [profileImage, setProfileImage] = useState(null)

	useEffect(() => {
		const fetchMemberInfo = async () => {
			try {
				const response = await fetch("http://localhost:3001/members/1") // memberId 1번 데이터 가져오기
				const data = await response.json()
				setMemberInfo(data)
				setProfileImage(data.profileImageUrl) // 기본 UI 유지 (null 허용)
			} catch (error) {
				console.error("회원 정보 불러오기 실패:", error)
			}
		}
		fetchMemberInfo()
	}, [])

	// 이미지 업로드 처리
	const handleImageUpload = (event) => {
		const file = event.target.files[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setProfileImage(imageUrl)
		}
	}

	return (
		<div className="flex flex-col items-center bg-white py-6">
			<div className="relative flex flex-col items-center">
				<div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
					{profileImage ? (
						<img
							src={profileImage}
							alt="Profile"
							className="h-full w-full object-cover"
						/>
					) : (
						<Camera className="h-6 w-6 text-gray-500" /> // 기본 UI 유지
					)}
				</div>

				<label
					htmlFor="file-upload"
					className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white bg-gray-200"
				>
					<Plus className="h-4 w-4" />
				</label>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleImageUpload}
				/>
			</div>

			<div className="mt-2 flex flex-row items-center">
				<div className="text-center text-lg font-bold">
					{memberInfo ? memberInfo.nickName : "이름을 입력해주세요"}
				</div>
				{memberInfo && (
					<div className="ml-2">
						<span
							className="cursor-pointer text-xs text-gray-500 underline hover:text-gray-700"
							onClick={() => navigate(`/my-page/${memberInfo.memberId}/name`)}
						>
							수정
						</span>
					</div>
				)}
			</div>
		</div>
	)
}
