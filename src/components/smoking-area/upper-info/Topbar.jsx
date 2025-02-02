import React, { useEffect, useState } from "react"
import { Bookmark } from "lucide-react"
import { Share2 } from "lucide-react"
import BackButton from "@/components/common/button/BackButton"
import IconButton from "@/components/smoking-area/upper-info/IconButton"

export default function Topbar({ isBookmarked }) {
	const [bookmarked, setBookmarked] = useState(false)

	useEffect(() => {
		if (isBookmarked !== undefined) {
			setBookmarked(isBookmarked)
		}
	}, [isBookmarked])

	const toggleBookmarkButton = () => {
		setBookmarked((prev) => !prev)
	}

	return (
		<div className="relative z-[2] mx-[20px] flex justify-between pt-[16px]">
			<BackButton className={`rounded-full bg-white`} />

			<div className="flex gap-[12px]">
				<IconButton
					LucideIcon={Bookmark}
					handleClickButton={toggleBookmarkButton}
					className={bookmarked ? "fill-[#252525]" : "fill-none"}
				/>
				<IconButton LucideIcon={Share2} />
			</div>
		</div>
	)
}
