import React from "react"
import { Camera, Plus } from "lucide-react"

export default function ProfileSection({ memberInfo, navigate }) {
	const [profileImage, setProfileImage] = React.useState(null)

	console.log("🔍 현재 memberInfo:", memberInfo) // ✅ 데이터 확인 로그

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
						<Camera className="h-6 w-6 text-gray-500" />
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

			{/* ✅ memberInfo에서 member_name 가져오기 */}
			<div className="mt-2 flex flex-row items-center">
				<div className="text-center text-lg font-bold">
					{memberInfo ? memberInfo.member_name : "이름을 입력하시오"}
				</div>
				<div className="ml-2">
					<span
						className="cursor-pointer text-xs text-gray-500 underline hover:text-gray-700"
						onClick={() => navigate("/my-page/info/edit-name")}
					>
						수정
					</span>
				</div>
			</div>
		</div>
	)
}
