import "./Cart.scss";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { CartContext, CartContextType } from "@root/contexts/CartContext";
import useToast, { MESSAGES } from "@root/hooks/useToast";
import { products } from "@root/productList";
import { ReactComponent as DeleteIcon } from "@assets/icon-delete.svg";
const PRODUCT = products[0];

const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

interface Props {
	handleOpen: () => void;
}

function Cart({ handleOpen }: Props) {
	const { quantity, handleCart } =
		useContext<CartContextType | undefined>(CartContext) || {};
	const showToast = useToast();

	function handleCheckout() {
		showToast && showToast(MESSAGES.MOCK);
	}

	const price = priceFormatter.format(PRODUCT.price * PRODUCT.discount);
	const total = priceFormatter.format(
		PRODUCT.price * PRODUCT.discount * (quantity ?? 0)
	);

	return createPortal(
		<div className="cart-wrapper" onClick={handleOpen}>
			<div className="cart" onClick={(e) => e.stopPropagation()}>
				<h2 className="cart__title">cart</h2>
				<hr className="cart__divider" />
				{quantity && quantity > 0 ? (
					<>
						<div className="cart__item-container">
							<div className="cart__image image">
								<img src={PRODUCT.images[0].thumbnail} alt="product image" />
							</div>
							<h3 className="cart__product">{PRODUCT.name}</h3>
							<span className="cart__current">
								{price} x {quantity}
							</span>
							<span className="cart__total">{total}</span>
							<button
								className="cart__delete image"
								onClick={handleCart && (() => handleCart(-1))}
							>
								<DeleteIcon className="image__img" />
							</button>
						</div>
						<button className="cart__checkout" onClick={handleCheckout}>
							checkout
						</button>
					</>
				) : (
					<div className="cart__empty">Your cart is empty.</div>
				)}
			</div>
		</div>,
		document.body
	);
}

export default Cart;
