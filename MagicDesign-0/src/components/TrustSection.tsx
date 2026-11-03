import React from 'react';
import { motion } from 'framer-motion';
import { trustPoints } from '../data/site';

export function TrustSection() {
  return (
    <section
      id="about"
      aria-labelledby="trust-title"
      className="scroll-mt-24 px-5 pt-24 md:px-14 md:pt-32 lg:pl-[18.75vw]"
    >
      <h2
        id="trust-title"
        className="text-[32px] font-light leading-[1.2] text-ink md:text-[42px] xl:text-[48px]"
      >
        Why trust ELEKS
        <br />
        with your next project?
      </h2>
      <ul className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-0 lg:grid-cols-4">
        {trustPoints.map((v, i) => (
          <motion.li
            key={v.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col border-l border-[#c7c7d6] pb-6 pl-5 pr-5 xl:px-8"
          >
            <div className="mb-4 text-[56px] font-light leading-none text-[#9b9fad] xl:mb-6 xl:text-[72px]">
              {v.n}
            </div>
            <h3 className="mb-4 min-h-[48px] text-[18px] font-bold leading-[1.35] text-ink xl:mb-6 xl:text-[20px]">
              {v.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-[#373737]">{v.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
