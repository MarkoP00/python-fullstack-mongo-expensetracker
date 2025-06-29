import { toast } from "react-toastify";

export default function callToast(type, message) {
  toast[type](message);
}
