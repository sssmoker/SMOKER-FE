import { cva } from "class-variance-authority"

export const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			size: {
				m: "w-[130px] h-[40px] text-sm",
				l: "w-[200px] h-[40px]  text-base",
				xl: "w-[360px] h-[40px]  text-base",
			},
			color: {
				green: "bg-green-500 text-white hover:bg-green-600",
				gray: "bg-gray-400 text-white hover:bg-gray-500",
				black: "bg-black text-white hover:bg-gray-800",
				purple: "bg-[#4517FF] text-white hover:bg-[#3A14CC]",
			},
		},
		defaultVariants: {
			size: "m",
			color: "purple",
		},
	},
)
