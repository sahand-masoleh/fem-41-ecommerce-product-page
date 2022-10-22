import "./Toast.scss";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useEffect } from "react";

const TIMEOUT = 3000;
export type Message = { text: string; timeStamp: number };

interface ToastContainerable {
	messages: Message[];
	removeToast: (timeStamp: number) => void;
}

function ToastContainer({ messages, removeToast }: ToastContainerable) {
	const messagesMap = [];
	for (let message of messages) {
		messagesMap.push(
			<Toast
				key={message.timeStamp}
				text={message.text}
				onClick={() => removeToast(message.timeStamp)}
			/>
		);
	}

	return createPortal(
		<motion.div className="toast-container">
			<AnimatePresence>{messagesMap}</AnimatePresence>
		</motion.div>,
		document.body
	);
}

export default ToastContainer;

const variants = {
	initial: {
		fontSize: 0,
		opacity: 0,
		padding: 0,
	},
	animate: {
		fontSize: "1rem",
		opacity: 1,
		padding: "1rem",
	},
	exit: {
		fontSize: 0,
		opacity: 0,
		padding: 0,
	},
};

interface Toastable {
	text: string;
	onClick: () => void;
}

function Toast({ text, onClick }: Toastable) {
	useEffect(() => {
		setTimeout(() => {
			onClick();
		}, TIMEOUT);
	}, []);

	return (
		<motion.div
			variants={variants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ bounce: false }}
			className="toast__message"
			onClick={onClick}
		>
			{text}
		</motion.div>
	);
}
