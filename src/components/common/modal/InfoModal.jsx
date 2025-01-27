import React from "react"
import BaseModal from "./BaseModal"
import Button from "../button/ComButton"

export default function InfoModal({
	isVisible,
	onClose,
	title,
	message,
	onConfirm,
	confirmText = "확인", // 확인 버튼의 텍스트
}) {
	return (
		<BaseModal isVisible={isVisible} onClose={onClose}>
			<div className="flex flex-col items-center text-center">
				{/* 제목 */}
				<p className="mb-4 text-xl font-bold text-purple-600">{title}</p>
				{/* 메시지 */}
				<p className="mb-6 text-sm text-gray-600">{message}</p>
				{/* 확인 버튼 */}
				<Button size="m" color="purple" onClick={onConfirm}>
					{confirmText}
				</Button>
			</div>
		</BaseModal>
	)
}
