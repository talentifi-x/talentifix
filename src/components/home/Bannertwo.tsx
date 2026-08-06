import Image from "next/image";

export const Bannertwo = () => {
  return (
    <section className="w-full py-12 bg-[#F7F9FC]">
      <Image
        src="/banner/ISO Strip - Transparent.png"
        alt="ISO Certifications"
        width={1920}
        height={250}
        priority
        className="w-full h-auto"
      />
    </section>
  );
};
