import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, getProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import ActionButton from "../components/ui/actionButton";
import ProductCard from "../components/product/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Produto não encontrado");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const fetchRelated = async () => {
      try {
        const allProducts = await getProducts();

        const filtered = allProducts
          .filter(
            (item) =>
              item.category === product.category && item.id !== product.id,
          )
          .slice(0, 3);

        setRelatedProducts(filtered);
      } catch (error) {
        console.log("Erro ao buscar relacionados:", error);
      }
    };

    fetchRelated();
  }, [product?.id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 md:p-[0px]">
      <div className="flex flex-col md:flex-row justify-center md:py-[80px] gap-[20px] md:gap-[80px]">
        <img className="rounded" src={product.image} alt={product.name} />

        <div className="flex flex-col ">
          <h1 className="text-[40px] font-semibold">{product.name}</h1>
          <h2 className="text-[18px] font-medium underline pb-[20px]">
            {product.category}
          </h2>
          <p className="pb-[10px]">{product.description}</p>
          <p className="pb-[10px]">Preço: R$ {product.price.toFixed(2)}</p>

          <div className="flex flex-col gap-3">
            <p>Quantidade:</p>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border w-[80px] p-2 rounded"
            />
          </div>
          <ActionButton
            text="Adicionar ao Carrinho"
            onClick={() => addToCart(product, quantity)}
          />
        </div>
      </div>

      <div className="h-[2px] w-full bg-gray-300" />

      <div className="my-[40px] flex flex-col justify-center gap-[20px]">
        <p className="text-center font-medium ">Produtos Relacionados:</p>
        <div className="flex flex-row justify-center gap-[20px]">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
