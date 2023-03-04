import Image from "next/image";
import logo from "../assets/logo.png";
import icon from "../assets/icon.png";
import { Web3Button } from "@web3modal/react";

export default function Hero() {
  return (
    <div className="hero h-screen overflow-hidden ">
      <div className="hero-content flex-col lg:flex-row">
        <Image src={icon} alt="logo" width={300} height={300} />
        <div>
          <h1 className="text-5xl font-bold">Get your Articles on-chain!</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            soluta deserunt voluptate, eos nam nobis at inventore. Laborum quis
            eveniet debitis nihil, rerum fugit at odio dolores nostrum
            blanditiis praesentium!
          </p>
          <Web3Button />
        </div>
      </div>
    </div>
  );
}
