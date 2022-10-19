import "./Gallery.scss";
import { useState } from "react";
import { products } from "@root/productList";
const PRODUCT = products[0];

function Gallery() {
	const [active, setActive] = useState(0);

	function handleActive(id: number) {
		setActive(id);
	}

	const imagesMap = [];
	for (let i = 0; i < PRODUCT.images.length; i++) {
		imagesMap.push(
			<Thumbnail
				key={i}
				url={PRODUCT.images[i].thumbnail}
				onClick={() => handleActive(i)}
				isActive={i === active}
				isLast={i === PRODUCT.images.length - 1}
			/>
		);
	}
	return (
		<section className="gallery">
			<div className="gallery__active image">
				<img src={PRODUCT.images[active].large} alt="" className="image__img" />
			</div>
			<div className="gallery__thumbnail-container">{imagesMap}</div>
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
