import callToast from "./callToast";

export default async function deleteTransaction(id) {
  const fetchURL = import.meta.env.VITE_SERVER_URL;
  try {
    const response = await fetch(`${fetchURL}/transactions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      callToast("success", "Transaction deleted!");
      return true;
    } else {
      callToast("warning", "Something went wrong...");
      return false;
    }
  } catch (err) {
    callToast("error", err.message);
    return false;
  }
}
