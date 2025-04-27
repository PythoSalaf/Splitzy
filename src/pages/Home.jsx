import React from "react";
import { Bgslide, Heroicon } from "../assets";

const Home = () => {
  const splitSteps = [
    {
      id: 1,
      title: "Create Plans",
      description:
        "Organize expenses by Creating Plans for roomates, trips, events or any shared expenses",
      icon: "",
    },
    {
      id: 2,
      title: "Track Expenses",
      description:
        "Add bills, split them evenly or custom amounts, and keep track of who paid what.",
      icon: "",
    },
    {
      id: 3,
      title: "Pay with Stablecoin",
      description:
        "Settle debts instantly using Celo Dollar (cUSD) with no transaction fees between friends.",
      icon: "",
    },
  ];
  const experienceCelo = [
    {
      id: 1,
      title: "Connect Wallet",
      description: "Link your Celo wallet or create a new one in seconds.",
    },
    {
      id: 2,
      title: "Create or join Plans",
      description:
        "Set up expenses plans and invite friends via email or wallet address.",
    },
    {
      id: 3,
      title: "Add expenses and split",
      description:
        "Record expenses and choose how to split amongs team members.",
    },
    {
      id: 4,
      title: "Settle up with stablecoins",
      description: "Pay and get paid instantly with Celo Dollar (cUSD).",
    },
  ];
  return (
    <>
      <div
        className="w-full h-screen  bg-center pt-[3.5rem]"
        style={{
          background: `url(${Bgslide})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-[96%] md:w-[92%] mx-auto pt-4 md:pt-6 flex items-start gap-y-10 md:gap-y-0 flex-col md:flex-row">
          <div className="text-white w-full md:w-[65%]">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold capitalize leading-8 md:leading-16">
              Split bill easily with <br /> stablecoins
            </h1>
            <p className="text-xl md:text-2xl z-10 my-3 md:my-6">
              Splitzy makes it simple to split expenses with friends and family{" "}
              <br />
              using Celo stablecoins. No more awkward money talks or forgotten{" "}
              <br /> debts.
            </p>
            <div className="text-black pt-2 md:pt-5 flex items-center justify-center md:justify-normal gap-x-8">
              <button className="bg-white px-3 py-1.5 md:py-2 rounded-md  transition-all ease-in-out duration-300 text-base md:text-lg cursor-pointer">
                Get started
              </button>
              <button className="bg-white px-3 py-1.5 md:py-2 rounded-md  transition-all ease-in-out duration-300 text-base md:text-lg cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full md:w-[35%] ">
            <img src={Heroicon} alt="icon" className="w-[100%] h-[100%]" />
          </div>
        </div>
      </div>

      <section className="w-full my-14">
        <h2 className="text-green-900 text-center text-xl md:text-3xl font-bold">
          Split Bills with Confidence
        </h2>
        <p className="text-center text-base md:text-lg text-[#4c4545]  my-2">
          Splitzy combines the security of blockchain with the simplicity of
          modern apps <br /> to make expense sharing effortless.{" "}
        </p>
        <div className="w-[96%] md:w-[92%] mx-auto gap-3 mt-9 grid grid-cols-1 md:grid-cols-3">
          {splitSteps.map((item) => (
            <div
              className="bg-green-800 w-[90%] md:w-[96%] mx-auto text-white rounded-xl shadow py-4"
              key={item.id}
            >
              <div className="w-[90%] mx-auto">
                <div className="rounded-full w-10 md:w-12 h-10 md:h-12 bg-white flex items-center justify-center"></div>
                <h3 className="my-2.5 md:my-4 text-xl md:text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-green-900 py-8">
        <div className="w-[96%] md:w-[92%] mx-auto text-white flex items-start flex-col md:flex-row justify-between">
          <div className="w-full">
            <h3 className="text-xl md:text-2xl  font-semibold">
              Experience Splitzy in Action
            </h3>
            <p className="my-5">
              See how easy it is to create plans, add expenses, and settle up
              with friends using Celo Stablecoin
            </p>
            {experienceCelo.map((item, index) => (
              <div
                className="flex items-start py-2 gap-x-2 md:gap-x-4 px-1.5 md:px-3 rounded-md mb-3 bg-white text-black"
                key={item.id}
              >
                <div className="bg-green-800 rounded-full w-7 h-7 md:w-9 md:h-9 flex items-center justify-center">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {index + 1}
                  </h2>
                </div>
                <div className="">
                  <h4 className="font-semibold text-green-800 text-lg md:text-xl">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
