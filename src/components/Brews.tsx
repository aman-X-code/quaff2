import { motion } from "motion/react";
import { Beer } from "lucide-react";

const beers = [
  {
    name: "Delhi Gold",
    style: "Golden Lager",
    abv: "4.8%",
    description:
      "Our flagship. Crisp, clean, and refreshingly light with a honey malt finish.",
  },
  {
    name: "Old Delhi Amber",
    style: "Amber Ale",
    abv: "5.4%",
    description:
      "Caramel maltiness meets subtle spice. A nod to the city's rich heritage.",
  },
  {
    name: "Haze District",
    style: "Hazy IPA",
    abv: "6.2%",
    description:
      "Juicy, tropical, and boldly hopped. For those who like it hazy.",
  },
  {
    name: "Midnight Stout",
    style: "Oatmeal Stout",
    abv: "5.8%",
    description:
      "Velvety dark with notes of chocolate and roasted coffee. A winter favorite.",
  },
  {
    name: "Chandni Wit",
    style: "Belgian Witbier",
    abv: "4.5%",
    description:
      "Light and citrusy with coriander and orange peel. Smooth as moonlight.",
  },
  {
    name: "Rebel Red",
    style: "Irish Red Ale",
    abv: "5.1%",
    description:
      "Toasty, balanced, and dangerously drinkable. Malt-forward with a dry finish.",
  },
];

const Brews = () => {
  return (
    <section id="brews" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="section-badge">On Tap</span>
        <h2 className="section-heading">
          Brewed here.
          <br />
          Poured fresh.
        </h2>
        <p className="section-subtext mx-auto">
          Six signature beers brewed in small batches right behind the bar.
          Seasonal specials rotate monthly.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beers.map((beer, i) => (
          <motion.div
            key={beer.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="liquid-glass rounded-2xl p-6 group hover:bg-foreground/[0.03] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading italic text-xl text-foreground">
                  {beer.name}
                </h3>
                <p className="text-xs font-body font-light text-primary mt-1">
                  {beer.style} · {beer.abv}
                </p>
              </div>
              <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
                <Beer size={18} className="text-primary" />
              </div>
            </div>
            <p className="section-subtext text-sm">{beer.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Brews;
