import "./Gallery.scss";
import React, { useState } from "react";
import { ReactComponent as NextIcon } from "@assets/icon-next.svg";
import { ReactComponent as PreviousIcon } from "@assets/icon-previous.svg";
import { products } from "@root/productList";
const PRODUCT = products[0];

function Gallery() {
	const [active, setActive] = useState(0);

	function handleActive(id: number) {
		setActive(id);
	}

	function handleNavigate(direction: 1 | -1) {
		setActive((prevActive) => {
			const neuActive = prevActive + direction;
			if (neuActive < PRODUCT.images.length && neuActive >= 0) {
				return neuActive;
			} else {
				return prevActive;
			}
		});
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
			/>
		);
	}
	return (
		<section className="gallery">
			<div className="gallery__carousel image">
				{imagesMap}
				<button
					className="gallery__control image"
					onClick={() => handleNavigate(-1)}
					hidden={active <= 0}
				>
					<PreviousIcon className="image__img" />
				</button>
				<button
					className="gallery__control"
					onClick={() => handleNavigate(1)}
					hidden={active >= PRODUCT.images.length - 1}
				>
					<NextIcon className="image__img" />
				</button>
			</div>
			<div className="gallery__thumbnail-container">{thumbnailsMap}</div>
		</section>
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
