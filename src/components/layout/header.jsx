import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="flex flex-row justify-between px-[40px] py-[20px] bg-[#252525] text-[#fdb71a]">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          Loja Virtual TGID
        </h1>
        <ShoppingCart
          size={24}
          onClick={() => navigate("/cart")}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}
