import { motion } from "motion/react";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
  {
    name: "Quaff Eros City Square",
    area: "Eros City Square Mall, Sector 49",
    city: "Gurugram, Haryana",
    phone: "7059800007",
    display: "+91 70598 00007",
    hours: "Mon – Thu: 12 PM – 1 AM\nFri – Sun: 12 PM – 1 AM",
    mapsUrl: "https://maps.google.com/?q=Quaff+Eros+City+Square+Gurugram",
  },
  {
    name: "Quaff Cyber Hub",
    area: "DLF Cyber Hub, DLF Phase 2",
    city: "Gurugram, Haryana",
    phone: "9654659050",
    display: "+91 96546 59050",
    hours: "Mon – Thu: 12 PM – 1 AM\nFri – Sun: 12 PM – 1 AM",
    mapsUrl: "https://maps.google.com/?q=Quaff+Cyber+Hub+Gurugram",
  },
];

const VisitSection = () => {
  return (
    <section id="visit" className="py-24 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-7">
            <span
              className="text-[10px] tracking-[0.28em] uppercase font-semibold"
              style={{ color: "#C8902A" }}
            >
              Visit Us
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: "rgba(200,144,42,0.3)" }} />
          </div>
          <h2
            className="font-heading italic tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "hsl(40,20%,95%)" }}
          >
            Your table
            <br />
            <span style={{ color: "hsl(40,20%,68%)" }}>is waiting.</span>
          </h2>
          <p
            className="mt-6 text-sm font-light leading-relaxed max-w-sm"
            style={{ color: "hsl(40,14%,50%)", fontFamily: "var(--font-body)" }}
          >
            Walk in or call ahead. Two taprooms, one obsession.
          </p>
        </motion.div>

        {/* Platform booking CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          {[
            { label: "Reserve on Zomato", href: "https://www.zomato.com/ncr/quaff-brewing-co-dlf-cyber-city-gurgaon", color: "#E23744" },
            { label: "Book on Swiggy Dineout", href: "https://www.swiggy.com/restaurants/quaff-brewing-co-dlf-cyber-city-gurgaon-1108301/dineout", color: "#FC8019" },
          ].map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:opacity-85 active:scale-95"
              style={{
                border: `1px solid ${p.color}55`,
                color: p.color,
                background: `${p.color}15`,
                fontFamily: "var(--font-body)",
              }}
            >
              {p.label}
              <span style={{ opacity: 0.6, fontSize: 11 }}>↗</span>
            </a>
          ))}
        </motion.div>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
              }}
              whileHover={{
                borderColor: "rgba(200,144,42,0.3)",
                background: "rgba(255,255,255,0.042)",
              }}
            >
              {/* Gold top accent */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(to right, #C8902A, transparent)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
              />

              <div className="p-7 md:p-8">
                {/* Location name */}
                <h3
                  className="font-heading italic leading-none mb-1"
                  style={{ fontSize: "1.55rem", color: "hsl(40,20%,95%)", letterSpacing: "-0.01em" }}
                >
                  {loc.name}
                </h3>

                {/* Address */}
                <div className="flex items-start gap-2 mt-4 mb-5">
                  <MapPin
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#C8902A", opacity: 0.7 }}
                  />
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "hsl(40,12%,55%)", fontFamily: "var(--font-body)" }}
                  >
                    {loc.area}
                    <br />
                    {loc.city}
                  </p>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-2 mb-6">
                  <Clock
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#C8902A", opacity: 0.7 }}
                  />
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "hsl(40,12%,55%)", fontFamily: "var(--font-body)", whiteSpace: "pre-line" }}
                  >
                    {loc.hours}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* Phone CTA */}
                <motion.a
                  href={`tel:+91${loc.phone}`}
                  className="inline-flex items-center gap-3 group/btn"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                    style={{
                      background: "rgba(200,144,42,0.12)",
                      border: "1px solid rgba(200,144,42,0.25)",
                    }}
                  >
                    <Phone size={14} style={{ color: "#C8902A" }} />
                  </span>
                  <span
                    className="text-sm font-medium tracking-wide"
                    style={{ color: "hsl(40,20%,80%)", fontFamily: "var(--font-body)" }}
                  >
                    {loc.display}
                  </span>
                  <span style={{ color: "#C8902A", opacity: 0.7, fontSize: 12 }}>→</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VisitSection;
