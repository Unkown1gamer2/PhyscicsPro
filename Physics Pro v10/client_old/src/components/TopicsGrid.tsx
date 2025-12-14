import { useLocation } from "wouter";

export function TopicsGrid() {
  const [location] = useLocation();
  
  const handleTopicClick = () => {
    if (location === "/") {
      // On landing page, scroll to top to encourage sign up
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const topics = [
    {
      id: "measurements-errors",
      title: "Measurements and Errors",
      description: "Units, prefixes, significant figures, uncertainties, and error analysis.",
      gradient: "from-slate-500 to-gray-500",
      icon: "w-8 h-8 border-2 border-white rounded-sm opacity-80"
    },
    {
      id: "particles-radiation",
      title: "Particles and Radiation",
      description: "Atomic structure, fundamental particles, radioactivity, and particle interactions.",
      gradient: "from-purple-500 to-pink-500",
      icon: "w-8 h-8 bg-white rounded-full opacity-80"
    },
    {
      id: "waves",
      title: "Waves",
      description: "Wave properties, interference, diffraction, and the electromagnetic spectrum.",
      gradient: "from-blue-500 to-cyan-500",
      icon: "w-8 h-2 bg-white rounded-full opacity-80"
    },
    {
      id: "mechanics-materials",
      title: "Mechanics and Materials",
      description: "Forces, motion, energy, moments, and the properties of materials.",
      gradient: "from-green-500 to-emerald-500",
      icon: "w-8 h-8 border-2 border-white rounded-full opacity-80"
    },
    {
      id: "electricity",
      title: "Electricity",
      description: "Current, voltage, resistance, series and parallel circuits, and electrical power.",
      gradient: "from-yellow-500 to-orange-500",
      icon: "w-8 h-8 bg-white rounded-sm opacity-80 transform rotate-45"
    },
    {
      id: "further-mechanics",
      title: "Further Mechanics",
      description: "Momentum, circular motion, and simple harmonic motion.",
      gradient: "from-red-500 to-pink-500",
      icon: "w-8 h-8 bg-white rounded-full opacity-80 animate-spin"
    },
    {
      id: "thermal-physics",
      title: "Thermal Physics",
      description: "Temperature, heat transfer, specific heat capacity, and kinetic theory of gases.",
      gradient: "from-orange-500 to-red-500",
      icon: "w-8 h-8 bg-white rounded-full opacity-80 animate-pulse"
    },
    {
      id: "fields",
      title: "Fields (Gravitational, Electric, Magnetic)",
      description: "Field concepts, gravitational fields, electric fields, magnetic fields, and electromagnetic induction.",
      gradient: "from-indigo-500 to-purple-500",
      icon: "w-8 h-8 border-4 border-white rounded-full opacity-80"
    },
    {
      id: "nuclear-physics",
      title: "Nuclear Physics",
      description: "Nuclear structure, radioactive decay, nuclear instability, and nuclear energy.",
      gradient: "from-emerald-500 to-teal-500",
      icon: "w-8 h-8 bg-white rounded-full opacity-80 animate-bounce"
    },
    {
      id: "astrophysics",
      title: "Astrophysics (optional)",
      description: "Telescopes, stellar classification, and cosmology.",
      gradient: "from-violet-500 to-purple-500",
      icon: "w-6 h-6 bg-white rounded-full opacity-80 shadow-lg"
    },
    {
      id: "medical-physics",
      title: "Medical Physics (optional)",
      description: "X-rays, ultrasound, PET scans, and other medical imaging techniques.",
      gradient: "from-rose-500 to-pink-500",
      icon: "w-8 h-6 bg-white rounded-lg opacity-80"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="topics-title">Physics Topics</h2>
          <p className="text-xl text-muted-foreground" data-testid="topics-description">
            Master all key areas of A-Level Physics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="glass-card rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              data-testid={`topic-${topic.id}`}
              onClick={handleTopicClick}
            >
              {/* topic image here */}
              <div className={`w-16 h-16 bg-gradient-to-br ${topic.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <div className={topic.icon} style={topic.id === 'further-mechanics' ? {animationDuration: '4s'} : {}}></div>
              </div>
              <h3 className="font-bold text-xl mb-2" data-testid={`topic-title-${topic.id}`}>
                {topic.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4" data-testid={`topic-description-${topic.id}`}>
                {topic.description}
              </p>
              
              {/* Quick Links (appear on hover) */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-card to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex gap-2 text-xs" data-testid={`quick-links-${topic.id}`}>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded">Notes</span>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded">Questions</span>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded">Videos</span>
                </div>
              </div>
              <div className="text-accent text-sm font-medium" data-testid={`topic-link-${topic.id}`}>
                open topic here →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
