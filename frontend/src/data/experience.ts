import type { Experience } from '@/types';
import { useLang, type Localized } from './localized';

/** Professional experience timeline (bilingual). Sourced from Pedro's resume. */
const experiencesByLang: Localized<Experience[]> = {
  en: [
    {
      year: '2024 — Present',
      role: 'Machine Learning Engineer (promoted from ML Intern)',
      company: 'águilahub',
      period: 'ML Engineer: Mar 2026 – Present · ML Intern: Nov 2024 – Mar 2026 · Remote',
      description:
        'Technology consultancy. Promoted from intern to engineer in Mar 2026. Build and ship conversational AI assistants for customer-service automation across clients in multiple sectors.',
      responsibilities: [
        'Developed and deployed to production multiple chatbots and virtual assistants with RAG and LLMs (Claude API, OpenAI API, LangChain, Dify, Botpress, Dialogflow) for customer-service automation.',
        'Built, reviewed and optimized conversational flows and knowledge bases (FAQs, internal documents), with content curation and prompt engineering to raise resolution and reduce fallback and handoff.',
        'Analyzed real user interactions and channel metrics to find improvement opportunities and prioritize content, flow and prompt adjustments.',
        'Applied NLP and LLMs to text classification, content automation and insight generation; integrated solutions into systems via REST APIs.',
        'Worked in multidisciplinary teams (Product, Technology, Support), translating business problems into AI solutions.',
        'Represented the company at Febraban Tech 2025 and published an article on the impact of AI for a non-technical audience.',
      ],
      tech: ['RAG', 'LLMs', 'Claude API', 'OpenAI API', 'LangChain', 'Dify', 'Botpress', 'Dialogflow', 'REST APIs'],
    },
    {
      year: '2024 — 2026',
      role: 'Artificial Intelligence Intern',
      company: 'Garza Inteligência Financeira',
      period: 'Mar 2024 – Mar 2026 · Remote',
      description: 'Fintech. AI solutions applied to the financial market, from prototype to delivery.',
      responsibilities: [
        'Built AI solutions for the financial market from prototype to delivery.',
        'Developed back-end and API integrations.',
        'Automated workflows and performed data analysis with Python and SQL.',
      ],
      tech: ['Python', 'SQL', 'REST APIs', 'Data Analysis'],
    },
    {
      year: '2023 — Present',
      role: 'AI Teaching Assistant · Undergraduate Researcher',
      company: 'Universidade Federal de Viçosa (UFV)',
      period: '2023 – Present',
      description:
        'Teaching AI fundamentals and applications, and conducting deep learning research with award-winning publications.',
      responsibilities: [
        'Taught AI fundamentals and applications to students; delivered an AI mini-course at WSIS 2025 to participants from several states.',
        'Conducted deep learning research with award-winning papers: Best Paper WVC 2025, Best Full Paper WSIS 2025, and 2nd Best Paper WSIS 2024.',
      ],
      tech: ['Deep Learning', 'PyTorch', 'TensorFlow', 'Research'],
    },
    {
      year: '2022 — 2023',
      role: 'Customer Service & Support Intern',
      company: 'Itaú Unibanco',
      period: 'Jan 2022 – Mar 2023 · Belo Horizonte, MG · On-site',
      description:
        'Bank. Customer support in an internal banking department, focused on service quality, communication and service KPIs.',
      responsibilities: [
        'Handled and resolved customer issues in an internal banking department.',
        'Focused on service quality, communication and service indicators (satisfaction and resolution).',
      ],
      tech: ['Customer Service', 'Communication', 'Service KPIs'],
    },
  ],
  pt: [
    {
      year: '2024 — Atual',
      role: 'Engenheiro de Machine Learning (promovido de Estagiário de ML)',
      company: 'águilahub',
      period: 'ML Engineer: mar/2026 – Atual · Estágio de ML: nov/2024 – mar/2026 · Remoto',
      description:
        'Consultoria de tecnologia. Promovido de estagiário a engenheiro em mar/2026. Desenvolvo e coloco em produção assistentes de IA conversacional para automação de atendimento em clientes de diversos setores.',
      responsibilities: [
        'Desenvolvi e coloquei em produção diversos chatbots e assistentes virtuais com RAG e LLMs (Claude API, OpenAI API, LangChain, Dify, Botpress, Dialogflow) para automação de atendimento.',
        'Construí, revisei e otimizei fluxos conversacionais e bases de conhecimento (FAQs, documentos internos), com curadoria de conteúdo e engenharia de prompts para aumentar resolução e reduzir fallback e transbordo.',
        'Analisei interações reais de usuários e indicadores dos canais para identificar oportunidades e priorizar ajustes de conteúdo, fluxo e prompts.',
        'Apliquei PLN e LLMs em classificação de texto, automação de conteúdo e geração de insights; integrei as soluções a sistemas via APIs REST.',
        'Trabalhei em times multidisciplinares (Produto, Tecnologia e Atendimento), traduzindo problemas de negócio em soluções de IA.',
        'Representei a empresa na Febraban Tech 2025 e publiquei artigo sobre os impactos da IA para público não técnico.',
      ],
      tech: ['RAG', 'LLMs', 'Claude API', 'OpenAI API', 'LangChain', 'Dify', 'Botpress', 'Dialogflow', 'APIs REST'],
    },
    {
      year: '2024 — 2026',
      role: 'Estagiário de Inteligência Artificial',
      company: 'Garza Inteligência Financeira',
      period: 'mar/2024 – mar/2026 · Remoto',
      description: 'Fintech. Soluções de IA aplicadas ao mercado financeiro, do protótipo à entrega.',
      responsibilities: [
        'Construí soluções de IA para o mercado financeiro, do protótipo à entrega.',
        'Desenvolvi back-end e integrações com APIs.',
        'Automatizei fluxos e realizei análise de dados com Python e SQL.',
      ],
      tech: ['Python', 'SQL', 'APIs REST', 'Análise de Dados'],
    },
    {
      year: '2023 — Atual',
      role: 'Monitor de IA · Pesquisador de Iniciação Científica',
      company: 'Universidade Federal de Viçosa (UFV)',
      period: '2023 – Atual',
      description:
        'Ensino de fundamentos e aplicações de IA, e pesquisa em deep learning com publicações premiadas.',
      responsibilities: [
        'Ensinei fundamentos e aplicações de IA a estudantes; ministrei minicurso de IA no WSIS 2025 para participantes de vários estados.',
        'Pesquisa em deep learning com artigos premiados: Melhor Artigo WVC 2025, Melhor Full Paper WSIS 2025 e 2º Melhor Artigo WSIS 2024.',
      ],
      tech: ['Deep Learning', 'PyTorch', 'TensorFlow', 'Pesquisa'],
    },
    {
      year: '2022 — 2023',
      role: 'Estagiário de Atendimento e Suporte ao Cliente',
      company: 'Itaú Unibanco',
      period: 'jan/2022 – mar/2023 · Belo Horizonte, MG · Presencial',
      description:
        'Banco. Atendimento ao cliente em setor interno do banco, com foco em qualidade de serviço, comunicação e KPIs de atendimento.',
      responsibilities: [
        'Atendi e resolvi problemas de clientes em setor interno do banco.',
        'Foco em qualidade de serviço, comunicação e indicadores de atendimento (satisfação e resolução).',
      ],
      tech: ['Atendimento ao Cliente', 'Comunicação', 'KPIs de Atendimento'],
    },
  ],
};

export const experiences: Experience[] = experiencesByLang.en;

export function useExperiences(): Experience[] {
  return experiencesByLang[useLang()];
}
