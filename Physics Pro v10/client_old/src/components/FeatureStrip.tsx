import { useLocation } from "wouter";

export function FeatureStrip() {
  const [location, setLocation] = useLocation();
  
  const handleFeatureClick = (featureId: string) => {
    if (featureId === "specification") {
      window.open("https://cdn.sanity.io/files/p28bar15/green/c84fb691cf808ff97ba17ffce6f458f837016dc9.pdf", "_blank");
    } else if (featureId === "datasheet") {
      window.open("https://filestore.aqa.org.uk/resources/physics/AQA-7408-SDB.PDF", "_blank");
    } else if (featureId === "papers") {
      setLocation("/past-papers");
    } else if (location === "/") {
      // On landing page, scroll to top to encourage sign up
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const features = [
    {
      id: "specification",
      title: "Specification",
      description: "Complete A-Level Physics specification",
      gradient: "from-indigo-500 to-blue-600",
      icon: <div className="w-7 h-7 border-2 border-white rounded opacity-80 flex items-center justify-center"><div className="w-3 h-3 bg-white rounded"></div></div>
    },
    {
      id: "datasheet", 
      title: "Data Sheet",
      description: "Essential formulas and constants",
      gradient: "from-teal-500 to-cyan-500",
      icon: <div className="flex flex-col space-y-1"><div className="w-5 h-0.5 bg-white rounded-full opacity-90"></div><div className="w-4 h-0.5 bg-white rounded-full opacity-70"></div><div className="w-6 h-0.5 bg-white rounded-full opacity-80"></div></div>
    },
    {
      id: "questions-topic",
      title: "Questions by Topic",
      description: "Organized practice questions",
      gradient: "from-violet-500 to-purple-500",
      icon: <div className="grid grid-cols-2 gap-1"><div className="w-2 h-2 bg-white rounded-full opacity-80"></div><div className="w-2 h-2 bg-white rounded-full opacity-60"></div><div className="w-2 h-2 bg-white rounded-full opacity-90"></div><div className="w-2 h-2 bg-white rounded-full opacity-70"></div></div>
    },
    {
      id: "papers",
      title: "Past Papers", 
      description: "Real exam questions with mark schemes",
      gradient: "from-green-500 to-teal-500",
      icon: <div className="w-7 h-7 border-2 border-white rounded opacity-80"></div>
    },
    {
      id: "tutorials",
      title: "Videos",
      description: "Expert explanations for every topic",
      gradient: "from-orange-500 to-red-500",
      icon: <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
    },
    {
      id: "multilearn",
      title: "Multi Learn",
      description: "Adaptive learning with instant feedback",
      gradient: "from-blue-500 to-purple-500",
      icon: <div className="w-7 h-7 bg-white rounded-lg animate-pulse"></div>
    },
    {
      id: "quicklearn",
      title: "Quick Learn",
      description: "Fast-paced revision sessions",
      gradient: "from-yellow-500 to-orange-400",
      icon: <div className="flex flex-col space-y-1"><div className="w-6 h-1 bg-white rounded-full opacity-90"></div><div className="w-4 h-1 bg-white rounded-full opacity-70"></div><div className="w-5 h-1 bg-white rounded-full opacity-80"></div></div>
    },
    {
      id: "questions",
      title: "Exam Questions",
      description: "Practice with targeted question sets",
      gradient: "from-purple-500 to-pink-500",
      icon: <div className="w-7 h-7 border-2 border-white rounded-full opacity-80 flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="glass-card p-6 rounded-2xl hover:transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              data-testid={`feature-${feature.id}`}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2" data-testid={`title-${feature.id}`}>
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`description-${feature.id}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
