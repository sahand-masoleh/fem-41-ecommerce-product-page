import "./Gallery.scss";
import React, { useState } from "react";
import { DraggableProps, motion, PanInfo } from "framer-motion";
import FullScreen from "./FullScreen";
import { ReactComponent as NextIcon } from "@assets/icon-next.svg";
import { ReactComponent as PreviousIcon } from "@assets/icon-previous.svg";
import { products } from "@root/productList";
const PRODUCT = products[0];

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

interface Galleriable {
	inModal?: boolean;
	active?: number;
}

function Gallery({ inModal, active: initActive }: Galleriable) {
	const [active, setActive] = useState(initActive ?? 0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	function handleActive(id: number) {
		setActive(id);
	}

	function handleModal() {
		setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
	}

	function handlePaginate(direction: 1 | -1) {
		setActive((prevActive) => {
			const neuActive = prevActive + direction;
			if (neuActive < PRODUCT.images.length && neuActive >= 0) {
				return neuActive;
			} else {
				return prevActive;
			}
		});
	}

	function handleDrag(e: DragEvent, info: PanInfo) {
		const { offset, velocity } = info;
		const swipePower = Math.abs(offset.x) * velocity.x;
		if (swipePower < -SWIPE_CONFIDENCE_THRESHOLD) {
			handlePaginate(1);
		} else if (swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
			handlePaginate(-1);
		}
	}

	const imagesMap = [];
	const thumbnailsMap = [];
	for (let i = 0; i < PRODUCT.images.length; i++) {
		thumbnailsMap.push(
			<Thumbnail
				key={i}
				url={PRODUCT.images[i].thumbnail}
				onClick={() => handleActive(i)}
				isActive={i === active}
				isLast={i === PRODUCT.images.length - 1}
			/>
		);
		imagesMap.push(
			<img
				key={i}
				src={PRODUCT.images[i].large}
				alt=""
				className="gallery__large"
				style={{ "--left": `-${active * 100}%` } as React.CSSProperties}
				onClick={!inModal ? handleModal : undefined}
			/>
		);
	}

	const modifier = inModal ? "in-modal" : "normal";

	return (
		<>
			<section className={`gallery gallery--${modifier}`}>
				<div
					className={`gallery__carousel gallery__carousel--${modifier} image`}
				>
					<motion.div
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={0.01}
						onDragEnd={handleDrag}
						className="gallery__large-container"
					>
						{imagesMap}
					</motion.div>
					<button
						className={`gallery__control gallery__control--${modifier} image`}
						onClick={() => handlePaginate(-1)}
						hidden={active <= 0}
					>
						<PreviousIcon className="image__img" />
					</button>
					<button
						className={`gallery__control gallery__control--${modifier} image`}
						onClick={() => handlePaginate(1)}
						hidden={active >= PRODUCT.images.length - 1}
					>
						<NextIcon className="image__img" />
					</button>
				</div>
				<div
					className={`gallery__thumbnail-container gallery__thumbnail-container--${modifier}`}
				>
					{thumbnailsMap}
				</div>
			</section>
			{isModalOpen && <FullScreen active={active} close={handleModal} />}
		</>
	);
}

export default Gallery;

interface Thumbnailable {
	url: string;
	onClick: () => void;
	isActive: boolean;
	isLast: boolean;
}

function Thumbnail({ url, onClick, isActive, isLast }: Thumbnailable) {
	return (
		<>
			<div
				className={`gallery__thumbnail gallery__thumbnail--${
					isActive ? "active" : "inactive"
				}`}
				onClick={onClick}
			>
				<img src={url} alt="product thumbnail" className="image__img" />
			</div>
			{!isLast && <div className="gallery__spacer"></div>}
		</>
	);
}
