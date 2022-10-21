import { createContext, useState } from "react";
import Toast, { messageType } from "@components/Toast/Toast";

const TIMEOUT = 5000;

type showToastType = (text: string) => void;

export const ToastContext = createContext<showToastType | undefined>(undefined);

export function ToastContextProvider({ children }: { children: JSX.Element }) {
	const [messages, setMessages] = useState<messageType[]>([]);

	function showToast(text: string) {
		const timeStamp = Date.now();
		setMessages((prevMessages) => [...prevMessages, { text, timeStamp }]);
		setTimeout(() => {
			setMessages((prevMessages) => prevMessages.slice(1));
		}, TIMEOUT);
	}

	return (
		<ToastContext.Provider value={showToast}>
			{children}
			<Toast messages={messages} />
		</ToastContext.Provider>
	);
}
