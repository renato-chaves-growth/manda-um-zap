import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

export function HeroSection() {
  return (
    <section className="pt-24 md:pt-32 pb-10 md:pb-14 relative overflow-hidden bg-section-beige hero-rounded-bottom">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/hero-watermark.webp')`,
          backgroundSize: '800px',
          backgroundRepeat: 'repeat',
          opacity: 0.1,
          filter: 'sepia(1) saturate(0.3) brightness(0.6)',
        }}
      />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            É para o prestador de serviço que quer
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
            Trabalhar mais na prestação de serviços
            <br />
            <span className="text-primary">e menos no celular</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Se você perde cliente, tempo ou dinheiro por causa de atendimento, orçamento ou organização,
            o <strong className="text-foreground">MandaUmZap</strong> foi feito exatamente pra você.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/como-funciona">
              <Button size="lg" className="gap-2 text-lg px-8">
                Ver como funciona
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                <MessageCircle className="w-5 h-5" />
                Tirar dúvidas
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
