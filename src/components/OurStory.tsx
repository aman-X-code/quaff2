import { motion } from "motion/react";

const beerPourImg = "https://res.cloudinary.com/dave3np5n/image/upload/v1773117272/IMG_1002_2_q7uepn.jpg";

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
            Quaff Brewing Co. started with a simple dream — to bring world-class
            craft brewery experience to Gurgaon. With locations in DLF Cyber Hub
            and Eros City Square, every batch is brewed on-site with hand-selected
            ingredients, from malty ambers to bold hoppy IPAs.
          </p>
          <p className="section-subtext mb-8">
            Our space is designed to feel alive — warm lighting, curated
            interiors, and vibrant energy where every evening is an experience.
            This isn't just a bar. It's where Gurgaon comes to celebrate.
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
