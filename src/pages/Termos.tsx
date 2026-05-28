import { motion } from "framer-motion";

const TermosPage = () => {
  return (
    <main className="flex-1">
      <section className="pt-24 md:pt-32 pb-12 bg-section-beige">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              Termos de Uso
            </h1>
            <p className="text-muted-foreground text-lg">
              Última atualização: maio de 2025
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto prose prose-gray"
          >
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground mb-4">
              Ao utilizar o MandaUmZap, você concorda com os presentes Termos de Uso. Caso não concorde com qualquer parte destes termos, não utilize nossos serviços.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Descrição do Serviço</h2>
            <p className="text-muted-foreground mb-4">
              O MandaUmZap é uma plataforma SaaS de agentes de inteligência artificial que operam pelo WhatsApp, destinada a prestadores de serviços. Os agentes automatizam atendimento, orçamentos, agendamentos, controle financeiro e divulgação.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Planos e Preços</h2>
            <p className="text-muted-foreground mb-4">
              O serviço é cobrado por agente ativo, no valor de R$ 29,00 por agente por mês. Não há taxa de setup nem fidelidade. O usuário pode cancelar a qualquer momento, sem multa ou justificativa.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Responsabilidades do Usuário</h2>
            <p className="text-muted-foreground mb-4">
              O usuário é responsável pelas informações fornecidas ao configurar seus agentes, bem como pelo uso adequado dos serviços em conformidade com as políticas do WhatsApp Business e a legislação brasileira vigente.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Limitações de Responsabilidade</h2>
            <p className="text-muted-foreground mb-4">
              O MandaUmZap não se responsabiliza por falhas nas redes de telecomunicações, indisponibilidade da plataforma WhatsApp ou por decisões de negócio tomadas com base nas informações geradas pelos agentes.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Cancelamento</h2>
            <p className="text-muted-foreground mb-4">
              O cancelamento pode ser solicitado a qualquer momento via WhatsApp ou painel de controle. O acesso é mantido até o final do período já pago. Não há reembolso proporcional de períodos não utilizados.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Alterações nos Termos</h2>
            <p className="text-muted-foreground mb-4">
              Reservamo-nos o direito de alterar estes termos a qualquer momento. Notificaremos os usuários ativos com antecedência mínima de 15 dias antes de mudanças que afetem os serviços contratados.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Contato</h2>
            <p className="text-muted-foreground mb-4">
              Em caso de dúvidas sobre estes termos, entre em contato pelo WhatsApp ou pelo e-mail suporte@mandaumzap.com.br.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default TermosPage;
