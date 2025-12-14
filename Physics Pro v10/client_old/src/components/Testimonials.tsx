import { useState, useEffect } from "react";

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "A-Level Student",
      avatar: "https://pixabay.com/get/gddf256bcaed7f2b4b4590a374dd7e5a977c7913a68dff0626e18f09e7db9dc4cf41b3a54338350fc0e037a9ce7bba063880173451c4fdb69f32495cd09a73dcc_1280.jpg",
      quote: "The 3D demos made complex physics concepts finally click for me. Went from struggling with waves to acing my mocks!",
      improvement: "+2 grades"
    },
    {
      id: 2,
      name: "James K.",
      role: "A-Level Student", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      quote: "Multi Learn's adaptive questions helped me identify exactly where I was weak. The instant feedback saved hours of confusion.",
      improvement: "+3 grades"
    },
    {
      id: 3,
      name: "Emily R.",
      role: "A-Level Student",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
      quote: "The past papers section is incredible - having mark schemes and examiner reports made exam prep so much more effective.",
      improvement: "+2 grades"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="testimonials-title">Student Success Stories</h2>
          <p className="text-xl text-muted-foreground" data-testid="testimonials-description">
            Join thousands of students achieving their Physics goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card rounded-2xl p-8 space-y-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
              data-testid={`testimonial-${testimonial.id}`}
            >
              <div className="flex items-center space-x-4">
                {/* avatar here */}
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name} testimonial avatar`} 
                  className="w-16 h-16 rounded-full object-cover"
                  data-testid={`avatar-${testimonial.id}`}
                />
                <div>
                  <div className="font-semibold" data-testid={`name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`role-${testimonial.id}`}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic" data-testid={`quote-${testimonial.id}`}>
                "{testimonial.quote}"
              </blockquote>
              <div className="text-sm text-accent font-medium" data-testid={`improvement-${testimonial.id}`}>
                Average improvement: {testimonial.improvement}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center space-x-8 mt-16 opacity-60" data-testid="trust-badges">
          <div className="text-sm font-medium">Trusted by 10,000+ students</div>
          <div className="w-px h-6 bg-border"></div>
          <div className="text-sm font-medium">98% pass rate</div>
          <div className="w-px h-6 bg-border"></div>
          <div className="text-sm font-medium">Average +2.5 grade improvement</div>
        </div>
      </div>
    </section>
  );
}
