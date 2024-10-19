import React from "react";

function About() {
  return (
    <div>
      <div className="flex  justify-center mt-40 gap-10">
        {" "}
        <h2 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          We love
        </h2>
        <span className="text-4xl font-bold  p-4 bg-blue-500 rounded-2xl text-slate-50">
          comfy
        </span>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
        quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio
        aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed
        officiis ea tempore! Similique eos minima sit porro, ratione aspernatur!
      </p>
    </div>
  );
}

export default About;
