import "./Description.scss";
import { useContext, useState } from "react";
import { CartContext, CartContextType } from "@contexts/CartContext";
import { products } from "@root/productList";
import { ReactComponent as CartIcon } from "@assets/icon-cart.svg";

const PRODUCT = products[0];

const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});
const PRICE = priceFormatter.format(PRODUCT.price * PRODUCT.discount);
const ORG_PRICE = priceFormatter.format(PRODUCT.price);

const DISCOUNT = new Intl.NumberFormat("en-US", { style: "percent" }).format(
	PRODUCT.discount
);

function Description() {
	const { handleCart } = useContext(CartContext);

	const [quantity, setQuantity] = useState(0);

	function handleQuantity(num: -1 | 1) {
		setQuantity((prev) => {
			const neu = prev + num;
			if (neu < 0) {
				return 0;
			} else {
				return neu;
			}
		});
	}

	function handleAdd() {
		handleCart(quantity);
	}

	return (
		<section className="description">
			<h1 className="description__company">{PRODUCT.manufacturer}</h1>
			<h2 className="description__product">{PRODUCT.name}</h2>
			<p className="description__text">{PRODUCT.description}</p>
			<span className="description__price price">
				<span className="price__current">{PRICE}</span>
				<span className="price__discount">{DISCOUNT}</span>
				<span className="price__org">{ORG_PRICE}</span>
			</span>
			<div className="description__button-container">
				<div className="description__quantity quantity">
					<button
						className="quantity__button"
						onClick={() => handleQuantity(-1)}
					>
						-
					</button>
					<span className="quantity__number">{quantity}</span>
					<button
						className="quantity__button"
						onClick={() => handleQuantity(1)}
					>
						+
					</button>
				</div>
				<button className="description__add add" onClick={handleAdd}>
					<div className="add__icon image">
						<CartIcon className="image__img" />
					</div>
					<span className="add__text">Add to cart</span>
				</button>
			</div>
		</section>
	);
}

export default Description;
