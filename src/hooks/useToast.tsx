import { useContext } from "react";
import { ToastContext } from "@contexts/ToastContext";

export const MESSAGES = {
	ADD: "Item added to cart successfully",
	REMOVE: "Item removed from cart successfully",
	MOCK: "This is a mock page. this button is here for demonstration purposes only!",
};

function useToast() {
	const showToast = useContext(ToastContext);
	return showToast;
}

export default useToast;
