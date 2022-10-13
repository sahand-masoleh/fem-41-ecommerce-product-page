import { useState } from "react";
import "./Gallery.scss";

const images = [
	{
		thumbnail: "./images/image-product-1-thumbnail.jpg",
		large: "./images/image-product-1.jpg",
	},
	{
		thumbnail: "./images/image-product-2-thumbnail.jpg",
		large: "./images/image-product-2.jpg",
	},
	{
		thumbnail: "./images/image-product-3-thumbnail.jpg",
		large: "./images/image-product-3.jpg",
	},
	{
		thumbnail: "./images/image-product-4-thumbnail.jpg",
		large: "./images/image-product-4.jpg",
	},
];

function Gallery() {
	const [active, setActive] = useState(0);

	function handleActive(id: number) {
		setActive(id);
	}

	const imagesMap = [];
	for (let i = 0; i < images.length; i++) {
		imagesMap.push(
			<Thumbnail
				key={i}
				url={images[i].thumbnail}
				onClick={() => handleActive(i)}
				isActive={i === active}
				isLast={i === images.length - 1}
			/>
		);
	}
	return (
		<section className="gallery">
			<div className="gallery__active image">
				<img src={images[active].large} alt="" className="image__img" />
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
