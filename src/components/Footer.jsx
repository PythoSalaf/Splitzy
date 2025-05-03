import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-green-800 py-6">
      <div className="w-[96%] md:w-[92%] mx-auto text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="w-full">
          <h3 className="italic text-2xl md:text-3xl">Splitzy</h3>
          <p className="py-2">
            The easiest way to split bills with friends using stablecoins on
            Celo.
          </p>
        </div>
        <div className="w-full">
          <h3 className="text-xl md:text-2xl font-semibold">Product</h3>
          <p className="">Features</p>
          <p className="text-sm md:text-base">How it works</p>
          <p className="text-sm md:text-base">Pricing</p>
          <p className="text-sm md:text-base">FAQ</p>
        </div>
        <div className="w-full">
          <h3 className="text-xl md:text-2xl font-semibold">Resources</h3>
          <p className="">Documentation</p>
          <p className="text-sm md:text-base">Developer</p>
          <p className="text-sm md:text-base">Blog</p>
          <p className="text-sm md:text-base">Support</p>
        </div>
        <div className="w-full">
          <h3 className="text-xl md:text-2xl font-semibold">Resources</h3>
          <p className="">Documentation</p>
          <p className="text-sm md:text-base">Developer</p>
          <p className="text-sm md:text-base">Blog</p>
          <p className="text-sm md:text-base">Support</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
