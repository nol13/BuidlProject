import UserAvatar from "./userAvatar";
import { HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";
export default function Post() {
  return (
    <div className="card card-bordered bg-slate-300">
      <div className="card-body">
        <h2 className="card-title">Article Title</h2>
        <p> article subtitle preview</p>
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
