import React, { useState } from "react"
import { Bookmark } from "lucide-react"
import { Share2 } from "lucide-react"
import BackButton from "@/components/common/button/BackButton"
import IconButton from "@/components/smoking-area/topbar/IconButton"

export default function SmokingAreaTopbar() {
	const [bookmarked, setBookmarked] = useState(false)

	const handleBookmarkBtn = () => {
		setBookmarked(!bookmarked)
	}

	return (
		<>
			<div className="mx-[20px] flex justify-between pt-[16px]">
				<BackButton className={`rounded-full bg-white`} />

				<div className="flex gap-[12px]">
					<IconButton
						LucideIcon={Bookmark}
						handleClickBtn={handleBookmarkBtn}
						className={bookmarked ? "fill-[#252525]" : "fill-none"}
					/>
					<IconButton LucideIcon={Share2} />
				</div>
			</div>
		</>
	)
}
