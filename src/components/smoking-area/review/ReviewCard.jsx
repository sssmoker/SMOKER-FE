import React from "react"
import { Star } from "lucide-react"

import DummyPng from "@/assets/dummy/sample-list.png"

export default function ReviewCard({ user_id, rating, body, created_at }) {
	return (
		<>
			<div className="flex items-center justify-between border-t px-[20px] py-[16px]">
				<div>
					<div className="flex items-center gap-[6px]">
						<img
							src={DummyPng}
							alt="profile"
							className="h-[16px] w-[16px] rounded-full object-cover object-center"
						/>
						<p className="text-[12px] font-semibold text-[#252525]">
							{user_id}
						</p>
						<span className="font-regular text-[8px] text-[#b5b5b5]">
							후기 1 ꞏ {created_at}
						</span>
					</div>
					<ul className="font-regular mt-[6px] flex text-[10px]">
						{Array.from({ length: rating }, (_, index) => (
							<Star
								key={index}
								className="h-3 w-3 fill-[#FFDD00] text-[#FFDD00]"
							/>
						))}
					</ul>
					<p className="font-regular mt-[2px] text-[10px] text-[#252525]">
						{body}
					</p>
				</div>

				<img
					src={DummyPng}
					alt="profile"
					className="h-[48px] w-[48px] rounded-[5px] object-cover object-center"
				/>
			</div>
		</>
	)
}
