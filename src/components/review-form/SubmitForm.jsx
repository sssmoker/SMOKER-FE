import React, { useState } from "react"
import PropTypes from "prop-types"

export default function SubmitForm({ onSubmit }) {
	const [review, setReview] = useState("")
	const [images, setImages] = useState([])

	const handleImageUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			const newImage = URL.createObjectURL(file)
			setImages((prevImages) => [...prevImages, newImage])
		}
	}

	const handleReviewChange = (e) => {
		setReview(e.target.value)
	}

	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit({ images, review })
		}
	}

	return (
		<div className="w-full">
			<div className="mb-4 flex flex-wrap items-center gap-4">
				{images.map((image, index) => (
					<div
						key={index}
						className="relative h-24 w-24 rounded-lg border border-gray-300 bg-gray-100"
					>
						<img
							src={image}
							alt={`Uploaded ${index}`}
							className="h-full w-full rounded-lg object-cover"
						/>
					</div>
				))}

				<label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-100 text-gray-400">
					+
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="hidden"
					/>
				</label>
			</div>
			<textarea
				value={review}
				onChange={handleReviewChange}
				placeholder="다른 스모커에게 도움이 되는 후기를 남겨주세요."
				className="mb-4 h-32 w-full resize-none rounded-lg border border-gray-300 p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				onClick={handleSubmit}
				className="w-full rounded-lg bg-[#6200EE] py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#4500b5]"
			>
				등록하기
			</button>
		</div>
	)
}
SubmitForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
