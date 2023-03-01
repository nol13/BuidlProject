import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import heroimg from "../assets/herotest.jpeg";

export default function Hero() {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src={heroimg}
          alt="hero"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}
