import "./Toast.scss";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export type messageType = { text: string; timeStamp: number };

interface Props {
	messages: messageType[];
}

function Toast({ messages }: Props) {
	const messagesMap = [];
	for (let message of messages) {
		messagesMap.push(<Message key={message.timeStamp} text={message.text} />);
	}

	return createPortal(
		<motion.div className="toast-container">
			<AnimatePresence>{messagesMap}</AnimatePresence>
		</motion.div>,
		document.body
	);
}

export default Toast;

const variants = {
	initial: {
		fontSize: 0,
		padding: 0,
		marginBottom: 0,
	},
	animate: {
		fontSize: "1rem",
		padding: "1rem",
		marginBottom: "1rem",
	},
	exit: {
		fontSize: 0,
		padding: 0,
		marginBottom: 0,
	},
};

function Message({ text }: { text: string }) {
	return (
		<motion.div
			variants={variants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ bounce: false }}
			className="toast__message"
		>
			{text}
		</motion.div>
	);
}
