import callToast from "./callToast";
export default async function createTransaction(
  transactionName,
  transactionAmount
) {
  try {
    const fetchURL = import.meta.env.VITE_SERVER_URL;

    const newTransaction = {
      transaction_name: transactionName,
      transaction_amount: transactionAmount,
    };

    const response = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (!response.ok) {
      callToast("warning", "Something went wrong...");
      return false;
    }
    callToast("success", "Transaction created!");
    return true;
  } catch (err) {
    callToast("error", err.message);
    return false;
  }
}
