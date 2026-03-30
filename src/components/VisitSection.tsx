import { motion } from "motion/react";
import { MapPin, Clock, Phone, Instagram } from "lucide-react";

const VisitSection = () => {
  return (
    <section id="visit" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-badge">Visit Us</span>
          <h2 className="font-heading italic text-5xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[0.85]">
            Your table
            <br />
            is waiting.
          </h2>
          <p className="section-subtext mx-auto mt-6 mb-12">
            Walk in or reserve ahead. Either way, the first sip is always the
            best.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="tel:+911234567890"
              className="liquid-glass-strong rounded-full px-8 py-3.5 text-sm font-body font-medium text-foreground hover:bg-foreground/5 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Call to Reserve
            </a>
            <a
              href="#"
              className="bg-primary text-primary-foreground rounded-full px-8 py-3.5 text-sm font-body font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Book Online
            </a>
          </div>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="liquid-glass rounded-2xl p-6 text-center"
          >
            <MapPin size={20} className="text-primary mx-auto mb-3" />
            <h4 className="font-heading italic text-lg text-foreground mb-1">
              Location
            </h4>
            <p className="font-body font-light text-foreground/50 text-sm">
              Hauz Khas Village
              <br />
              New Delhi, 110016
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="liquid-glass rounded-2xl p-6 text-center"
          >
            <Clock size={20} className="text-primary mx-auto mb-3" />
            <h4 className="font-heading italic text-lg text-foreground mb-1">
              Hours
            </h4>
            <p className="font-body font-light text-foreground/50 text-sm">
              Mon – Thu: 4 PM – 1 AM
              <br />
              Fri – Sun: 12 PM – 1 AM
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="liquid-glass rounded-2xl p-6 text-center"
          >
            <Instagram size={20} className="text-primary mx-auto mb-3" />
            <h4 className="font-heading italic text-lg text-foreground mb-1">
              Follow Us
            </h4>
            <p className="font-body font-light text-foreground/50 text-sm">
              @brewhausdelhi
              <br />
              #BrewHausDelhi
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisitSection;
