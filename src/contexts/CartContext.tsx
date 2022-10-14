import { createContext, useState } from "react";

export interface CartContextType {
	quantity: number;
	handleCart: (num: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
	undefined
);

export function CartContextProvider({ children }: { children: JSX.Element[] }) {
	const [quantity, setQuantity] = useState(0);

	function handleCart(num: number) {
		if (num < 0) {
			setQuantity(0);
		} else {
			setQuantity((prev) => prev + num);
		}
	}

	return (
		<CartContext.Provider value={{ quantity, handleCart }}>
			{children}
		</CartContext.Provider>
	);
}
