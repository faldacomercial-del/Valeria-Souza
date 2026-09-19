import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Instagram,
  Facebook,
  Star,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Check,
  Copy,
  Share2,
  Heart,
  Award,
  ExternalLink,
  QrCode,
  X,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface Procedure {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  highlights: string[];
  popular?: boolean;
}

const PROCEDURES: Procedure[] = [
  {
    id: 'mega-brasileiro',
    name: 'Mega brasileiro',
    category: 'Extensão de Cílios',
    description: 'Fios ultrafinos confeccionados em fans artesanais para máxima densidade, maciez e um olhar irresistivelmente marcante sem pesar os fios naturais.',
    duration: '2h00',
    highlights: ['Densidade personalizada', 'Leveza absoluta', 'Durabilidade estendida'],
    popular: true,
  },
  {
    id: 'fio-a-fio',
    name: 'Fio a Fio Clássico Sofisticado',
    category: 'Extensão de Cílios',
    description: 'Aplicação minuciosa de um fio sintético premium sobre cada fio natural. Realça a curvatura e o comprimento com elegância e acabamento natural.',
    duration: '1h45',
    highlights: ['Efeito rímel perfeito', 'Ideal para o dia a dia', 'Aspecto 100% natural'],
  },
  {
    id: 'lash-lifting',
    name: 'Lash Lifting & Nutrição Profunda',
    category: 'Tratamento Natural',
    description: 'Tratamento que curva, alinha e pigmenta os seus próprios cílios naturais, incluindo blend de aminoácidos e queratina para fortalecimento.',
    duration: '1h15',
    highlights: ['Sem manutenção constante', 'Nutrição e brilho intenso', 'Efeito de 6 a 8 semanas'],
    popular: true,
  },
  {
    id: 'hibrido',
    name: 'Volume Híbrido / Kim Kardashian',
    category: 'Extensão de Cílios',
    description: 'Mescla refinada do clássico fio a fio com delicados leques de volume. Proporciona textura moderna com pontas desconectadas e visual exclusivo.',
    duration: '2h00',
    highlights: ['Efeito editorial', 'Textura e profundidade', 'Tendência internacional'],
  },
  {
    id: 'design-sobrancelhas',
    name: 'Design de Sobrancelhas Personalizado',
    category: 'Design do Olhar',
    description: 'Visagismo facial com mapeamento geométrico para harmonizar a moldura do seu rosto, valorizando a expressão e a simetria com máxima delicadeza.',
    duration: '45min',
    highlights: ['Mapeamento facial', 'Acabamento impecável', 'Opção com henna ou tintura'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Mariana Silveira',
    city: 'Lençóis Paulista - SP',
    rating: 5,
    text: 'A melhor extensionista da cidade e região sem sombra de dúvidas! Meus cílios duram mais de 30 dias impecáveis, nunca tive alergia e o ambiente é um encanto.',
    service: 'Mega brasileiro',
    date: 'Há 1 semana',
  },
  {
    name: 'Camila Fernandes',
    city: 'Lençóis Paulista - SP',
    rating: 5,
    text: 'Profissionalismo impecável! A Valéria tem uma mão tão suave que eu durmo durante todo o procedimento. O resultado supera qualquer expectativa!',
    service: 'Fio a Fio Clássico',
    date: 'Há 3 semanas',
  },
  {
    name: 'Beatriz Rezende',
    city: 'Região de Bauru/Lençóis',
    rating: 5,
    text: 'Já fiz cílios em vários lugares, mas o acabamento da Valéria é surreal. Ela analisa o formato do olho e indica o modelo perfeito. Recomendo de olhos fechados!',
    service: 'Volume Híbrido',
    date: 'Há 1 mês',
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Procedure | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sections = [
    { id: 'inicio', title: 'Início', subtitle: 'Studio Valéria Souza' },
    { id: 'links', title: 'Links Oficiais', subtitle: 'Redes e Contato' },
    { id: 'procedimentos', title: 'Procedimentos', subtitle: 'Menu de Serviços' },
    { id: 'avaliacoes', title: 'Depoimentos', subtitle: 'Google 5.0 ⭐' },
    { id: 'localizacao', title: 'Atendimento', subtitle: 'Endereço & Horários' },
  ];

  // Official URLs exactly as requested
  const WHATSAPP_URL = 'https://w.app/salao_valeria_souza';
  const INSTAGRAM_URL = 'https://www.instagram.com/studiovaleria_souza/';
  const FACEBOOK_URL = 'https://www.facebook.com/valeria.regina.souza.2025';
  const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=studio+valeria+souza+len%C3%A7ois+paulista&sca_esv=b9492bfdbc0b4a5b&sxsrf=APpeQnvRRFb2mxXjH-Qm1VwtFlewXD3nbg%3A1789830798235&ei=jqauau_xDbn75OUP1rOd0AU&biw=1164&bih=490&oq=studio+&gs_lp=Egxnd3Mtd2l6LXNlcnAiB3N0dWRpbyAqBAgAGCcyBBAjGCcyExAuGIAEGIoFGEMYsQMYxwEY0QMyEBAAGIAEGIoFGEMYsQMYgwEyDRAAGIAEGBQYhwIYsQMyCBAAGIAEGLQHMggQABiABBi0BzIKEAAYgAQYigUYQzIIEAAYgAQYtAcyBRAAGIAEMggQABiABBixA0i5JlAAWKkKcAB4AZABAJgBjQGgAfcGqgEDMC43uAEByAEA-AEBmAIHoAKhB8ICCxAuGIMBGLEDGIAEwgIREC4YgAQYsQMYgwEYxwEY0QPCAgUQLhiABMICCxAAGIAEGLEDGIMBwgIIEC4YgAQYsQPCAgsQLhiABBixAxiDAcICChAjGPAFGMkCGCfCAhMQLhiABBgUGIcCGLEDGMcBGNEDwgILEC4YsQMYgAQYtAfCAg0QABiABBiKBRhDGLEDmAMAkgcDMC43oAfsTrIHAzAuN7gHoQfCBwUwLjEuNsgHH4AIAQ&sclient=gws-wiz-serp#sv=CAESzQEKuQEStgEKd0FKaVQ0dElYcFhnNjJVOWxlb3Z1UWZWMVEyd1dCTDFrT3dZWGZXR2RjdEJuRndUZkxTMFQwTUptdlBMcXlyX0pNZHR3d1Z3SmJaNkZaV1lQZ005aU9LWWs1MDNSeWx0ZnZHa1BZRENUQTA0UVZNajFkTnYxLXo0EhdKYXF1YW95YkVwemMxc1FQNzR1R3dRbxoiQURzcjlmUkliTDdnQ0RmbHduZEFFNnNyX0VybFVFbnhWURIEODA1MRoBMyoAMAA4AUAAGAAgxYidfUoCEAE';
  const REMOTE_LOGO_URL = 'https://i.postimg.cc/Zq2VRNPS/Gemini-Generated-Image-vkahqdvkahqdvkah.jpg';
  const [logoSrc, setLogoSrc] = useState<string>('/logo.webp');

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // IntersectionObserver to detect active section with 0 layout thrashing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const getWhatsAppServiceLink = (serviceName: string) => {
    const message = encodeURIComponent(`Olá Valéria! Gostaria de agendar um horário para o procedimento de *${serviceName}* no Studio.`);
    return `https://api.whatsapp.com/send?phone=5514998492025&text=${message}`;
  };

  return (
    <div className="min-h-screen text-[#fce7f3] relative overflow-x-hidden selection:bg-[#f43f5e] selection:text-white">
      {/* Subtle luxury geometric grid texture (lightweight, no GPU blurs) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(244,63,94,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Floating Glass Navigation Bar */}
      <header className="fixed top-3 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-[#1b0d16]/85 backdrop-blur-xl border border-[#fb7185]/30 rounded-full px-3 py-1.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.7),0_0_15px_rgba(244,63,94,0.2)] flex items-center gap-1 sm:gap-2 max-w-md w-full justify-between">
          <div className="flex items-center gap-2 pl-2">
            <span className="w-2 h-2 rounded-full bg-[#f43f5e] animate-ping" />
            <span className="font-serif-luxury text-xs sm:text-sm font-semibold tracking-wider text-rose-200">
              VALÉRIA SOUZA
            </span>
          </div>

          {/* Quick section carousel dots / pills */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {sections.map((sec, idx) => (
              <button
                key={sec.id}
                id={`nav-pill-${sec.id}`}
                onClick={() => scrollToSection(idx)}
                title={sec.title}
                className={`relative px-2 sm:px-2.5 py-1 text-[11px] font-medium rounded-full transition-all duration-300 ${
                  activeSection === idx
                    ? 'text-white bg-gradient-to-r from-[#f43f5e] to-[#be123c] shadow-[0_0_10px_rgba(244,63,94,0.5)] scale-105'
                    : 'text-rose-300/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {/* Quick share button */}
          <button
            onClick={handleCopyLink}
            id="header-share-button"
            aria-label="Compartilhar página"
            className="p-1.5 rounded-full text-rose-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center relative"
            title="Copiar link do biosite"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Main Snap-Scroll Interactive Carousel Content */}
      <main ref={containerRef} className="relative z-10 max-w-xl mx-auto px-4 pt-16 pb-28 flex flex-col gap-12 sm:gap-16">
        
        {/* =========================================================================
            CARD 1: INÍCIO / APRESENTAÇÃO & BOAS-VINDAS
           ========================================================================= */}
        <section
          ref={(el) => { sectionRefs.current[0] = el; }}
          id="section-inicio"
          className="snap-start pt-6 sm:pt-10 flex flex-col items-center text-center transition-all duration-500"
        >
          {/* Top subtle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-950/80 via-black/70 to-rose-950/80 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.25)] text-rose-200 text-xs tracking-widest uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Studio de Extensão & Beleza do Olhar</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          </div>

          {/* LOGOMARCA OFICIAL CENTRALIZADA EM TAMANHO GRANDE */}
          <div className="relative mb-6 group">
            {/* Ambient 3D glow & circular frame */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#f43f5e] via-[#fb7185] to-[#fda4af] opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-300" />
            
            {/* Outer metallic rose-gold border */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-[3px] bg-gradient-to-b from-[#fecdd3] via-[#e11d48] to-[#4c0519] shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              {/* Inner container to frame image cleanly */}
              <div className="w-full h-full rounded-full overflow-hidden bg-[#180a13] flex items-center justify-center relative shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                <picture>
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img
                    src={logoSrc}
                    alt="Logomarca Oficial Studio Valéria Souza"
                    width={208}
                    height={208}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                    onError={() => {
                      // If local fails to resolve in certain deployment contexts, fall back to remote URL; and vice-versa
                      if (logoSrc !== REMOTE_LOGO_URL) {
                        setLogoSrc(REMOTE_LOGO_URL);
                      }
                    }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
                {/* 3D Glass reflection sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none rounded-full" />
              </div>
            </div>

            {/* Official Verified Artist Badge */}
            <div className="absolute bottom-1 right-2 bg-gradient-to-r from-[#e11d48] to-[#9f1239] text-white p-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-rose-300/40 flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
          </div>

          {/* Studio Name Heading */}
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold tracking-tight text-white mb-2 text-balance drop-shadow-[0_2px_10px_rgba(244,63,94,0.3)]">
            Studio Valéria Souza
          </h1>

          {/* FRASE DE IMPACTO 1 (Subtítulo / Boas-Vindas) */}
          <p className="text-base sm:text-lg text-rose-200/90 font-light max-w-md px-3 leading-relaxed mb-6 font-cormorant italic text-pretty">
            &ldquo;Transforme seu olhar e desperte sua melhor versão todos os dias.&rdquo;
          </p>

          {/* FRASE DE IMPACTO 2 (Slogan com Destaque Especial: "A melhor extensionista da cidade e região") */}
          <div className="w-full max-w-md luxury-slogan-card rounded-2xl p-5 sm:p-6 mb-7 relative overflow-hidden group">
            {/* Gleaming shine sweep */}
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-rose-300/20 to-transparent pointer-events-none animate-sheen" />

            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-300/80" />
              <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Reconhecimento & Excelência</span>
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              </div>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-300/80" />
            </div>

            {/* Slogan typography with glowing accents */}
            <div className="py-1">
              <p className="text-xl sm:text-2xl font-serif-luxury font-bold bg-gradient-to-r from-[#ffe4e6] via-[#f43f5e] to-[#fecdd3] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(244,63,94,0.4)]">
                &ldquo;A melhor extensionista da cidade e região&rdquo;
              </p>
            </div>

            <p className="text-xs text-rose-300/75 mt-2 font-medium">
              Especialista em visagismo do olhar, biossegurança rigorosa e alta retenção de fios.
            </p>

            {/* Trust Pill indicators */}
            <div className="mt-4 pt-3 border-t border-rose-500/20 flex items-center justify-around text-[11px] text-rose-200/80">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> +1.200 Olhares
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5.0 no Google
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> Materiais ANVISA
              </span>
            </div>
          </div>

          {/* BOTÃO PRINCIPAL 3D BRILHANTE DE WHATSAPP (CTA Principal) */}
          <div className="w-full max-w-md">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-principal-whatsapp"
              className="group relative w-full flex items-center justify-between px-6 py-4 rounded-2xl btn-3d-glossy-primary text-white font-semibold text-base sm:text-lg overflow-hidden"
            >
              {/* Top specular reflection line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)] text-white">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-wider text-rose-100 font-medium">
                    Atendimento Exclusivo
                  </span>
                  <span className="block text-base sm:text-lg font-bold text-white tracking-wide">
                    Agendar pelo WhatsApp
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <ChevronRight className="w-5 h-5 text-rose-100 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Glossy light sweep on hover */}
              <div className="absolute inset-0 w-1/3 bg-white/20 -skew-x-12 transform translate-x-[-150%] group-hover:translate-x-[400%] transition-transform duration-1000 pointer-events-none" />
            </a>
          </div>

          {/* Hint to scroll down carousel */}
          <button
            onClick={() => scrollToSection(1)}
            aria-label="Rolar para links oficiais"
            className="mt-6 flex flex-col items-center text-xs text-rose-400/80 hover:text-rose-200 transition-colors animate-bounce"
          >
            <span className="text-[11px] tracking-wider uppercase font-medium">Ver Links & Redes</span>
            <ChevronDown className="w-4 h-4 mt-0.5" />
          </button>
        </section>


        {/* =========================================================================
            CARD 2: LINKS OFICIAIS (COM ÍCONES 3D BRILHANTES & GLOSSY)
           ========================================================================= */}
        <section
          ref={(el) => { sectionRefs.current[1] = el; }}
          id="section-links"
          className="snap-start transition-all duration-500"
        >
          <div className="glass-card-3d rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#f43f5e]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium mb-2">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>Canais Oficiais Verificados</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Links & Redes Oficiais
              </h2>
              <p className="text-sm text-rose-200/70 mt-1 max-w-sm mx-auto">
                Toque nos botões 3D abaixo para entrar em contato, acompanhar o trabalho e conferir avaliações.
              </p>
            </div>

            {/* LISTA DOS 4 LINKS OFICIAIS COM ESTILO 3D BRILHANTE */}
            <div className="flex flex-col gap-4">
              
              {/* 1. WHATSAPP (BOTÃO PRINCIPAL DE AÇÃO / AGENDAMENTO) */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="link-oficial-whatsapp"
                className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl btn-3d-glossy-primary text-white overflow-hidden"
              >
                {/* 3D Sheen highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/70" />
                
                <div className="flex items-center gap-4">
                  {/* 3D Glossy WhatsApp Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-700 p-0.5 shadow-[0_6px_15px_rgba(16,185,129,0.4),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-7 h-7 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base sm:text-lg text-white group-hover:text-rose-100 transition-colors">
                        WhatsApp Oficial
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-black/40 text-emerald-300 border border-emerald-400/40 shadow-sm">
                        Agendamentos
                      </span>
                    </div>
                    <p className="text-xs text-rose-100/90 font-light mt-0.5">
                      Fale diretamente com Valéria Souza para dúvidas e reservas VIP
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all border border-white/30">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </a>

              {/* 2. INSTAGRAM */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="link-oficial-instagram"
                className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl btn-3d-glossy-secondary text-white overflow-hidden"
              >
                {/* 3D Sheen highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/40" />

                <div className="flex items-center gap-4">
                  {/* 3D Glossy Instagram Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-0.5 shadow-[0_6px_15px_rgba(221,42,123,0.4),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center shrink-0">
                    <Instagram className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base sm:text-lg text-white group-hover:text-pink-300 transition-colors">
                        Instagram
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-pink-950/60 text-pink-300 border border-pink-500/30">
                        @studiovaleria_souza
                      </span>
                    </div>
                    <p className="text-xs text-rose-200/70 font-light mt-0.5">
                      Fotos de antes e depois, stories diários, novidades e cuidados
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-pink-600/30 group-hover:scale-110 transition-all border border-pink-400/30">
                    <ExternalLink className="w-4 h-4 text-pink-200" />
                  </div>
                </div>
              </a>

              {/* 3. FACEBOOK */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="link-oficial-facebook"
                className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl btn-3d-glossy-secondary text-white overflow-hidden"
              >
                {/* 3D Sheen highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/40" />

                <div className="flex items-center gap-4">
                  {/* 3D Glossy Facebook Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] p-0.5 shadow-[0_6px_15px_rgba(37,99,235,0.4),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center shrink-0">
                    <Facebook className="w-7 h-7 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base sm:text-lg text-white group-hover:text-blue-300 transition-colors">
                        Facebook
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                        Valéria Regina Souza
                      </span>
                    </div>
                    <p className="text-xs text-rose-200/70 font-light mt-0.5">
                      Página oficial no Facebook com publicações e comunicados
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-600/30 group-hover:scale-110 transition-all border border-blue-400/30">
                    <ExternalLink className="w-4 h-4 text-blue-200" />
                  </div>
                </div>
              </a>

              {/* 4. AVALIAÇÕES NO GOOGLE */}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="link-oficial-google-reviews"
                className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl btn-3d-glossy-secondary text-white overflow-hidden"
              >
                {/* 3D Sheen highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/40" />

                <div className="flex items-center gap-4">
                  {/* 3D Glossy Google Rating Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ea4335] via-[#fbbc05] to-[#34a853] p-0.5 shadow-[0_6px_15px_rgba(251,188,5,0.35),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center shrink-0">
                    <div className="w-full h-full rounded-[14px] bg-[#1a0f17] flex items-center justify-center">
                      <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                        Avaliações no Google
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/40">
                        <span>5.0</span>
                        <Star className="w-2.5 h-2.5 fill-amber-300" />
                      </div>
                    </div>
                    <p className="text-xs text-rose-200/70 font-light mt-0.5">
                      Lençóis Paulista e região: veja opiniões reais de clientes
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-amber-600/30 group-hover:scale-110 transition-all border border-amber-400/30">
                    <ExternalLink className="w-4 h-4 text-amber-200" />
                  </div>
                </div>
              </a>
            </div>

            {/* Quick Share & QR Code Actions footer */}
            <div className="mt-6 pt-4 border-t border-rose-500/20 flex items-center justify-between">
              <button
                onClick={handleCopyLink}
                id="btn-copy-biosite"
                className="flex items-center gap-2 text-xs text-rose-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium">Link copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar link do Biosite</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                id="btn-open-qr-code"
                className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
              >
                <QrCode className="w-3.5 h-3.5 text-rose-400" />
                <span>QR Code do Studio</span>
              </button>
            </div>
          </div>
        </section>


        {/* =========================================================================
            CARD 3: PROCEDIMENTOS & ESPECIALIDADES
           ========================================================================= */}
        <section
          ref={(el) => { sectionRefs.current[2] = el; }}
          id="section-procedimentos"
          className="snap-start content-auto transition-all duration-500"
        >
          <div className="glass-card-3d rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium mb-2">
                <Eye className="w-3.5 h-3.5 text-rose-400" />
                <span>Menu de Procedimentos</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Especialidades do Studio
              </h2>
              <p className="text-sm text-rose-200/70 mt-1 max-w-sm mx-auto">
                Técnicas personalizadas para realçar sua beleza natural com biossegurança e fios de alta qualidade.
              </p>
            </div>

            {/* Procedures Cards List */}
            <div className="flex flex-col gap-3.5">
              {PROCEDURES.map((proc) => {
                const isSelected = selectedService?.id === proc.id;
                return (
                  <div
                    key={proc.id}
                    id={`proc-card-${proc.id}`}
                    onClick={() => setSelectedService(isSelected ? null : proc)}
                    className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'bg-gradient-to-br from-rose-950/70 to-black/90 border-rose-400/60 shadow-[0_10px_25px_-5px_rgba(244,63,94,0.3)]'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] border-rose-500/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-base sm:text-lg text-white font-serif-luxury">
                            {proc.name}
                          </h3>
                          {proc.popular && (
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                              Destaque
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-rose-200/80 leading-relaxed line-clamp-2">
                          {proc.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[11px] text-rose-300/80 flex items-center gap-1 font-medium bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-500/20">
                          <Clock className="w-3 h-3 text-rose-400" /> {proc.duration}
                        </span>
                        <span className="text-xs text-rose-400 font-semibold mt-1">
                          {isSelected ? 'Ocultar detalhes' : 'Ver detalhes'}
                        </span>
                      </div>
                    </div>

                    {/* Expandable details when tapped */}
                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-rose-500/20 animate-fadeIn">
                        <p className="text-xs text-rose-100/90 leading-relaxed mb-3">
                          {proc.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proc.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-[11px] text-rose-200"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-rose-400" />
                              {h}
                            </span>
                          ))}
                        </div>

                        <a
                          href={getWhatsAppServiceLink(proc.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`btn-book-${proc.id}`}
                          className="w-full py-2.5 px-4 rounded-xl btn-3d-glossy-primary flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-bold shadow-md"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>Agendar {proc.name} via WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom consult prompt */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-black/40 to-rose-950/40 border border-rose-500/25 flex items-center justify-between gap-3">
              <div className="text-left">
                <p className="text-xs font-semibold text-rose-200">
                  Dúvida sobre qual técnica combina com seu olhar?
                </p>
                <p className="text-[11px] text-rose-300/70">
                  A Valéria realiza avaliação visagista personalizada antes da aplicação.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-xs text-rose-100 font-medium transition-colors"
              >
                Tirar Dúvida
              </a>
            </div>
          </div>
        </section>


        {/* =========================================================================
            CARD 4: AVALIAÇÕES GOOGLE & DEPOIMENTOS
           ========================================================================= */}
        <section
          ref={(el) => { sectionRefs.current[3] = el; }}
          id="section-avaliacoes"
          className="snap-start content-auto transition-all duration-500"
        >
          <div className="glass-card-3d rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            {/* Header with Google Stars */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Avaliações Reais no Google</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                O que dizem nossas clientes
              </h2>
              
              {/* Rating score badge */}
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-lg font-bold text-white">5.0</span>
                <span className="text-xs text-rose-300/70">(Lençóis Paulista e região)</span>
              </div>
            </div>

            {/* Testimonials grid */}
            <div className="flex flex-col gap-4">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-4 sm:p-5 bg-black/40 border border-rose-500/20 relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-rose-100">{t.name}</h4>
                      <p className="text-[11px] text-rose-300/60">{t.city} • {t.service}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-100/90 font-light italic leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Direct button to Google Reviews */}
            <div className="mt-6">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-ver-todas-avaliacoes-google"
                className="w-full p-3.5 rounded-xl btn-3d-glossy-secondary flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-rose-100 hover:text-white"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Ver todas as avaliações no Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 text-rose-300" />
              </a>
            </div>
          </div>
        </section>


        {/* =========================================================================
            CARD 5: ATENDIMENTO, LOCALIZAÇÃO & AGENDAMENTO
           ========================================================================= */}
        <section
          ref={(el) => { sectionRefs.current[4] = el; }}
          id="section-localizacao"
          className="snap-start content-auto transition-all duration-500"
        >
          <div className="glass-card-3d rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium mb-2">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span>Espaço Aconchegante</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Venha nos Conhecer
              </h2>
              <p className="text-sm text-rose-200/70 mt-1 max-w-sm mx-auto">
                Ambiente climatizado, biossegurança rigorosa e atendimento com hora marcada para seu conforto total.
              </p>
            </div>

            {/* Studio amenities & Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Localização</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Lençóis Paulista - SP</p>
                  <p className="text-[11px] text-rose-300/60">Atendendo clientes de toda a região</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Horário de Atendimento</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Terça a Sábado</p>
                  <p className="text-[11px] text-rose-300/60">08h00 às 19h00 (Sob agendamento)</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Biossegurança 100%</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Materiais descartáveis e esterilizados</p>
                  <p className="text-[11px] text-rose-300/60">Adesivos hipoalergênicos testados</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
                  <Heart className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Conforto VIP</h4>
                  <p className="text-xs text-rose-200/80 mt-0.5">Maca ergonômica e relaxante</p>
                  <p className="text-[11px] text-rose-300/60">Música ambiente e aromaterapia</p>
                </div>
              </div>
            </div>

            {/* Final Big Booking Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/80 via-black to-rose-950/90 border border-rose-500/40 text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
                  Pronta para despertar seu melhor olhar?
                </h3>
                <p className="text-xs text-rose-200/80 max-w-sm mx-auto mb-5">
                  Garanta seu horário com a melhor extensionista da cidade e região. Vagas limitadas por dia.
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="final-booking-whatsapp"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl btn-3d-glossy-primary text-white font-bold text-sm sm:text-base w-full sm:w-auto shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Agendar meu Horário no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-rose-300/60 pt-4 pb-12 flex flex-col items-center gap-2">
          <p className="font-serif-luxury text-rose-200 text-sm font-semibold">
            Studio Valéria Souza
          </p>
          <p className="text-[11px]">
            &ldquo;Transforme seu olhar e desperte sua melhor versão todos os dias.&rdquo;
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-200 transition-colors">
              Instagram
            </a>
            <span>•</span>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-200 transition-colors">
              Facebook
            </a>
            <span>•</span>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-200 transition-colors">
              WhatsApp
            </a>
            <span>•</span>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-rose-200 transition-colors">
              Google
            </a>
          </div>
          <p className="text-[10px] text-rose-400/40 mt-3">
            © {new Date().getFullYear()} Studio Valéria Souza • Todos os direitos reservados.
          </p>
        </footer>
      </main>

      {/* Persistent Floating 3D WhatsApp Button for Mobile Conversion */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          aria-label="Agendar horário no WhatsApp"
          className="group relative flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs sm:text-sm shadow-[0_10px_25px_rgba(16,185,129,0.5),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {/* Ambient ping effect */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-white"></span>
          </span>

          <div className="w-6 h-6 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 fill-white text-white" />
          </div>
          <span className="hidden sm:inline font-semibold">Agendar Horário</span>
        </a>
      </div>

      {/* QR Code Modal for Easy Sharing / In-Person Scanning */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1c0c16] border border-rose-500/40 rounded-3xl p-6 max-w-sm w-full relative text-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-rose-400 shadow-md">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src={logoSrc}
                  alt="Valéria Souza"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={() => {
                    if (logoSrc !== REMOTE_LOGO_URL) {
                      setLogoSrc(REMOTE_LOGO_URL);
                    }
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            <h3 className="font-serif-luxury text-xl font-bold text-white mb-1">
              Studio Valéria Souza
            </h3>
            <p className="text-xs text-rose-200/70 mb-5">
              Aponte a câmera do celular para abrir o biosite oficial
            </p>

            {/* Generated QR Code Preview */}
            <div className="bg-white p-4 rounded-2xl inline-block mb-4 shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code Studio Valéria Souza"
                className="w-44 h-44 mx-auto"
              />
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 rounded-xl btn-3d-glossy-primary text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link do Biosite'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
