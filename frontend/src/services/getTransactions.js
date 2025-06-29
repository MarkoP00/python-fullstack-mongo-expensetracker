import callToast from "./callToast";

export default async function getTransactions() {
  try {
    const fetchURL = import.meta.env.VITE_SERVER_URL;

    const response = await fetch(fetchURL);

    if (!response.ok) {
      throw new Error("Something went wrong! Transactions fetch failed!");
    }

    const responseData = await response.json();
    const expenses = responseData.expenses;

    return expenses;
  } catch (error) {
    callToast("warning", error.message);
  }
}
