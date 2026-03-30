import { motion } from "motion/react";
import beerPourImg from "@/assets/beer-pour.jpg";

const OurStory = () => {
  return (
    <section id="our-story" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-2xl overflow-hidden"
        >
          <img
            src={beerPourImg}
            alt="Craft beer being poured from copper tap"
            className="w-full h-[500px] object-cover"
            loading="lazy"
            width={800}
            height={1024}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="section-badge">Our Story</span>
          <h2 className="section-heading">
            Born from a love
            <br />
            of great beer.
          </h2>
          <p className="section-subtext mb-6">
            BrewHaus started with a simple dream — to bring the craft brewery
            experience to the heart of Delhi. Every batch is brewed on-site with
            hand-selected ingredients, from malty ambers to hoppy IPAs.
          </p>
          <p className="section-subtext mb-8">
            Our space is designed to feel like your favorite corner of the
            world — exposed brick, warm lighting, and leather booths where
            conversations last longer than the pints. This isn't just a bar.
            It's home.
          </p>
          <a
            href="#brews"
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-body font-medium text-foreground inline-block hover:bg-foreground/5 transition-colors"
          >
            See What's on Tap →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
