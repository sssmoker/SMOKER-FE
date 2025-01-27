import React from "react"

export default function ModalOverlay({ isVisible, onClick }) {
	if (!isVisible) return null

	return (
		<div
			className="fixed inset-0 z-40 bg-black bg-opacity-50"
			onClick={onClick}
		></div>
	)
}
