import { useState } from "react";
import callToast from "../services/callToast";

const AddTransaction = ({ onAddTransaction }) => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (transactionName && transactionAmount) {
      onAddTransaction(transactionName, parseFloat(transactionAmount));
      setTransactionName("");
      setTransactionAmount("");
    } else {
      callToast("warning", "Please fill in all fields");
      return;
    }
  };
  return (
    <section className="bg-background shadow-lg rounded-lg w-full p-6">
      <div className="w-full lg:w1/2 mb-4 border-b-2 border-text pb-2 ">
        <h3 className="text-xl font-semibold text-action">Add Transaction</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col content-between gap-4">
        <div>
          <label
            htmlFor="transactionName"
            className="block text-text mb-2">
            Transaction Title
          </label>
          <input
            className="w-full p-2 border-2 border-action rounded-lg focus:outline-none shaodw-light focus:shadow-lightBlue  bg-transparent"
            type="text"
            autoComplete="off"
            required
            id="transactionName"
            placeholder="Enter title..."
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="transactionAmount"
            className="block text-text mb-2">
            Transaction Amount
          </label>
          <input
            className="w-full p-2 border-2 border-action rounded-lg focus:outline-none shaodw-light focus:shadow-lightBlue  bg-transparent"
            type="number"
            required
            autoComplete="off"
            id="transactionAmount"
            placeholder="Enter Amount..."
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Add Transaction
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTransaction;
