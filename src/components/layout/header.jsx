import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const cartCount = cartItems.length;

  return (
    <header>
      <div className="flex flex-row justify-between px-[40px] py-[20px] bg-[#252525] text-[#fdb71a]">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          Loja Virtual TGID
        </h1>
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
