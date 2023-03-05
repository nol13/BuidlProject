import UserAvatar from "./userAvatar";
import PostModal from "./postModal";
import { HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import BuyValidation from "./buyValidation";

type PostProps = {
  post: {
    price: number;
    creator: `0x${string}`;
    preview: string;
    title: string;
    id: string;
  };
};
export default function Post({ post }: PostProps) {
  console.log(post);
  return (
    <div className="card card-compact gap-50  bg-slate-50 dark:bg-[#383838]">
      <div className="card-body">
        <h2 className="card-title m-auto">{post.title}</h2>
        <p>{post.preview}</p>
        <div className="card-actions mt-10 items-center justify-between">
          <UserAvatar address={post.creator} />
          <div className="buttons flex gap-4 items-end ">
            <BuyValidation id={post.id} price={post.price} />
            <label className="swap">
              <input type="checkbox" />
              <HandThumbUpIcon className="h-6 w-6 text-gray-500 swap-off" />
              <HandThumbUpIconSolid className="h-6 w-6 text-gray-500 swap-on" />
            </label>
            <ShareIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
