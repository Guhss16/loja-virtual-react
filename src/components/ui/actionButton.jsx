export default function ActionButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 w-full bg-[#252525] text-[#fdb71a] font-semibold py-2 rounded hover:bg-[#151515] transition"
    >
      {text}
    </button>
  );
}
