import "./Gallery.scss";
import React, { useState } from "react";
import { products } from "@root/productList";
const PRODUCT = products[0];

function Gallery() {
	const [active, setActive] = useState(0);

	function handleActive(id: number) {
		setActive(id);
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
			<div className="gallery__carousel image">{imagesMap}</div>
			<div className="gallery__thumbnail-container">{thumbnailsMap}</div>
		</section>
	);
}

export default Gallery;

interface Props {
	url: string;
	onClick: () => void;
	isActive: boolean;
	isLast: boolean;
}

function Thumbnail({ url, onClick, isActive, isLast }: Props) {
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
