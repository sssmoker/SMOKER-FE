import React, { useState } from "react"
import { Bookmark } from "lucide-react"
import { Share2 } from "lucide-react"
import BackButton from "@/components/common/button/BackButton"
import IconButton from "@/components/smoking-area/upper-info/IconButton"

export default function Topbar() {
	const [bookmarked, setBookmarked] = useState(false)

	const handleBookmarkButton = () => {
		setBookmarked(!bookmarked)
	}

	return (
		<>
			<div className="relative z-[2] mx-[20px] flex justify-between pt-[16px]">
				<BackButton className={`rounded-full bg-white`} />

				<div className="flex gap-[12px]">
					<IconButton
						LucideIcon={Bookmark}
						handleClickButton={handleBookmarkButton}
						className={bookmarked ? "fill-[#252525]" : "fill-none"}
					/>
					<IconButton LucideIcon={Share2} />
				</div>
			</div>
		</>
	)
}
