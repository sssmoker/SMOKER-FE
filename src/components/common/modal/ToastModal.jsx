import React from "react"
import BaseModal from "./BaseModal"

export default function ToastModal({
	isVisible,
	onClose,
	title,
	message,
	icon = "✅", // 기본 아이콘
}) {
	return (
		<BaseModal isVisible={isVisible} onClose={onClose}>
			<div className="flex flex-col items-center text-center">
				{/* 아이콘 */}
				<div className="mb-2 text-4xl text-purple-600">{icon}</div>
				{/* 제목 */}
				<p className="text-lg font-bold">{title}</p>
				{/* 메시지 */}
				<p className="mt-2 text-sm text-gray-600">{message}</p>
			</div>
		</BaseModal>
	)
}
