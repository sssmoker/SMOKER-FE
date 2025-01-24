// 거리 데이터 포맷팅
export function formatDistance(distance) {
	if (!distance) return "N/A"
	return `${distance}m`
}

// 평점 데이터 포맷팅
export function formatRating(rating) {
	if (!rating) return "No Rating"
	return `⭐ ${rating.toFixed(1)}`
}

// 주소 데이터 포맷팅
export function formatAddress(address) {
	return address || "주소 정보 없음"
}

// 잘써야할텐데 이거...
