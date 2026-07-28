import React from "react";
import Image from "next/image";

const clients = [
  { name: "Clix Capital", logo: "/clients/ClixCapital.jpg" },
  { name: "Equentis", logo: "/clients/Equentis.svg" },
  { name: "L&T Finance", logo: "/clients/L%26TFinance.jpg" },
  { name: "TATA Capital", logo: "/clients/TATACapital.jpg" },
];

export const ClientsSection = () => {
  return (
    <section className="w-full bg-grey-accent py-20 px-6 md:px-8 lg:px-16 flex flex-col items-center">
      <h2 className="text-[30px] md:text-[42px] lg:text-[54px] font-notch font-bold text-dark mb-16 text-center leading-tight">
        Trusted Clients<span className="text-secondary">.</span>
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full max-w-300 font-notch">
  {clients.map((client) => (
    <div
      key={client.name}
      className="bg-white shadow-lg rounded-[10px] border-b-6 border-primary p-6 flex items-center justify-center transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="relative w-[70%] aspect-[3/2]">
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          fill
          unoptimized
          sizes="(max-width: 1024px) 45vw, 22vw"
          className="object-contain"
        />
      </div>
    </div>
  ))}
</div>
    </section>
  );
};