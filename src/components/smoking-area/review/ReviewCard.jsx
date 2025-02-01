import React from "react"

import DummyPng from "@/assets/dummy/SM_01_img1.png" // imageUrl

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
							후기 1 {created_at}
						</span>
					</div>
					<div className="font-regular text-[10px]">
						{Array.from({ length: rating }, (_, index) => (
							<span key={index} className="mx-[-1px]">
								⭐
							</span>
						))}
					</div>
					<p className="font-regular text-[10px] text-[#252525]">{body}</p>
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
