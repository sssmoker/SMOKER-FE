import React, { useState } from "react"
import PropTypes from "prop-types"
import ComButton from "@/components/common/button/ComButton"
import RatingStars from "./RatingStar"
import ImageUploader from "./ImageUploader"
import TextAreaInput from "./TextAreaInput"

export default function SubmitForm({ onSubmit }) {
	const [review, setReview] = useState("")
	const [images, setImages] = useState([])
	const [rating, setRating] = useState(0)

	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit({ images, review, rating })
		}
	}

	return (
		<div className="w-full">
			<RatingStars rating={rating} setRating={setRating} />
			<ImageUploader images={images} setImages={setImages} />
			<TextAreaInput
				value={review}
				onChange={(e) => setReview(e.target.value)}
				placeholder="다른 스모커에게 도움이 되는 후기를 남겨주세요."
			/>
			<div className="flex justify-center">
				<ComButton onClick={handleSubmit} size="xl">
					등록하기
				</ComButton>
			</div>
		</div>
	)
}

SubmitForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
