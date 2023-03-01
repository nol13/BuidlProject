import UserAvatar from "./userAvatar";
import { HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";
export default function Post() {
  return (
    <div className="card card-bordered bg-slate-200 dark:bg-gray-800">
      <div className="card-body">
        <h2 className="card-title">Article Title</h2>
        <p>
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic quidem
          odit iste totam, incidunt eveniet sed laudantium animi ratione et,
          similique excepturi repudiandae distinctio vitae in unde dolorem nobis
          labore!
        </p>
        <div className="card-actions mt-2 items-center justify-between">
          <UserAvatar />
          <div className="buttons flex gap-4 items-end justify-end">
            <HandThumbUpIcon className="h-6 w-6 text-gray-500" />
            <ShareIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
