import React from "react"
import PropTypes from "prop-types"
import { Plus } from "lucide-react"

export default function ImageUploader({ images, setImages }) {
	const handleImageUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			const newImage = URL.createObjectURL(file)
			setImages((prevImages) => [...prevImages, newImage])
		}
	}

	return (
		<div className="mb-4 flex flex-wrap items-center gap-4">
			{images.map((image, index) => (
				<div
					key={index}
					className="relative h-24 w-24 rounded-lg border border-gray-300 bg-white"
				>
					<img
						src={image}
						alt={`Uploaded ${index}`}
						className="h-full w-full rounded-lg object-cover"
					/>
				</div>
			))}
			<label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-400">
				<Plus />
				<input
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="hidden"
				/>
			</label>
		</div>
	)
}

ImageUploader.propTypes = {
	images: PropTypes.array.isRequired,
	setImages: PropTypes.func.isRequired,
}
