import type { SkillGroup, TechItem } from '@/types';
import { useLang, type Localized } from './localized';

/**
 * Skills grouped by category — no percentages, no progress bars (intentional).
 * Sourced from Pedro's resume. Category names are localized; tool names are not.
 */
const skillGroupsByLang: Localized<SkillGroup[]> = {
  en: [
    {
      category: 'LLMs, RAG & AI Agents',
      items: ['RAG', 'LLMs', 'Prompt Engineering', 'System Prompts', 'LangChain', 'LlamaIndex', 'Hugging Face', 'OpenAI API', 'Anthropic Claude API', 'Google Gemini API', 'AI Agents', 'Tool / Function Calling', 'Guardrails', 'LLM Evaluation', 'Hallucination Detection'],
    },
    {
      category: 'NLP & Semantic Search',
      items: ['NLP', 'Tokenization', 'Embeddings', 'Semantic Search', 'Re-ranking', 'Chunking', 'Cosine Similarity'],
    },
    {
      category: 'Vector Databases',
      items: ['FAISS', 'Pinecone', 'ChromaDB', 'pgvector'],
    },
    {
      category: 'Machine Learning',
      items: ['Scikit-learn', 'Supervised Learning', 'Unsupervised Learning', 'Classification', 'Regression', 'Clustering', 'Feature Engineering', 'Cross-validation', 'Hyperparameter Tuning', 'Evaluation Metrics (F1, ROC-AUC, RMSE)'],
    },
    {
      category: 'Deep Learning',
      items: ['PyTorch', 'TensorFlow', 'Keras', 'Neural Networks', 'Backpropagation', 'CNNs', 'Transformers', 'Attention', 'Transfer Learning', 'Fine-tuning'],
    },
    {
      category: 'Computer Vision',
      items: ['OpenCV', 'YOLO', 'Object Detection', 'Image Segmentation', 'Image Classification', 'Image Augmentation', 'OCR'],
    },
    {
      category: 'Data Science',
      items: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'EDA', 'Data Cleaning', 'Feature Selection', 'ETL', 'Airflow', 'Spark'],
    },
    {
      category: 'Databases',
      items: ['SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'NoSQL', 'Data Warehousing', 'Data Lake'],
    },
    {
      category: 'Backend & APIs',
      items: ['FastAPI', 'Flask', 'REST APIs', 'JSON', 'HTTP', 'WebSockets'],
    },
    {
      category: 'MLOps',
      items: ['Model Deployment', 'Model Serving', 'Model Monitoring', 'Data / Model Drift', 'MLflow', 'CI/CD', 'GitHub Actions', 'Experiment Tracking'],
    },
    {
      category: 'DevOps & Cloud',
      items: ['Docker', 'Docker Compose', 'Kubernetes', 'Linux', 'Bash', 'AWS', 'Azure', 'Google Cloud', 'SageMaker', 'GPU / CUDA'],
    },
    {
      category: 'Software Engineering',
      items: ['Git', 'GitHub', 'Clean Code', 'OOP', 'Design Patterns', 'Unit Testing', 'Pytest', 'Logging', 'Observability', 'System Architecture', 'Scalability'],
    },
    {
      category: 'Security & Responsible AI',
      items: ['API Security', 'Authentication', 'Authorization', 'OAuth 2.0', 'JWT', 'Secrets Management', 'Prompt Injection', 'Adversarial Attacks', 'Responsible AI', 'Explainable AI (SHAP)', 'Bias & Fairness'],
    },
    {
      category: 'Math & Statistics',
      items: ['Linear Algebra', 'Calculus', 'Probability', 'Statistics', 'Hypothesis Testing', 'Optimization', 'A/B Testing'],
    },
    { category: 'Languages', items: ['Portuguese (native)', 'English (intermediate/advanced)'] },
  ],
  pt: [
    {
      category: 'LLMs, RAG e Agentes de IA',
      items: ['RAG', 'LLMs', 'Engenharia de Prompts', 'System Prompts', 'LangChain', 'LlamaIndex', 'Hugging Face', 'OpenAI API', 'Anthropic Claude API', 'Google Gemini API', 'Agentes de IA', 'Tool / Function Calling', 'Guardrails', 'Avaliação de LLMs', 'Detecção de Alucinações'],
    },
    {
      category: 'PLN e Busca Semântica',
      items: ['PLN', 'Tokenização', 'Embeddings', 'Busca Semântica', 'Re-ranking', 'Chunking', 'Similaridade de Cosseno'],
    },
    {
      category: 'Bancos Vetoriais',
      items: ['FAISS', 'Pinecone', 'ChromaDB', 'pgvector'],
    },
    {
      category: 'Machine Learning',
      items: ['Scikit-learn', 'Aprendizado Supervisionado', 'Aprendizado Não Supervisionado', 'Classificação', 'Regressão', 'Clustering', 'Feature Engineering', 'Cross-validation', 'Ajuste de Hiperparâmetros', 'Métricas (F1, ROC-AUC, RMSE)'],
    },
    {
      category: 'Deep Learning',
      items: ['PyTorch', 'TensorFlow', 'Keras', 'Redes Neurais', 'Backpropagation', 'CNNs', 'Transformers', 'Attention', 'Transfer Learning', 'Fine-tuning'],
    },
    {
      category: 'Visão Computacional',
      items: ['OpenCV', 'YOLO', 'Detecção de Objetos', 'Segmentação de Imagens', 'Classificação de Imagens', 'Image Augmentation', 'OCR'],
    },
    {
      category: 'Ciência de Dados',
      items: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'EDA', 'Limpeza de Dados', 'Feature Selection', 'ETL', 'Airflow', 'Spark'],
    },
    {
      category: 'Bancos de Dados',
      items: ['SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'NoSQL', 'Data Warehousing', 'Data Lake'],
    },
    {
      category: 'Backend e APIs',
      items: ['FastAPI', 'Flask', 'APIs REST', 'JSON', 'HTTP', 'WebSockets'],
    },
    {
      category: 'MLOps',
      items: ['Deploy de Modelos', 'Model Serving', 'Monitoramento de Modelos', 'Data / Model Drift', 'MLflow', 'CI/CD', 'GitHub Actions', 'Experiment Tracking'],
    },
    {
      category: 'DevOps e Nuvem',
      items: ['Docker', 'Docker Compose', 'Kubernetes', 'Linux', 'Bash', 'AWS', 'Azure', 'Google Cloud', 'SageMaker', 'GPU / CUDA'],
    },
    {
      category: 'Engenharia de Software',
      items: ['Git', 'GitHub', 'Clean Code', 'OOP', 'Design Patterns', 'Testes Unitários', 'Pytest', 'Logging', 'Observabilidade', 'Arquitetura de Sistemas', 'Escalabilidade'],
    },
    {
      category: 'Segurança e IA Responsável',
      items: ['Segurança de APIs', 'Autenticação', 'Autorização', 'OAuth 2.0', 'JWT', 'Gestão de Secrets', 'Prompt Injection', 'Adversarial Attacks', 'IA Responsável', 'IA Explicável (SHAP)', 'Bias e Fairness'],
    },
    {
      category: 'Matemática e Estatística',
      items: ['Álgebra Linear', 'Cálculo', 'Probabilidade', 'Estatística', 'Teste de Hipóteses', 'Otimização', 'A/B Testing'],
    },
    { category: 'Idiomas', items: ['Português (nativo)', 'Inglês (intermediário/avançado)'] },
  ],
};

/** Compact tech strip shown under the hero (language-independent). */
export const techStack: TechItem[] = [
  { name: 'Python' },
  { name: 'RAG' },
  { name: 'LLMs' },
  { name: 'LangChain' },
  { name: 'OpenAI API' },
  { name: 'Claude API' },
  { name: 'Gemini API' },
  { name: 'PyTorch' },
  { name: 'TensorFlow' },
  { name: 'Scikit-learn' },
  { name: 'OpenCV' },
  { name: 'YOLO' },
  { name: 'FAISS' },
  { name: 'FastAPI' },
  { name: 'SQL' },
  { name: 'PostgreSQL' },
  { name: 'Docker' },
  { name: 'MLflow' },
  { name: 'AWS' },
  { name: 'Git' },
];

export const skillGroups: SkillGroup[] = skillGroupsByLang.en;

export function useSkillGroups(): SkillGroup[] {
  return skillGroupsByLang[useLang()];
}
