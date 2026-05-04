import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return <p className="p-4">Seu carrinho está vazio.</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 md:flex-row items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />

              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>R$ {item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <div>
              <p className="font-bold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: R$ {total.toFixed(2)}</h2>

        <button className="mt-4 bg-[#252525] text-[#fdb71a] px-6 py-2 rounded hover:bg-[#151515] transition">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}

export default Cart;
