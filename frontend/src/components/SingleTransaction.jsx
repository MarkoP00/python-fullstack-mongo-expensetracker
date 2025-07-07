import { useState } from "react";
import patchTransaction from "../services/patchTransaction";
import GlobalPopup from "./GlobalPopup";
import deleteTransaction from "../services/deleteTransaction";

const SingleTransaction = ({ transaction, onClose, onTransactionUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [transactionName, setTransactionName] = useState(
    transaction.transaction_name
  );
  const [transactionAmount, setTransactionAmount] = useState(
    transaction.transaction_amount
  );

  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const stopClick = (e) => {
    e.stopPropagation();
  };

  const handleEditAndSave = async () => {
    // spinner
    if (!isEditing) {
      setIsEditing((prev) => !prev);
    } else {
      const response = await patchTransaction(
        transactionName,
        transactionAmount,
        transaction.id
      );

      if (response) {
        setTransactionName(response.transaction.transaction_name);
        setTransactionAmount(response.transaction.transaction_amount);
        onTransactionUpdate();
        setIsEditing((prev) => !prev);
      }
    }
  };

  const handleDelete = async () => {
    const response = await deleteTransaction(transaction.id);

    if (response) {
      onTransactionUpdate();
      onClose();
    }
  };

  const handleDeleteWindow = () => {
    if (isEditing) {
      setIsEditing((prev) => !prev);
      return;
    }

    if (!popupTitle && !popupMessage) {
      setPopupTitle("Delete Transaction");
      setPopupMessage("Are you sure you want to delete this transaction?");
      return;
    }
  };

  const toggleDelete = (title, message) => {
    setPopupTitle(title);
    setPopupMessage(message);
  };

  return (
    <>
      {popupTitle && popupMessage && (
        <GlobalPopup
          message={popupMessage}
          title={popupTitle}
          onClose={() => toggleDelete("", "")}
          onAction={handleDelete}></GlobalPopup>
      )}

      <section
        onClick={onClose}
        className="min-h-screen w-full bg-black/30 fixed top-0 left-0 z-40 flex justify-center items-center backdrop-blur-sm p-6 animate-fadeIn">
        <main
          onClick={(e) => stopClick(e)}
          className="bg-background/95 backdrop-blur-md shadow-2xl rounded-xl max-w-md w-full p-8 border border-action/30 relative animate-scaleIn">
          {/* Close Button (Absolute Position) */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all hover:scale-110 text-2xl"
            aria-label="Close">
            &times;
          </button>

          {/* Transaction Content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-action border-b border-gray-700 pb-2">
              {isEditing ? "Edit Transaction" : "Transaction Details"}
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                {isEditing ? (
                  <input
                    className="w-full bg-background/50 border border-action/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-action"
                    value={transactionName}
                    onChange={(e) => setTransactionName(e.target.value)}
                  />
                ) : (
                  <p className="text-white text-lg font-medium">
                    {transactionName}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-400 text-sm">Amount</p>
                {isEditing ? (
                  <input
                    className="w-full bg-background/50 border border-action/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-action"
                    value={transactionAmount}
                    type="number"
                    step={0.01}
                    placeholder="Amount"
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
                ) : (
                  <p
                    className={`text-2xl font-bold ${
                      transactionAmount > 0 ? "text-green-400" : "text-red-400"
                    }`}>
                    {transactionAmount > 0 ? "+" : ""}
                    {transactionAmount.toFixed(2)}$
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-400 text-sm">Created / Updated</p>
                <p className="text-white">
                  {new Date(transaction.transaction_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleEditAndSave}
                className="bg-action/80  hover:bg-action text-background font-medium py-2 px-4 rounded-lg transition-all flex-1">
                {isEditing ? "Save" : "Edit"}
              </button>
              <button
                onClick={handleDeleteWindow}
                className="bg-red-500/90 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all flex-1">
                {isEditing ? "Cancel" : "Delete"}
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default SingleTransaction;
