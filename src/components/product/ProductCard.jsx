import { useNavigate } from "react-router-dom";
import ActionButton from "../ui/actionButton";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-400 p-4 rounded shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="mb-2 w-full h-60 object-cover rounded"
        onError={(e) => {
          e.target.src = "https://picsum.photos/300/300";
        }}
      />

      <h2 className="font-semibold text-lg">{product.name}</h2>

      <p className="text-gray-600 mb-2">{product.category}</p>

      <p className="font-bold text-[#252525]">R$ {product.price.toFixed(2)}</p>

      <ActionButton
        text="Ver detalhes"
        onClick={() => navigate(`/product/${product.id}`)}
      />
    </div>
  );
}
