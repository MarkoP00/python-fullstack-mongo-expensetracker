import callToast from "./callToast";

export default async function patchTransaction(
  transaction_name,
  transaction_amount,
  id
) {
  const fetchURL = import.meta.env.VITE_SERVER_URL;

  try {
    const transaction = {
      transaction_name,
      transaction_amount,
      id,
    };

    const response = await fetch(`${fetchURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (response.ok) {
      callToast("success", "Transaction Updated!");
      const responseData = await response.json();
      return responseData;
    } else {
      callToast("warning", "Please check all fields!");
      return false;
    }
  } catch (err) {
    callToast("error", err.message);
    return false;
  }
}
