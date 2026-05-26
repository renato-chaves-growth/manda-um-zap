import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  UserPlus, 
  Smartphone,
  Rocket,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Zap,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: 1,
    title: "Escolha seu agente",
    description: "Entenda qual dificuldade você quer resolver primeiro. Atendimento? Orçamento? Agenda? Escolha e comece.",
    icon: MessageCircle,
    highlight: "A partir de R$29/mês",
  },
  {
    number: 2,
    title: "Faça seu cadastro",
    description: "Rápido e sem burocracia. Em menos de 2 minutos você já está pronto pra começar.",
    icon: UserPlus,
    highlight: "Simples e rápido",
  },
  {
    number: 3,
    title: "Conecte seu WhatsApp",
    description: "Tudo funciona pelo WhatsApp. Só precisamos de um número da sua prestação de serviços.",
    icon: Smartphone,
    highlight: "Sem instalar nada",
  },
  {
    number: 4,
    title: "Pronto! Está funcionando",
    description: "Agora você tem funcionários que não tiram férias, não descansam e cuidam da sua prestação de serviços 24h por dia.",
    icon: Rocket,
    highlight: "Automático",
  },
];

const benefits = [
  { icon: Clock, text: "24 horas por dia" },
  { icon: Shield, text: "Sem férias" },
  { icon: Zap, text: "Sem atraso" },
];

