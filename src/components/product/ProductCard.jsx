import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="mb-2 w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = "https://picsum.photos/300/300";
        }}
      />

      <h2 className="font-semibold text-lg">{product.name}</h2>

      <p className="text-gray-600 mb-2">{product.category}</p>

      <p className="font-bold text-green-600">R$ {product.price.toFixed(2)}</p>

      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Ver detalhes
      </button>
    </div>
  );
}
