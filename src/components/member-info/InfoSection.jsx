import React from "react"

export default function InfoSection({ memberInfo }) {
	if (!memberInfo)
		return (
			<p className="mt-4 text-center text-gray-500">
				상세 정보를 불러오는 중...
			</p>
		)

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold">{memberInfo.user_name}</h2>
			<p className="text-gray-600">{memberInfo.email}</p>
			<ul className="mt-4 space-y-2">
				<li>
					회원 가입일: {new Date(memberInfo.created_at).toLocaleDateString()}
				</li>
				<li>
					마지막 업데이트:{" "}
					{new Date(memberInfo.updated_at).toLocaleDateString()}
				</li>
				<li>업데이트 횟수: {memberInfo.update_count}</li>
			</ul>
		</div>
	)
}