export function ExplainerAnimationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [activeStep, setActiveStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState(3000); // Default 3s, 2s after manual
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Total steps including completion overlay (step 5)
  const totalSteps = steps.length + 1; // 5 steps total

  // Auto-start when in view
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      setActiveStep(1);
      setIsAutoPlaying(true);
      setAutoPlayInterval(3000); // Reset to default interval
    }
  }, [isInView, hasStarted]);

  // Auto-advance with looping
  useEffect(() => {
    if (!isAutoPlaying || !hasStarted) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        // After step 5 (completion), loop back to step 1
        if (prev >= totalSteps) {
          return 1;
        }
        return prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, hasStarted, autoPlayInterval, totalSteps]);

  // Cleanup resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const goToStep = (step: number, manual = false) => {
    if (step >= 1 && step <= totalSteps) {
      if (manual) {
        setIsAutoPlaying(false);
        setAutoPlayInterval(2000); // Faster interval after manual interaction
        
        // Clear existing timer
        if (resumeTimerRef.current) {
          clearTimeout(resumeTimerRef.current);
        }
        
        // Resume auto-play after 4 seconds of no interaction
        resumeTimerRef.current = setTimeout(() => {
          setIsAutoPlaying(true);
        }, 4000);
      }
      setActiveStep(step);
    }
  };

  const nextStep = () => {
    const next = activeStep >= totalSteps ? 1 : activeStep + 1;
    goToStep(next, true);
  };
  const prevStep = () => {
    const prev = activeStep <= 1 ? totalSteps : activeStep - 1;
    goToStep(prev, true);
  };

  const progressPercentage = Math.min((activeStep / steps.length) * 100, 100);
  const isComplete = activeStep > steps.length - 1;

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#EEFAE5]/30"
    >
      <div className="container">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp/10 border border-whatsapp/20 mb-4">
            <Sparkles className="w-4 h-4 text-whatsapp" />
            <span className="text-sm font-medium text-whatsapp">Simples de começar</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-foreground mb-3">
            Comece em <span className="text-gradient font-semibold">4 passos simples</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-light">
            Sem complicação, sem instalação, sem burocracia
          </p>
        </motion.div>

        {/* Navigation Arrows - Always visible, above overlay */}
        <div className="flex justify-start gap-4 mb-8 relative z-30 max-w-5xl mx-auto">
          <button
            onClick={prevStep}
            className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white shadow-sm border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            aria-label="Etapa anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Step indicators - now includes step 5 */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index + 1, true)}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${index < activeStep 
                    ? 'bg-teal-600 scale-100' 
                    : 'bg-muted-foreground/20 scale-75 hover:scale-90 hover:bg-muted-foreground/40'
                  }
                `}
                aria-label={`Ir para etapa ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextStep}
            className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white shadow-sm border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
            aria-label="Próxima etapa"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto min-h-[420px] md:min-h-[380px] pt-4">

          {/* ═══════════════ DESKTOP TIMELINE ═══════════════ */}
          <div className="hidden md:block pt-2">
            {/* Progress Line Background */}
            <div className="absolute top-[70px] left-[12%] right-[12%] h-1 bg-teal-100 rounded-full" />
            
            {/* Animated Progress Line */}
            <motion.div 
              className="absolute top-[70px] left-[12%] h-1 bg-teal-600 rounded-full origin-left"
              style={{ width: "76%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progressPercentage / 100 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Steps Grid */}
            <motion.div 
              className="grid grid-cols-4 gap-6 relative"
              animate={{ opacity: isComplete ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {steps.map((step, index) => {
                const isActive = index < activeStep;
                const isCurrent = index === activeStep - 1;
                const Icon = step.icon;

                return (
                  <button
                    key={step.number}
                    onClick={() => goToStep(index + 1, true)}
                    className="relative flex flex-col items-center text-left cursor-pointer group"
                  >
                    {/* Step Circle */}
                    <motion.div
                      className="relative z-10 mb-6"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: isActive ? 1 : 0.9, 
                        opacity: isActive ? 1 : 0.5 
                      }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div
                        className={`
                          w-[100px] h-[100px] rounded-full flex items-center justify-center
                          transition-all duration-400 relative
                          ${isActive 
                            ? 'bg-teal-600 shadow-lg shadow-teal-600/20' 
                            : 'bg-teal-100 group-hover:bg-teal-200'
                          }
                        `}
                      >
                        <Icon 
                          className={`w-10 h-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-teal-600'}`} 
                          strokeWidth={1.5} 
                        />
                      </div>
                      
                      {/* Check badge */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-whatsapp rounded-full flex items-center justify-center shadow-md border-2 border-white"
                          >
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Subtle ring for current */}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-teal-400"
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: 1.15, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>

                    {/* Step Content */}
                    <motion.div
                      className="text-center px-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      {/* Highlight badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 bg-whatsapp/10 text-teal-700`}>
                        {step.highlight}
                      </div>
                      
                      <h3 className="font-semibold text-foreground text-base mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">
                        {step.description}
                      </p>
                    </motion.div>
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* ═══════════════ MOBILE TIMELINE ═══════════════ */}
          <motion.div 
            className="md:hidden"
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Vertical progress line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-100 rounded-full" />
            <motion.div 
              className="absolute left-6 top-0 w-0.5 bg-teal-600 rounded-full origin-top"
              initial={{ height: 0 }}
              animate={{ height: `${progressPercentage}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Steps */}
            <div className="space-y-8 relative pl-16">
              {steps.map((step, index) => {
                const isActive = index < activeStep;
                const isCurrent = index === activeStep - 1;
                const Icon = step.icon;

                return (
                  <motion.button
                    key={step.number}
                    onClick={() => goToStep(index + 1, true)}
                    className="relative text-left w-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isActive || index === 0 ? 1 : 0.5, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Step Circle */}
                    <div className="absolute -left-16 top-0">
                      <motion.div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          transition-all duration-400 relative
                          ${isActive 
                            ? 'bg-teal-600 shadow-lg shadow-teal-600/20' 
                            : 'bg-teal-100'
                          }
                        `}
                        animate={isCurrent ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon 
                          className={`w-6 h-6 ${isActive ? 'text-white' : 'text-teal-600'}`} 
                          strokeWidth={1.5} 
                        />
                      </motion.div>
                      
                      {/* Check badge */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -bottom-1 -right-1 w-5 h-5 bg-whatsapp rounded-full flex items-center justify-center shadow-md border-2 border-white"
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-2 bg-whatsapp/10 text-teal-700">
                        {step.highlight}
                      </div>
                      <h3 className="font-semibold text-foreground text-base mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ═══════════════ STEP 5: COMPLETION OVERLAY ═══════════════ */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                {/* Backdrop blur */}
                <div className="absolute inset-0 bg-[#EEFAE5]/90 backdrop-blur-sm rounded-3xl" />
                
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                  className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 md:py-12"
                >
                  <div className="text-center">
                    {/* Step 5 badge - subtle */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 mb-6"
                    >
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-xs font-medium text-teal-600">Passo 5 • Pronto!</span>
                    </motion.div>
                    
                    {/* Main headline */}
                    <motion.h3 
                      className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Agora é só <span className="text-gradient font-semibold">viver sua vida</span>.
                    </motion.h3>
                    
                    {/* Subheadline */}
                    <motion.p 
                      className="text-base md:text-lg text-muted-foreground mb-2 font-light max-w-md mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      Enquanto você descansa, sua prestação de serviços continua vendendo.
                    </motion.p>
                    
                    {/* Social proof */}
                    <motion.p 
                      className="text-sm text-teal-600 mb-6 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      +1.200 prestadores de serviço já descobriram isso.
                    </motion.p>

                    {/* Before/After comparison */}
                    <motion.div 
                      className="grid grid-cols-3 gap-3 mb-6 max-w-lg mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      {[
                        { icon: Clock, before: "Acordar às 6h", after: "Dormir tranquilo" },
                        { icon: Shield, before: "Perder cliente", after: "Atender todo mundo" },
                        { icon: Zap, before: "Responder manualmente", after: "Resposta em 3 segundos" },
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="bg-white rounded-xl p-3 border border-teal-100 shadow-sm"
                        >
                          <div className="flex items-center justify-center mb-2">
                            <item.icon className="w-5 h-5 text-teal-600" />
                          </div>
                          <p className="text-[10px] md:text-xs text-muted-foreground line-through mb-0.5">{item.before}</p>
                          <p className="text-xs md:text-sm font-medium text-foreground">{item.after}</p>
                        </div>
                      ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div 
                      className="flex flex-col sm:flex-row items-center justify-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <a 
                        href="https://wa.me/5500000000000?text=Olá! Quero contratar meu primeiro funcionário digital."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="lg" className="gap-2">
                          <MessageCircle className="w-5 h-5" />
                          Quero meu funcionário digital
                        </Button>
                      </a>
                      <Link to="/precos">
                        <Button size="lg" variant="outline" className="gap-2">
                          Ver planos
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </motion.div>

                    {/* Replay */}
                    <motion.button
                      onClick={() => {
                        setActiveStep(1);
                        setIsAutoPlaying(true);
                      }}
                      className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-teal-600 transition-colors group"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Ver os passos novamente
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
