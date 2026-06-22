import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className = "",
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className={`animated-testimonials-wrap ${className}`}>
      <div className="animated-testimonials-grid">
        {/* Image stack */}
        <div className="animated-testimonials-img-col">
          <div className="animated-testimonials-img-stack">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="animated-testimonials-img-item"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="animated-testimonials-img"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text content */}
        <div className="animated-testimonials-content">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {testimonials[active].cert && !testimonials[active].cert.includes("Training") && !testimonials[active].cert.includes("Learners") && (
              <div className="animated-testimonials-cert">✓ {testimonials[active].cert}</div>
            )}
            <h3 className="animated-testimonials-name">{testimonials[active].name}</h3>
            <p className="animated-testimonials-role">{testimonials[active].designation}</p>
            <motion.p className="animated-testimonials-quote">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * index }}
                  className="animated-testimonials-word"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Nav buttons */}
          <div className="animated-testimonials-nav">
            <button onClick={handlePrev} className="animated-testimonials-btn" aria-label="Previous">
              <IconArrowLeft className="animated-testimonials-btn-icon" />
            </button>
            <div className="animated-testimonials-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`animated-testimonials-dot${i === active ? " active" : ""}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="animated-testimonials-btn" aria-label="Next">
              <IconArrowRight className="animated-testimonials-btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
