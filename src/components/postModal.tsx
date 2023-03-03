import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { abi } from "../../contracts/Simple.json";

export default function PostModal() {
  const { config, error } = usePrepareContractWrite({
    // address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: abi,
    functionName: "purchasePost",
    args: [],
  });
  return (
    <>
      <label htmlFor="modal" className="btn btn-xs">
        Buy!
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
          <p className="py-4">the price is 0,1ETH</p>
        </div>
      </div>
    </>
  );
}
