import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PropTypes from "prop-types"

export default function Toast({
	isVisible,
	message,
	subMessage,
	icon,
	duration = 3000,
	onClose,
	children,
}) {
	useEffect(() => {
		if (isVisible && duration) {
			const timer = setTimeout(() => {
				onClose()
			}, duration)
			return () => clearTimeout(timer)
		}
	}, [isVisible, duration, onClose])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="fixed left-1/2 top-1/2 z-[999] h-[200px] w-[320px] -translate-x-1/2 -translate-y-1/2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<div className="pointer-events-none flex w-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-lg">
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full">
							{typeof icon === "string" ? (
								<img
									src={icon}
									alt="icon"
									className="h-[50px] w-[50px] object-contain"
								/>
							) : (
								icon
							)}
						</div>
						<h2 className="mb-2 text-2xl font-bold">{message}</h2>
						{subMessage && (
							<p className="text-base text-gray-600">{subMessage}</p>
						)}
						{children && <div className="mt-4 w-full">{children}</div>}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

Toast.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	message: PropTypes.node.isRequired,
	subMessage: PropTypes.node,
	icon: PropTypes.node,
	duration: PropTypes.number,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node,
}
