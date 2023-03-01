import Navbar from "../components/navbar";
import { useAccount } from "wagmi";
import { connected } from "process";
import Hero from "../components/Hero";

const CreatePost = () => {
  const { isConnected } = useAccount();
  return (
    <>
      <Navbar />
      {isConnected ? (
        <div className="flex flex-col items-center space-y-6 max-w-prose mx-auto">
          <p className="text-4xl">Submit your article</p>
          <div className="w-full flex flex-col">
            <label>
              <span className="label-text text-2xl">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-primary  min-w-min input-lg"
            />
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="label-text text-2xl">Text</span>
            </label>
            <textarea
              className="textarea w-full textarea-primary textarea-lg h-[400px]"
              placeholder="Main Text"
            ></textarea>
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="label-text text-2xl">Excerpt</span>
            </label>
            <textarea
              className="textarea w-full textarea-primary textarea-lg h-[200px]"
              placeholder="Preview Text"
            ></textarea>
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="label-text text-2xl">Price</span>
            </label>
            <input
              type="text"
              placeholder="METIS"
              className="input input-primary w-1/3 input-lg"
            />
          </div>

          <button className="btn btn-primary w-full">Post</button>
        </div>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default CreatePost;
