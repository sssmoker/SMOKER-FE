import { useQuery } from "@tanstack/react-query"
import { fetchSmokingAreaMarkers, searchSmokingAreas } from "@/utils/api"

export const useSmokingAreaMarkers = ({ userLat, userLng }) =>
	useQuery({
		queryKey: ["smokingAreaMarkers", userLat, userLng],
		queryFn: () => fetchSmokingAreaMarkers(userLat, userLng),
		enabled: !!userLat && !!userLng,
		retry: 1,
		onError: (error) => console.error("🚨 마커 데이터 로드 실패:", error),
	})

export const useSearchSmokingAreas = ({ location, userLat, userLng, filter }) =>
	useQuery({
		queryKey: ["searchSmokingAreas", location, userLat, userLng, filter],
		queryFn: () => searchSmokingAreas({ location, userLat, userLng, filter }),
		enabled: !!location,
		retry: 1,
		onError: (error) => console.error("🚨 검색 실패:", error),
	})
