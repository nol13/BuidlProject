import { useAccount, useContractRead } from "wagmi";
import { abi } from "../../contracts/Simple.json";
import PostModal from "./postModal";
import ViewButton from "./viewButton";

type Props = {
  id: string;
  price: number;
};

export default function BuyValidation({ id, price }: Props) {
  const { address } = useAccount();
  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: "0x9881EcCf30816f6723486e0C032cba53c3708071",
    abi: abi,
    functionName: "addressCanSeePost",
    args: [id, address],
  });

  if (data) {
    console.log(data);
  }
  return (
    <>{data ? <ViewButton id={id} /> : <PostModal id={id} price={price} />}</>
  );
}
