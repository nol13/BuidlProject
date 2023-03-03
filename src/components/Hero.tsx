import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import logo from "../assets/logo.png";

export default function Hero() {
  return (
    <div className="hero h-screen overflow-hidden ">
      <div className="hero-content flex-col lg:flex-row">
        <Image src={logo} alt="hero" className="max-w-xs rounded-lg " />
        <div>
          <h1 className="text-5xl font-bold">Get your Articles on-chain!</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            soluta deserunt voluptate, eos nam nobis at inventore. Laborum quis
            eveniet debitis nihil, rerum fugit at odio dolores nostrum
            blanditiis praesentium!
          </p>
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}
