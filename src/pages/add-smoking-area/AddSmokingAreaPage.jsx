import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Map from "@/components/home-map/Map"
import ComButton from "@/components/common/button/ComButton"
import { ChevronLeft } from "lucide-react"

export default function RegisterSmokingArea() {
	const [selectedLocation, setSelectedLocation] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUserLocation = async () => {
			try {
				const res = await fetch("http://localhost:3001/currentLocation")
				if (!res.ok) throw new Error("Failed to fetch current location")
				const data = await res.json()
				setSelectedLocation({
					lat: data.userLat,
					lng: data.userLng,
					address: "서울 동작구 남부순환로 2089",
				})
			} catch (error) {
				console.error("🚨 위치 정보 로드 실패:", error)
			}
		}
		fetchUserLocation()
	}, [])

	const handleMapMove = (newLocation) => {
		setSelectedLocation({
			...selectedLocation,
			lat: newLocation.lat,
			lng: newLocation.lng,
		})
	}

	return (
		<div className="relative h-screen w-full overflow-hidden bg-gray-100">
			<div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white p-4 shadow-md">
				<button onClick={() => navigate(-1)} className="p-2">
					<ChevronLeft size={24} className="text-gray-800" />
				</button>
				<div className="flex flex-col items-center">
					<h2 className="text-base font-semibold">
						등록할 흡연 구역의 위치를 설정해주세요.
					</h2>
					<p className="text-xs text-gray-500">
						정확한 위치가 맞는지 확인해주세요.
					</p>
				</div>
				<button
					onClick={() => setSelectedLocation({ lat: 37.5665, lng: 126.978 })}
					className="text-sm font-medium text-[#4517FF]"
				>
					내 주변
				</button>
			</div>

			<Map
				markers={[]}
				currentLocation={selectedLocation}
				moveToLocation={selectedLocation}
				onMapMove={handleMapMove}
				className="absolute inset-0 h-full w-full"
			/>

			<div className="fixed bottom-[16vh] left-1/2 z-50 w-full max-w-[380px] -translate-x-1/2 rounded-xl bg-white p-4 px-4 shadow-lg">
				<p className="text-sm text-gray-800">{selectedLocation?.address}</p>
				<ComButton size="l" color="purple" className="mt-3 w-full">
					다음
				</ComButton>
			</div>
		</div>
	)
}
