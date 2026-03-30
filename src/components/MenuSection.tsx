import { motion } from "motion/react";
import foodImg from "@/assets/food-platter.jpg";
import cozyImg from "@/assets/cozy-interior.jpg";

const menuHighlights = [
  { name: "Smoked Chicken Sliders", price: "₹450", tag: "Best Seller" },
  { name: "Beer-Battered Fish & Chips", price: "₹520", tag: "" },
  { name: "Tandoori Lamb Chops", price: "₹680", tag: "Chef's Pick" },
  { name: "Truffle Fries", price: "₹320", tag: "" },
  { name: "BBQ Pulled Pork Nachos", price: "₹480", tag: "Pair with IPA" },
  { name: "Dark Chocolate Beer Brownie", price: "₹280", tag: "Sweet Finish" },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">The Kitchen</span>
          <h2 className="section-heading">
            Food that pairs
            <br />
            with every pour.
          </h2>
        </div>

        {/* Two column: food image + menu list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="liquid-glass rounded-2xl overflow-hidden">
              <img
                src={foodImg}
                alt="Gourmet bar food platter"
                className="w-full h-[350px] object-cover"
                loading="lazy"
                width={800}
                height={800}
              />
            </div>
            <div className="liquid-glass rounded-2xl overflow-hidden">
              <img
                src={cozyImg}
                alt="Cozy interior with craft beer"
                className="w-full h-[250px] object-cover"
                loading="lazy"
                width={800}
                height={800}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-heading italic text-2xl text-foreground mb-2">
              Highlights
            </h3>
            <p className="section-subtext mb-8">
              Our kitchen crafts bold flavors designed to complement our brews.
            </p>

            <div className="space-y-0">
              {menuHighlights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-5 border-b border-foreground/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-body font-medium text-foreground text-sm">
                      {item.name}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] font-body font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-body font-light text-foreground/50 text-sm">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs font-body text-foreground/30">
              Full menu available at the bar. Seasonal specials change weekly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
