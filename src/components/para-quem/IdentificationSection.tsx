import { X, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const painPoints = [
  {
    icon: "📱",
    title: "Demora pra responder",
    text: "Cliente chama no WhatsApp e você demora pra responder",
  },
  {
    icon: "⏰",
    title: "Preso no celular",
    text: "Você fica mais no celular do que produzindo",
  },
  {
    icon: "📋",
    title: "Orçamento lento",
    text: "Demora horas pra fazer um orçamento",
  },
  {
    icon: "💸",
    title: "Errou o preço",
    text: "Já errou preço e trabalhou no prejuízo",
  },
  {
    icon: "🗓️",
    title: "Esquece compromissos",
    text: "Esquece visita, retorno ou promessa feita ao cliente",
  },
  {
    icon: "📊",
    title: "Não sabe o lucro",
    text: "Não sabe exatamente quanto lucra em cada projeto",
  },
];

export function IdentificationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
     <section className="py-10 md:py-14">
      <div className="container">
         <div className="rounded-3xl bg-section-beige p-6 md:p-10 overflow-hidden">
           <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          {/* Lado esquerdo - Título */}
          <div className="md:w-1/3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4" />
              Identificação
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
              O MandaUmZap é pra você se...
            </h2>
            <p className="text-muted-foreground">
              Arraste para ver as situações →
            </p>
          </div>
          
          {/* Lado direito - Carrossel de dores */}
          <div className="md:w-2/3">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-3 touch-pan-y">
                {painPoints.map((pain, index) => (
                  <CarouselItem key={index} className="pl-3 basis-[85%] md:basis-[45%] lg:basis-[32%]">
                    <div 
                      className={`h-full p-5 rounded-2xl border-2 transition-all duration-300 ${
                        activeIndex === index 
                          ? 'bg-red-50 border-red-300 shadow-lg shadow-red-100' 
                          : 'bg-red-50/50 border-red-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{pain.icon}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <X className="w-4 h-4 text-red-500" />
                            <span className="font-semibold text-red-600 text-sm">
                              {pain.title}
                            </span>
                          </div>
                          <p className="text-foreground text-sm leading-relaxed">
                            {pain.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Indicadores de navegação */}
            <div className="flex justify-center md:justify-start gap-1.5 mt-4">
              {painPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'w-6 bg-red-500' 
                      : 'w-1.5 bg-red-200 hover:bg-red-300'
                  }`}
                />
              ))}
            </div>
          </div>
           </div>
           
           {/* Mensagem de identificação em destaque */}
           <div className="mt-10 text-center">
             <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground leading-snug">
               Se você se identificou, <span className="text-primary">o problema não é você.</span>
             </h3>
             <p className="mt-2 text-lg text-muted-foreground">
               É falta de ajuda no dia a dia.
             </p>
           </div>
        </div>
      </div>
    </section>
  );
}
