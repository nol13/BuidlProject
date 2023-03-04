import UserAvatar from "./userAvatar";
import PostModal from "./postModal";
import { HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
export default function Post() {
  return (
    <div className="card card-compact gap-50  bg-slate-50 dark:bg-[#383838]">
      <div className="card-body">
        <h2 className="card-title m-auto">Article Title</h2>
        <p>
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic quidem
          odit iste totam, incidunt eveniet sed laudantium animi ratione et,
          similique excepturi repudiandae distinctio vitae in unde dolorem nobis
          labore!
        </p>
        <div className="card-actions mt-10 items-center justify-between">
          <UserAvatar />
          <div className="buttons flex gap-4 items-end ">
            <PostModal />
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
