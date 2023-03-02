export default function PostModal() {
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
            ✕
          </label>
          <h3 className="text-lg font-bold">Buying Article from USER</h3>
          <p className="py-4">the price is 0,1ETH</p>
        </div>
      </div>
    </>
  );
}
