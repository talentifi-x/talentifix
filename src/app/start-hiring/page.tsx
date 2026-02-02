import React from "react";
import { PrimaryClientContactForm } from "@components/contact/PrimaryClientContactForm";

export default function StartHiringPage() {
  return (
    <main className="w-full bg-white flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-5xl rounded-[10px] overflow-hidden">
          <PrimaryClientContactForm />
        </div>
      </div>
    </main>
  );
}

