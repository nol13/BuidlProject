import Image from "next/image";
import { useEnsName } from "wagmi";
import avatarimg from "../assets/avatarimg.jpeg";

export default function UserAvatar() {
  const address = "0xA0Cf798816D4b9b986z6b5330EEa46a18382f251e";

  const { data: ensName, isError, isLoading } = useEnsName({ address });

  return (
    <div className="flex justify-center items-center">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <Image src={avatarimg} alt=" avatar image" />
        </div>
      </div>
      <div className="badge badge-ghost p-2">
        {isLoading ? "loading" : ensName}
      </div>
    </div>
  );
}
