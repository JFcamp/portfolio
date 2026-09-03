import AskPedro from "@/components/AskPedro";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import RecruiterMode from "@/components/RecruiterMode";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-8">
      <header className="flex items-baseline justify-between pt-8 text-sm">
        <span className="font-display font-medium">Pedro Campos</span>
        <nav className="flex gap-5">
          <a href="#projetos" className="hover:underline">Projetos</a>
          <a href="#publicacoes" className="hover:underline">Publicações</a>
          <a href="#recrutador" className="hover:underline">Modo recrutador</a>
        </nav>
      </header>

      <section className="pt-24 pb-16">
        <p className="text-base text-moss">Machine Learning Engineer na águilahub · Sistemas de Informação, UFV (2026)</p>
        <h1 className="mt-3 text-4xl sm:text-6xl font-bold leading-[1.02] tracking-tight">
          Pergunte o que quiser sobre mim. Eu respondo com fontes.
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed">
          Coloco LLMs com RAG em produção, treino modelos de segmentação para agricultura e publico
          o que aprendo. Este assistente foi construído por mim, sem framework de orquestração, e cada
          resposta aponta a seção do site que a sustenta.
        </p>
        <AskPedro />
      </section>

      <Projects />
      <Publications />
      <RecruiterMode />

      <footer className="rule py-10 text-sm flex flex-wrap gap-x-6 gap-y-2">
        <a href="mailto:pedrocampos6388@gmail.com" className="underline">pedrocampos6388@gmail.com</a>
        <a href="https://www.linkedin.com/in/pedro-campos-5760a92ab" className="underline">LinkedIn</a>
        <a href="https://github.com/JFcamp/portfolio" className="underline">GitHub</a>
        <span className="text-moss/80">Belo Horizonte, MG</span>
      </footer>
    </main>
  );
}
