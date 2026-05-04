import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="flex flex-row justify-between px-[40px] py-[20px] bg-gray-200">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          Loja Virtual TGID
        </h1>
        <button onClick={() => navigate("/cart")}>Carrinho</button>
      </div>
    </header>
  );
}
