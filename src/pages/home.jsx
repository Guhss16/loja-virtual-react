import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ui/actionButton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true,
    );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const categories = [...new Set(products.map((p) => p.category))];

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <div className="flex flex-col md:flex-row gap-[20px] p-4">
      <div className="w-full md:w-[20%] flex flex-col gap-[20px]">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-[#fdb71a] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fdb71a] shadow-md"
        />
        <div className="border border-[#fbd71a] rounded px-3 py-2 shadow-md">
          <p className="font-bold mb-[10px]">Categorias</p>
          {categories.map((category, index) => (
            <p
              key={index}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`cursor-pointer w-fit mb-[5px] ${
                selectedCategory === category ? "font-bold text-[#fdb71a]" : ""
              }`}
            >
              {category}
            </p>
          ))}
        </div>
        <ActionButton
          onClick={() => setSelectedCategory("")}
          text="Limpar filtro"
        />
      </div>

      <div className="w-full">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center gap-2 mt-6 ">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border disabled:opacity-50 rounded"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-[#252525] text-[#fdb71a]" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border disabled:opacity-50 rounded"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
