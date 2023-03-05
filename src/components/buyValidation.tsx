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
    address: "0x758b58fB346B3Ce8ec9Fc57b53C48091855b8C55",
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
