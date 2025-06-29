import { useState, useEffect } from "react";

const UserBalance = ({ transactions, isLoading }) => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);
  const [userIncome, setUserIncome] = useState(0);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    let totalExpenses = 0;
    let totalIncome = 0;

    transactions.forEach((transaction) => {
      const amount = transaction.expense_amount;
      if (amount < 0) {
        totalExpenses += amount;
      } else {
        totalIncome += amount;
      }
    });

    const totalBalance = (totalIncome + totalExpenses).toFixed(2);

    setTotalBalance(totalBalance);
    setUserExpenses(totalExpenses);
    setUserIncome(totalIncome);
  }, [transactions]);

  if (!transactions || transactions.length === 0) {
    return (
      <section className="bg-background/80 backdrop-blur-sm shadow-xl rounded-xl w-full p-6 text-center text-gray-400 animate-pulse">
        {isLoading ? "Loading financial data..." : "No transactions"}
      </section>
    );
  }

  return (
    <section className="bg-background/90 backdrop-blur-sm shadow-xl rounded-xl w-full p-6 border border-gray-700/50 transition-all ">
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-medium text-gray-300 mb-2">
            Your Balance
          </h3>
          <span
            className={`text-3xl font-bold ${
              totalBalance >= 0 ? "text-action" : "text-red-400"
            }`}>
            {totalBalance >= 0 ? "+" : ""}
            {totalBalance}$
          </span>
        </div>

        {/* Income and Expenses */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col items-center w-1/2 p-4 bg-gray-800/40 rounded-lg border border-gray-700 hover:border-action/50 hover:bg-bgAction/5 transition-colors">
            <h3 className="text-gray-400 mb-1 text-sm uppercase tracking-wider">
              Income
            </h3>
            <span className="text-2xl font-semibold text-green-400">
              +{userIncome.toFixed(2)}$
            </span>
            <div className="h-1 w-8 bg-action/50 rounded-full mt-2"></div>
          </div>

          <div className="flex flex-col items-center w-1/2 p-4 bg-gray-800/40 rounded-lg border border-gray-700 hover:border-red-400/50 hover:bg-red-200/5 transition-colors">
            <h3 className="text-gray-400 mb-1 text-sm uppercase tracking-wider">
              Expenses
            </h3>
            <span className="text-2xl font-semibold text-red-400">
              {userExpenses.toFixed(2)}$
            </span>
            <div className="h-1 w-8 bg-red-500/50 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserBalance;
