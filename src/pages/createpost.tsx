import Navbar from "../components/navbar";
import { useAccount } from "wagmi";
import { connected } from "process";
import Hero from "../components/Hero";
import { useForm, SubmitHandler } from "react-hook-form";
// import { DefaultEditor } from "react-simple-wysiwyg";

type Inputs = {
  title: string;
  articleText: string;
  excerpt: string;
  price: number;
};

const CreatePost = () => {
  const { isConnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <Navbar />
      {isConnected ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-6 max-w-prose mx-auto"
        >
          <p className="text-4xl">Submit your article</p>
          <div className="w-full flex flex-col">
            <label>
              <span className="label-text text-2xl">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-primary  min-w-min input-lg"
              {...register("title")}
            />
          </div>
          {/* <DefaultEditor className="w-full" /> */}

          <div className="w-full flex flex-col">
            <label>
              <span className="label-text text-2xl">Text</span>
            </label>
            <textarea
              className="textarea w-full textarea-primary textarea-lg h-[400px]"
              placeholder="Main Text"
              {...register("articleText")}
            ></textarea>
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="label-text text-2xl">Excerpt</span>
            </label>
            <textarea
              className="textarea w-full textarea-primary textarea-lg h-[200px]"
              placeholder="Preview Text"
              {...register("excerpt")}
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
              {...register("price")}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Post Article
          </button>
        </form>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default CreatePost;
