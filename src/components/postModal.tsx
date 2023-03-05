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
    address: "0x758b58fB346B3Ce8ec9Fc57b53C48091855b8C55",
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
          {isLoading ? (
            <button
              type="submit"
              onClick={() => write?.()}
              className="btn btn-secondary   btn-sm"
            >
              <div className="flex items-center space-x-1">
                <p>Buying Article</p>
                <div>
                  <svg
                    className="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="21px"
                    height="21px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="#000000"
                    />
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ) : (
            <button className="btn btn-sm" onClick={() => write?.()}>
              Buy This Post
            </button>
          )}
        </div>
      </div>
    </>
  );
}
