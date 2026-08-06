import Image from "next/image";

export const Bannertwo = () => {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <Image
          src="/banner/ISO Strip - Transparent.png"
          alt="ISO Certifications"
          width={1920}
          height={250}
          priority
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};
