import { createContext, useEffect, useState } from "react";
import useToast, { MESSAGES } from "@hooks/useToast";

export interface CartContextable {
	quantity: number;
	handleCart: (num: number) => void;
}

export const CartContext = createContext<CartContextable | undefined>(
	undefined
);

export function CartContextProvider({ children }: { children: JSX.Element[] }) {
	const [quantity, setQuantity] = useState(0);
	const showToast = useToast();

	function handleCart(num: number) {
		if (num < 0) {
			setQuantity(0);
			showToast && showToast(MESSAGES.REMOVE);
		} else {
			setQuantity((prev) => prev + num);
			showToast && showToast(MESSAGES.ADD);
		}
	}

	return (
		<CartContext.Provider value={{ quantity, handleCart }}>
			{children}
		</CartContext.Provider>
	);
}
