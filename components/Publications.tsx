const items = [
  { year: "2026", what: "Introduction to Generative AI — Google Cloud", note: "certificação", link: "#" },
  { year: "2025", what: "Melhor Artigo — WVC 2025", note: "segmentação de plantas daninhas · [PREENCHER título]", link: "#" },
  { year: "2025", what: "Automated Correction of Multiple Choice Tests Using Computer Vision", note: "Melhor Full Paper — WSIS 2025", link: "#" },
  { year: "2025", what: "Unsupervised Specialization of Visual Subclasses Using K-Means in YOLO-Based Detection Pipelines", note: "WSIS 2025", link: "#" },
  { year: "2025", what: "Minicurso de IA e Visão Computacional — WSIS 2025", note: "ministrante", link: "#" },
  { year: "2025", what: "Artigo: impactos da IA no mercado — Febraban Tech", note: "", link: "#" },
  { year: "2025", what: "CS50 AI — Harvard", note: "certificação", link: "#" },
  { year: "2024", what: "1º lugar — Desafio Nacional de Hackathon em Visão Computacional e IA", note: "detecção de modalidades esportivas", link: "#" },
  { year: "2024", what: "Desempenho de Diferentes Arquiteturas no Processo de Classificação de Ervas Daninhas", note: "2º Melhor Artigo — WSIS 2024", link: "#" },
  { year: "2023", what: "3º lugar — Desafio Hackathon 2023", note: "", link: "#" },
];

export default function Publications() {
  return (
    <section id="publicacoes" className="rule py-16 scroll-mt-8">
      <h2 className="text-3xl font-bold">Publicações e prêmios</h2>
      <table className="mt-8 w-full text-[15px]">
        <tbody>
          {items.map((i, idx) => (
            <tr key={idx} className="rule">
              <td className="py-3 pr-4 align-top text-moss w-16">{i.year}</td>
              <td className="py-3 pr-4 align-top"><a href={i.link} className="underline">{i.what}</a></td>
              <td className="py-3 align-top text-ink/70 hidden sm:table-cell">{i.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
