const projects = [
  {
    title: "Segmentação de ervas daninhas com YOLO",
    period: "2023 – atual · iniciação científica, UFV",
    problem: "Identificar ervas daninhas em imagens de lavoura para reduzir uso de herbicida.",
    approach: "YOLO26-seg (nano, small, large) sobre o CoFly-WeedDB, validação cruzada e teste cego; treino no Colab/Kaggle.",
    result: "Base dos artigos premiados no WVC 2025 e WSIS 2025.",
    stack: "PyTorch · Ultralytics · Colab",
    link: "#",
  },
  {
    title: "Tumores cerebrais em MRI",
    period: "pesquisa · UFV",
    problem: "Detectar e classificar tumores em ressonâncias magnéticas com confiança alta o bastante para apoiar triagem.",
    approach: "Detecção e classificação com YOLO sobre imagens de MRI, validação em casos reais.",
    result: "Confiança acima de 90% em casos reais.",
    stack: "YOLO · OpenCV · PyTorch",
    link: "#",
  },
  {
    title: "Chatbots RAG para atendimento",
    period: "nov 2024 – atual · águilahub",
    problem: "Automatizar atendimento ao cliente com respostas fundamentadas na base da empresa.",
    approach: "Pipelines RAG em Dify, Botpress e Dialogflow, com OpenAI e Claude API; integração a APIs de blockchain e carteiras.",
    result: "Chatbots em produção para clientes de diversos setores; empresa representada na Febraban Tech 2025.",
    stack: "LangChain · Dify · Claude API",
    link: "#",
  },
  {
    title: "RideFleet",
    period: "SIN142 · sistemas distribuídos",
    problem: "Coordenar serviços de um app de caronas com baixa latência e tolerância a falhas.",
    approach: "Redis para estado compartilhado e RabbitMQ para mensageria assíncrona entre serviços.",
    result: "Arquitetura apresentada e defendida na disciplina.",
    stack: "Redis · RabbitMQ · Python",
    link: "#",
  },
  {
    title: "Este portfólio",
    period: "2026",
    problem: "Deixar um recrutador interrogar meu histórico sem ler tudo.",
    approach: "RAG artesanal: embeddings Voyage, busca por cosseno, geração com Claude e citação de fontes que rolam até a seção.",
    result: "Você está usando.",
    stack: "Next.js · Claude API · Voyage",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="rule py-16 scroll-mt-8">
      <h2 className="text-3xl font-bold">Projetos</h2>
      <ul className="mt-8">
        {projects.map((p) => (
          <li key={p.title} className="rule py-8 grid gap-4 sm:grid-cols-[1fr_2fr]">
            <div>
              <h3 className="text-xl font-medium leading-snug">{p.title}</h3>
              <p className="mt-1 text-sm text-moss">{p.period}</p>
              <p className="mt-3 text-sm">{p.stack}</p>
            </div>
            <dl className="grid gap-2 text-[15px] leading-relaxed">
              <div><dt className="inline text-moss">Problema. </dt><dd className="inline">{p.problem}</dd></div>
              <div><dt className="inline text-moss">Abordagem. </dt><dd className="inline">{p.approach}</dd></div>
              <div><dt className="inline text-moss">Resultado. </dt><dd className="inline">{p.result}</dd></div>
              <a href={p.link} className="underline mt-1 w-fit">Ver código</a>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
