const { Cart, Product } = require('../Models');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  let cartItem = await Cart.findOne({ where: { userId, productId } });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await Cart.create({ userId, productId, quantity });
  }

  res.status(201).json({ message: "Product added to cart", cartItem });
};


exports.getCart = async (req, res) => {
  const userId = req.user.id;

  const cartItems = await Cart.findAll({
    where: { userId },
    include: [{ model: Product }]
  });

  if (!cartItems.length) {
    return res.status(200).json({
      items: [],
      totalItems: 0,
      subTotal: 0,
      discount: 0,
      deliveryFee: 0,
      grandTotal: 0
    });
  }

  let subTotal = 0;
  let discountTotal = 0;

  const items = cartItems.map(item => {
    const product = item.Product;
    const price = product.price;
    const qty = item.quantity;

    const discount =
      product.discount_available && product.discount_percentage
        ? (price * product.discount_percentage) / 100
        : 0;

    const discountedPrice = price - discount;
    const itemTotal = discountedPrice * qty;

    subTotal += itemTotal;
    discountTotal += discount * qty;

    return {
      cartId: item.id,
      productId: product.id,
      productName: product.productName,
      price,
      discount: discount.toFixed(2),
      discountedPrice: discountedPrice.toFixed(2),
      quantity: qty,
      total: itemTotal.toFixed(2),
      primary_image_url: product.primary_image_url,
    };
  });

  const deliveryFee = subTotal > 10000 ? 0 : 500; // free delivery if subtotal > 10,000
  const grandTotal = subTotal + deliveryFee;

  res.status(200).json({
    items,
    totalItems: items.length,
    subTotal: subTotal.toFixed(2),
    discount: discountTotal.toFixed(2),
    deliveryFee: deliveryFee.toFixed(2),
    grandTotal: grandTotal.toFixed(2),
  });
};


exports.removeFromCart = async (req, res) => {
  const { cartId } = req.params;
  const userId = req.user.id;

  const cartItem = await Cart.findOne({ where: { id: cartId, userId } });
  if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

  await cartItem.destroy();
  res.status(200).json({ message: "Item removed from cart" });
};


exports.clearCart = async (req, res) => {
  const userId = req.user.id;

  await Cart.destroy({ where: { userId } });
  res.status(200).json({ message: "Cart cleared" });
};
