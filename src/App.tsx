/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Instagram, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  User, 
  Layout, 
  Clock, 
  ShieldCheck, 
  X,
  ChevronRight,
  MapPin,
  Loader2
} from 'lucide-react';
import { generateBioImages } from './services/imageGenerator';

// Expert Data
const EXPERT = {
  name: "Queren Almeida",
  role: "Especialista em Arquitetura e Interiores",
  bio: "A arquitetura é a arte de transformar projetos e sonhos em realidade.",
  subBio: "Dedicada a criar projetos que unem estética e funcionalidade com máxima excelência.",
  city: "Sorocaba/SP",
  whatsapp: "https://wa.me/5515981561818",
  instagram: "https://www.instagram.com/arq.queren_almeida/",
  heroImage: "https://i.imgur.com/5um4RuA.jpeg",
  bioImages: [
    "https://i.imgur.com/xU0VrLg.jpeg",
    "https://i.imgur.com/GKdvhAg.jpeg"
  ],
  results: [
    "https://i.imgur.com/ffzlbFJ.jpeg",
    "https://i.imgur.com/K79nffq.jpeg",
    "https://i.imgur.com/9MHp9EO.jpeg",
    "https://i.imgur.com/PA8VHrI.jpeg",
    "https://i.imgur.com/65JMJVJ.jpeg",
    "https://i.imgur.com/rXdU28i.jpeg",
    "https://i.imgur.com/eUHt6BJ.jpeg",
    "https://i.imgur.com/bhz8Kwb.jpeg",
    "https://i.imgur.com/VBIhyfQ.jpeg",
    "https://i.imgur.com/uCHHOVw.jpeg",
    "https://i.imgur.com/m0X4l9x.jpeg",
    "https://i.imgur.com/K9TXlbx.jpeg",
    "https://i.imgur.com/srpNVOH.jpeg",
    "https://i.imgur.com/XKplrbS.jpeg"
  ]
};

const FEATURES = [
  {
    icon: <Layout className="w-6 h-6 text-terracotta-600" />,
    title: "Projetos Personalizados",
    description: "Cada detalhe é pensado para refletir sua personalidade e necessidades reais."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-terracotta-600" />,
    title: "Segurança Técnica",
    description: "Conhecimento técnico e prático para garantir a viabilidade do seu sonho."
  },
  {
    icon: <Clock className="w-6 h-6 text-terracotta-600" />,
    title: "Atendimento Direto",
    description: "Sem intermediários. Você fala diretamente comigo para alinhar cada etapa."
  },
  {
    icon: <Star className="w-6 h-6 text-terracotta-600" />,
    title: "Foco no Resultado",
    description: "Comprometimento total com a entrega de um projeto que supere expectativas."
  }
];

