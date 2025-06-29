import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import getTransactions from "./services/getTransactions";
import createTransaction from "./services/createTransaction";
import UserBalance from "./components/UserBalance";
import UserTransactions from "./components/UserTransactions";
import AddTransaction from "./components/AddTransaction";
import SingleTransaction from "./components/SingleTransaction";
import ReactSpinner from "./components/ReactSpinner";

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [singleTransaction, setSingleTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      const transactions = await getTransactions();
      if (transactions) {
        setAllTransactions(transactions);
      }
    } catch (err) {
      console.log(err);
      // err handled in getTransaction function
    } finally {
      setIsLoading(false);
    }
  }

  async function addTransaction(transactionName, transactionAmount) {
    try {
      setIsLoading(true);
      const response = await createTransaction(
        transactionName,
        transactionAmount
      );

      if (response) {
        fetchTransactions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSingleTransaction(transaction) {
    if (transaction) {
      return setSingleTransaction(transaction);
    }
    return setSingleTransaction({});
  }

  return (
    <>
      {isLoading && (
        <div className="min-h-screen w-full flex justify-center items-center bg-black bg-opacity-50 z-50 fixed top-0 left-0">
          <ReactSpinner></ReactSpinner>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        newestOnTop
        theme="dark"></ToastContainer>
      <section className="min-h-screen w-full flex justify-center items-center  text-text">
        <main className="flex flex-col items-center gap-10 p-4 w-full max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-action">Expense Tracker</h1>
            {/* <span className="text-lg text-gray-400">(January)</span> */}
          </div>
          {/* user transactions */}
          <UserBalance
            transactions={allTransactions}
            isLoading={isLoading}></UserBalance>
          {/*  transaction list*/}
          <UserTransactions
            transactions={allTransactions}
            onHandleSingleTransaction={
              handleSingleTransaction
            }></UserTransactions>
          {/* add transaction */}
          <AddTransaction onAddTransaction={addTransaction}></AddTransaction>
          {singleTransaction.id && (
            <SingleTransaction
              transaction={singleTransaction}
              onTransactionUpdate={fetchTransactions}
              onClose={() => setSingleTransaction({})}></SingleTransaction>
          )}
        </main>
      </section>
    </>
  );
}

export default App;
