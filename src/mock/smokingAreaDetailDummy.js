// export const smokingAreaDetailDummy = {
// 	smokingAreaName: "string",
// 	location: {
// 		address: "string",
// 		latitude: 0,
// 		longitude: 0,
// 	},
// 	feature: {
// 		hasAirPurifier: true,
// 		hasAirConditioning: true,
// 		hasChair: true,
// 		hasTrashBin: true,
// 		hasVentilationSystem: true,
// 		isAccessible: true,
// 		hasCCTV: true,
// 		hasEmergencyButton: true,
// 		hasVoiceGuidance: true,
// 		hasFireExtinguisher: true,
// 		isRegularlyCleaned: true,
// 		hasCigaretteDisposal: true,
// 		hasSunshade: true,
// 		hasRainProtection: true,
// 	},
// }

export const smokingAreaDetailDummy = (() => {
	const featureKeys = [
		"hasAirPurifier",
		"hasAirConditioning",
		"hasChair",
		"hasTrashBin",
		"hasVentilationSystem",
		"isAccessible",
		"hasCCTV",
		"hasEmergencyButton",
		"hasVoiceGuidance",
		"hasFireExtinguisher",
		"isRegularlyCleaned",
		"hasCigaretteDisposal",
		"hasSunshade",
		"hasRainProtection",
	]

	const trueCount = Math.floor(Math.random() * 6) + 5 // 범위: 5~10

	// featureKeys 배열을 복사해서 섞기 (Fisher-Yates shuffle)
	const shuffledKeys = [...featureKeys]
	for (let i = shuffledKeys.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffledKeys[i], shuffledKeys[j]] = [shuffledKeys[j], shuffledKeys[i]]
	}

	// 선택된 true 키
	const trueKeys = new Set(shuffledKeys.slice(0, trueCount))

	// feature 객체 생성: 선택된 키는 true, 나머지는 false
	const feature = featureKeys.reduce((acc, key) => {
		acc[key] = trueKeys.has(key)
		return acc
	}, {})

	return {
		smokingAreaName: "string",
		location: {
			address: "string",
			latitude: 0,
			longitude: 0,
		},
		feature,
	}
})()
