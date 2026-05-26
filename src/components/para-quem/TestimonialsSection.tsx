import { Star, Users } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Eu perdia cliente porque demorava pra responder. Hoje respondo na hora, mesmo trabalhando.",
    author: "Carlos",
    city: "SP",
    highlight: "respondo na hora",
  },
  {
    quote: "Nunca soube quanto lucrava em cada projeto. Agora sei exatamente.",
    author: "André",
    city: "MG",
    highlight: "sei exatamente",
  },
  {
    quote: "O WhatsApp virou meu aliado, não meu problema.",
    author: "Roberto",
    city: "PR",
    highlight: "meu aliado",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Layout horizontal */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado esquerdo - Header */}
            <div className="lg:w-1/4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Prova social</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                prestadores de serviço comuns.{" "}
                <span className="text-primary">Resultados reais.</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span>4.9 • 847 avaliações</span>
              </div>
            </div>
            
            {/* Lado direito - Testimonials em linha */}
            <div className="lg:w-3/4 grid sm:grid-cols-3 gap-3">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-xl bg-background border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-foreground text-sm leading-relaxed mb-3">
                    "{testimonial.quote.split(testimonial.highlight)[0]}
                    <strong className="text-primary">{testimonial.highlight}</strong>
                    {testimonial.quote.split(testimonial.highlight)[1]}"
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
