const UserTransactions = ({ transactions, onHandleSingleTransaction }) => {
  return (
    <section className="bg-background rounded-lg w-full p-6">
      <div className="border-b-2 border-text pb-2 mb-4">
        <h3 className="text-xl font-semibold text-action">History</h3>
        <h3>Dodaj spinner i ID promeni</h3>
      </div>
      <div></div>
      <ul>
        {transactions?.map((transaction) => (
          <li
            key={transaction.id}
            onClick={() => onHandleSingleTransaction(transaction)}
            className={`grid grid-cols-3 items-center py-2 px-4 mb-2 rounded-md shadow-sm border-2 transition-all duration-200 cursor-pointer hover:bg-bgAction hover:bg-opacity-20
        ${
          transaction.expense_amount > 0
            ? "border-action"
            : "border-red-400 hover:bg-red-500 "
        }`}>
            <span className="truncate text-text w-full block">
              {transaction.expense_name} {transaction.id}
            </span>
            <span className="text-center text-text">
              {transaction.expense_date}
            </span>
            <span
              className={`text-right font-semibold  ${
                transaction.expense_amount > 0 ? "text-action" : "text-red-400"
              }`}>
              {transaction.expense_amount.toFixed(2)}$
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserTransactions;