const STEPS = [
  {
    number: "01",
    title: "WhatsApp",
    description: "Clique no botão e me envie uma mensagem agora mesmo."
  },
  {
    number: "02",
    title: "Agendamento",
    description: "Escolhemos o melhor horário para você solicitar o seu orçamento gratuito."
  },
  {
    number: "03",
    title: "Orçamento",
    description: "Analisamos seu sonho e traçamos o melhor caminho para realizá-lo."
  }
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bioImages, setBioImages] = useState<string[]>(EXPERT.bioImages);
  const [loadingImages, setLoadingImages] = useState(true);

  // Load AI generated images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const generated = await generateBioImages();
        if (generated && generated.length === 2 && generated[0] && generated[1]) {
          setBioImages(generated);
        }
      } catch (error) {
        console.error("Error generating AI images:", error);
      } finally {
        setLoadingImages(false);
      }
    };
    loadImages();
  }, []);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const WhatsAppButton = ({ className = "", text = "Comece o seu projeto" }) => (
    <a 
      href={EXPERT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-button flex items-center justify-center gap-2 bg-beige-200 hover:bg-beige-300 text-terracotta-800 font-bold py-4 px-6 rounded-full shadow-lg shadow-terracotta-100/20 transition-all ${className}`}
    >
      <MessageCircle className="w-6 h-6" />
      <span>{text}</span>
    </a>
  );

  return (
    <div className="min-h-screen font-sans bg-beige-50 text-terracotta-900">
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden bg-terracotta-500">
        <div className="absolute inset-0 z-0">
          <img 
            src={EXPERT.heroImage} 
            alt={EXPERT.name}
            className="w-full h-full object-cover object-center opacity-80 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta-600 via-terracotta-600/40 to-transparent" />
        </div>

        <div className="relative z-10 px-6 pb-12 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 backdrop-blur-sm">
              PREMIUM ARCHITECTURE
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-white leading-[1.1] mb-6">
              Eu sou <span className="text-terracotta-100 italic">{EXPERT.name}</span>, transformando sonhos em realidade.
            </h1>
            <p className="text-lg md:text-xl text-terracotta-50 mb-8 max-w-xl leading-relaxed">
              Especialista em criar espaços que refletem sua essência e otimizam sua rotina.
            </p>
            
            <div className="flex flex-col gap-3">
              <WhatsAppButton className="shadow-none" />
              <p className="text-terracotta-100/80 text-sm flex items-center justify-center md:justify-start gap-2">
                <Clock className="w-4 h-4" /> Resposta rápida • Sem compromisso
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO AM I SECTION */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-terracotta-100">
                <img 
                  src={EXPERT.bioImages[0]} 
                  alt="Queren Almeida em ação" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display text-terracotta-700 mb-6">Quem sou eu</h2>
              <p className="text-lg text-terracotta-900 mb-6 leading-relaxed">
                Olá! Sou a <span className="font-semibold text-terracotta-500">{EXPERT.name}</span>. Minha jornada na arquitetura é movida pela paixão em criar espaços que não apenas abrigam, mas inspiram vidas.
              </p>
              <p className="text-terracotta-700 mb-8 leading-relaxed">
                {EXPERT.subBio} Acredito que cada projeto é uma oportunidade única de materializar o que você sempre imaginou para o seu lar ou negócio.
              </p>

              <ul className="space-y-4">
                {[
                  "Atendimento humanizado e focado em você",
                  "Projetos modernos e funcionais",
                  "Acompanhamento próximo de cada detalhe",
                  "Compromisso com prazos e qualidade"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-terracotta-500 shrink-0" />
                    <span className="text-terracotta-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESULTS GALLERY */}
      <section id="results" className="py-20 bg-terracotta-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 text-terracotta-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
              <span>Residenciais</span>
              <span className="w-1 h-1 bg-terracotta-300 rounded-full" />
              <span>Corporativos</span>
              <span className="w-1 h-1 bg-terracotta-300 rounded-full" />
              <span>Comerciais</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-terracotta-800 mb-6 tracking-tight">Projetos</h2>
            <p className="text-terracotta-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Cada projeto é cuidadosamente desenvolvido para refletir o estilo e a rotina de cada cliente; Sempre equilibrando funcionalidade, personalidade e estética.
            </p>
          </div>
        </div>

        <div className="gallery-container">
          <div className="animate-marquee">
            {[...EXPERT.results, ...EXPERT.results].map((img, index) => (
              <div
                key={index}
                className="relative w-[280px] md:w-[400px] aspect-[4/3] mx-2 rounded-2xl overflow-hidden cursor-pointer group shrink-0 shadow-xl border border-terracotta-100"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Resultado ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-terracotta-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Layout className="text-white w-10 h-10" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 flex justify-center">
          <WhatsAppButton className="w-full max-w-md" />
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-8">
          <p className="text-center text-terracotta-400 text-xs italic">
            *Resultados podem variar de pessoa para pessoa e de acordo com as especificidades de cada projeto.
          </p>
        </div>
      </section>

      {/* WHY TRUST ME */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-terracotta-700 mb-4">Por que confiar em mim?</h2>
            <p className="text-terracotta-600">Diferenciais que garantem a melhor experiência para você.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-terracotta-50/30 border border-terracotta-100 hover:border-terracotta-300 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-terracotta-100 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-terracotta-800 mb-3">{feature.title}</h3>
                <p className="text-terracotta-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERMEDIATE CTA */}
      <section className="py-16 px-6 bg-terracotta-500 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Pronto para dar o primeiro passo?</h2>
          <p className="text-lg text-terracotta-50 mb-10">
            Solicite o seu orçamento de forma totalmente gratuita e sem compromisso. Vamos conversar sobre o seu projeto?
          </p>
          <WhatsAppButton className="shadow-none" text="Falar com Queren no WhatsApp" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-terracotta-700 mb-4">Como solicitar o seu orçamento</h2>
            <p className="text-terracotta-600">Simples, direto e sem burocracia.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-terracotta-50 border border-terracotta-100">
                <span className="text-5xl font-black text-terracotta-100 absolute top-4 right-6 select-none">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-terracotta-800 mb-4 relative z-10">{step.title}</h3>
                <p className="text-terracotta-600 relative z-10">{step.description}</p>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-terracotta-200 w-8 h-8" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-terracotta-500 font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Orçamento gratuito e sem compromisso.
            </p>
          </div>
        </div>
      </section>

      {/* MORE PROOFS (EXPERT + BASTIDORES) */}
      <section className="py-20 px-6 bg-terracotta-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-terracotta-700 mb-4">Bastidores & Atendimento</h2>
            <p className="text-terracotta-600">Um olhar por trás das câmeras e do processo criativo.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-terracotta-100 bg-terracotta-100/20"
            >
              {loadingImages ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-terracotta-400 animate-spin" />
                </div>
              ) : (
                <img 
                  src={bioImages[0]} 
                  alt="Processo criativo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium">Atendimento personalizado</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-terracotta-100 bg-terracotta-100/20"
            >
              {loadingImages ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-terracotta-400 animate-spin" />
                </div>
              ) : (
                <img 
                  src={bioImages[1]} 
                  alt="Foco nos detalhes" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium">Foco nos detalhes</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-terracotta-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
              Não deixe seu sonho esperando. <br />
              <span className="text-terracotta-100 italic">Vamos projetar o seu futuro hoje?</span>
            </h2>
            <p className="text-xl text-terracotta-50 mb-12 max-w-2xl mx-auto">
              Clique no botão abaixo e solicite o seu orçamento gratuito. Estou pronta para te ouvir.
            </p>
            <WhatsAppButton className="w-full sm:w-auto px-12 py-5 text-xl shadow-none" />
            <p className="mt-6 text-terracotta-100/80 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Atendimento seguro e profissional
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-white border-t border-terracotta-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-terracotta-700">{EXPERT.name}</h3>
            <p className="text-terracotta-500 text-sm mb-2">{EXPERT.role}</p>
            <p className="text-terracotta-400 text-xs flex items-center justify-center md:justify-start gap-1">
              <MapPin className="w-3 h-3" /> {EXPERT.city}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={EXPERT.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-terracotta-50 border border-terracotta-100 flex items-center justify-center text-terracotta-600 hover:bg-terracotta-100 hover:text-terracotta-700 transition-all shadow-sm"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href={EXPERT.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-terracotta-50 border border-terracotta-100 flex items-center justify-center text-terracotta-600 hover:bg-green-50 hover:text-green-600 transition-all shadow-sm"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-terracotta-100 text-center text-terracotta-300 text-xs">
          <p>© {new Date().getFullYear()} {EXPERT.name}. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-terracotta-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Visualização ampliada"
              className="max-w-full max-h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
