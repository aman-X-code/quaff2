import { motion } from "motion/react";
import breweryImg from "@/assets/brewery.jpg";

const stats = [
  { value: "6", label: "Signature Brews" },
  { value: "500L", label: "Brewed Weekly" },
  { value: "2019", label: "Est. Year" },
  { value: "100%", label: "Crafted In-House" },
];

const BrewerySection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <img
        src={breweryImg}
        alt="Brewery copper tanks"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width={800}
        height={800}
        style={{ filter: "saturate(0.5) brightness(0.3)" }}
      />

      {/* Fades */}
      <div
        className="absolute top-0 left-0 right-0 h-[200px]"
        style={{ background: "linear-gradient(to bottom, hsl(20 10% 5%), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px]"
        style={{ background: "linear-gradient(to top, hsl(20 10% 5%), transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-3xl p-10 md:p-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="font-heading italic text-4xl md:text-5xl text-foreground">
                  {stat.value}
                </div>
                <div className="section-subtext text-xs mt-2 mx-auto">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrewerySection;
