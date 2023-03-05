import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import { abi } from "../../contracts/Simple.json";

type ModalProps = {
  price: number;
  id: string;
};
export default function PostModal({ price, id }: ModalProps) {
  const { address } = useAccount();

  const { config, error } = usePrepareContractWrite({
    address: "0x9881EcCf30816f6723486e0C032cba53c3708071",
    abi: abi,
    functionName: "purchasePost",
    args: [address, id],
    overrides: {
      from: address,
      value: price,
    },
  });

  const {
    data: datawrite,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite(config);
  console.log(address, id);

  return (
    <>
      <label htmlFor="modal" className="btn btn-xs gap-2">
        Price:
        <div className="badge">{price}ETH</div>
      </label>
      <input type="checkbox" id="modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            X
          </label>
          <h3 className="text-lg font-bold">Buying Article from USER</h3>
          <p className="py-4 text-lg">Price: {price}ETH</p>
          <button className="btn btn-sm" onClick={() => write?.()}>
            Buy This Post
          </button>
        </div>
      </div>
    </>
  );
}
