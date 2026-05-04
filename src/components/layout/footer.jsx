export default function Footer() {
  return (
    <footer className="bg-[#252525] text-[#fdb71a] text-center py-4 px-2 mt-8 flex flex-col gap-2">
      <p className="text-[16px]">Gustavo Sampaio Samadello</p>
      <p className="text-[12px]">
        Projeto de loja virtual desenvolvido como teste técnico para processo
        seletivo da TGID.
      </p>
      <div className="flex flex-row justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/gustavosampaiosamadello/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Linkedin
        </a>
        <a
          href="https://github.com/Guhss16"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Github
        </a>
      </div>
    </footer>
  );
}
