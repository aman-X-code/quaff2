import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "The best craft beer I've had in Delhi. The atmosphere is unbeatable — like stepping into a European pub with Indian soul.",
    name: "Priya Sharma",
    role: "Food Blogger",
  },
  {
    quote:
      "We come here every weekend. The Haze District IPA is addictive and the sliders are perfection. Our go-to spot.",
    name: "Arjun Mehta",
    role: "Regular",
  },
  {
    quote:
      "Hosted my birthday here. The staff went above and beyond, and everyone loved the beer flight. Truly special place.",
    name: "Neha Kapoor",
    role: "Event Host",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">Reviews</span>
          <h2 className="section-heading">
            What our guests
            <br />
            are saying.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="liquid-glass rounded-2xl p-8"
            >
              <p className="font-body font-light text-foreground/80 text-sm italic leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div>
                <p className="font-body font-medium text-foreground text-sm">
                  {t.name}
                </p>
                <p className="font-body font-light text-foreground/40 text-xs">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
