"use client"

import React from "react"
import PropTypes from "prop-types"
import cn from "clsx"

import { buttonVariants } from "./ButtonVariants"

export default function Button({
	className = "",
	size = "m",
	color = "purple",
	children,
	type = "button",
	...rest
}) {
	return (
		<button
			{...rest}
			type={type}
			className={cn(buttonVariants({ size, color }), className)}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string,
	color: PropTypes.string,
	children: PropTypes.node.isRequired,
	type: PropTypes.oneOf(["button", "submit"]),
}
