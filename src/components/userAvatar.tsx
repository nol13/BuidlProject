import Image from "next/image";
import { useEnsName } from "wagmi";
import avatarimg from "../assets/avatarimg.jpeg";
import { shortAddress } from "../helpers/shortAddress";
import Link from "next/link";

type UserProps = {
  address: `0x${string}`;
};

export default function UserAvatar({ address }: UserProps) {
  const {
    data: ensName,
    isError,
    isSuccess,
  } = useEnsName({
    address: address,
    chainId: 1,
  });

  return (
    <Link href={"/user/10"}>
      <div className="flex justify-center items-center">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <Image src={avatarimg} alt=" avatar image" />
          </div>
        </div>
        <div className="p-2">{ensName ? ensName : shortAddress(address)}</div>
      </div>
    </Link>
  );
}
