import React from "react"
import ModalOverlay from "./ModalOverlay"

export default function BaseModal({ isVisible, onClose, children }) {
	if (!isVisible) return null

	return (
		<>
			{/* Overlay */}
			<ModalOverlay isVisible={isVisible} onClick={onClose} />
			{/* 모달 내용 */}
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div className="relative w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
					{children}
				</div>
			</div>
		</>
	)
}
