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
          // Sits below the hero: it loads normally so it never competes with the hero image.
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};
