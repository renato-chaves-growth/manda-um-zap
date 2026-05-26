import { motion } from "framer-motion";

interface Agent {
  id: string;
  shortName: string;
  avatar: string;
  color: string;
}

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgentId: string;
  onSelectAgent: (id: string) => void;
}

export function AgentSelector({ agents, selectedAgentId, onSelectAgent }: AgentSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {agents.map((agent) => {
        const isActive = agent.id === selectedAgentId;
        return (
          <motion.button
            key={agent.id}
            onClick={() => onSelectAgent(agent.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              isActive 
                ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50 opacity-60 hover:opacity-100'
            }`}
          >
            <img 
              src={agent.avatar} 
              alt={agent.shortName}
              className="w-full h-full object-cover object-top"
            />
            
            {isActive && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
