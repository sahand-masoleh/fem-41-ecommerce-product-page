import { createContext, useState } from "react";
import ToastContainer, { Message } from "@components/Toast/Toast";

type showToastType = (text: string) => void;

export const ToastContext = createContext<showToastType | undefined>(undefined);

export function ToastContextProvider({ children }: { children: JSX.Element }) {
	const [messages, setMessages] = useState<Message[]>([]);

	function showToast(text: string) {
		const timeStamp = Date.now();
		setMessages((prevMessages) => [...prevMessages, { text, timeStamp }]);
	}

	function removeToast(timeStamp: number) {
		setMessages((prevMessages) => {
			const neuMessages = [...prevMessages];
			const index = neuMessages.findIndex((e) => e.timeStamp === timeStamp);
			index !== -1 && neuMessages.splice(index, 1);
			return neuMessages;
		});
	}

	return (
		<ToastContext.Provider value={showToast}>
			{children}
			<ToastContainer messages={messages} removeToast={removeToast} />
		</ToastContext.Provider>
	);
}
