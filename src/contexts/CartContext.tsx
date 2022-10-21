import { createContext, useEffect, useState } from "react";
import useToast, { MESSAGES } from "@hooks/useToast";

export interface CartContextType {
	quantity: number;
	handleCart: (num: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
	undefined
);

export function CartContextProvider({ children }: { children: JSX.Element[] }) {
	const [quantity, setQuantity] = useState(0);
	const showToast = useToast();

	function handleCart(num: number) {
		if (num < 0) {
			setQuantity(0);
			showToast && showToast(MESSAGES.ADD);
		} else {
			setQuantity((prev) => prev + num);
			showToast && showToast(MESSAGES.REMOVE);
		}
	}

	return (
		<CartContext.Provider value={{ quantity, handleCart }}>
			{children}
		</CartContext.Provider>
	);
}
