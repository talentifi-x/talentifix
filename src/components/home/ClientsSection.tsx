import React from "react";
import Image from "next/image";

// width: share of the card the logo may span; wide wordmarks get more room.
const clients = [
  { name: "Clix Capital", logo: "/clients/ClixCapital.png", width: "w-[62%]" },
  { name: "Equentis", logo: "/clients/Equentis.svg", width: "w-[90%]" },
  { name: "L&T Finance", logo: "/clients/LTFinance.webp", width: "w-[90%]" },
  { name: "TATA Capital", logo: "/clients/TATACapital.png", width: "w-[90%]" },
  { name: "Paytm", logo: "/clients/Paytm.svg", width: "w-[70%]" },
  { name: "IBM", logo: "/clients/IBM.svg", width: "w-[70%]" },
  { name: "Rupeek", logo: "/clients/Rupeek.svg", width: "w-[90%]" },
  { name: "AlgoShack", logo: "/clients/AlgoShack.webp", width: "w-[90%]" },
  { name: "AU Small Finance Bank", logo: "/clients/AUBank.svg", width: "w-[72%]" },
  { name: "Dvara KGFS", logo: "/clients/DvaraKGFS.png", width: "w-[70%]" },
  { name: "Raksha Technologies", logo: "/clients/Raksha.svg", width: "w-[80%]" },
  { name: "FundsIndia", logo: "/clients/FundsIndia.svg", width: "w-[90%]" },
];

/**
 * The client logos in a calm grid of white tiles: a hairline edge and a soft
 * shadow instead of a heavy shadow and a thick blue bar, so the logos carry
 * the colour. Each logo keeps its own width share (tuned per wordmark) inside
 * a box of fixed proportions, so the row reads evenly.
 */
export const ClientsSection = () => {
  return (
    <section className="w-full bg-grey-accent py-16 md:py-20 lg:py-24 px-site flex flex-col items-center">
      <h2 className="text-[30px] md:text-[42px] lg:text-[54px] font-notch font-bold text-dark mb-10 md:mb-12 lg:mb-14 text-center leading-tight">
        Trusted Clients<span className="text-secondary">.</span>
      </h2>

      <ul className="grid w-full max-w-site grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {clients.map((client) => (
          <li
            key={client.name}
            className="flex items-center justify-center rounded-2xl border border-dark/[0.06] bg-white px-5 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-22px_rgba(15,23,42,0.25)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_36px_-22px_rgba(0,0,255,0.3)] sm:px-7 sm:py-8 lg:px-9 lg:py-10"
          >
            <div className="flex aspect-15/7 w-full items-center justify-center">
              <div className={`relative h-full ${client.width}`}>
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-contain"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
