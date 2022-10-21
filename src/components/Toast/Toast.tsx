import "./Toast.scss";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, useEffect, useRef, useState } from "react";

export type messageType = { text: string; timeStamp: number };

interface Props {
	messages: messageType[];
}

function Toast({ messages }: Props) {
	const heightRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setHeight(heightRef.current?.scrollHeight || 0);
	}, [messages]);

	const messagesMap = [];
	for (let message of messages) {
		messagesMap.push(<Message key={message.timeStamp} text={message.text} />);
	}

	return createPortal(
		<motion.div
			className="toast-container"
			ref={heightRef}
			style={{ "--height": `${height}px` } as CSSProperties}
		>
			<AnimatePresence>{messagesMap}</AnimatePresence>
		</motion.div>,
		document.body
	);
}

export default Toast;

function Message({ text }: { text: string }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: "-100%" }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ bounce: false }}
			className="toast__message"
		>
			{text}
		</motion.div>
	);
}
