import { TypeToastStatus } from "@/types";
import { Bounce, toast, ToastOptions } from "react-toastify";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function getInitials(name: string): string {
  return name
    .split(" ") // Split the string into an array of words
    .map((word) => word[0]) // Get the first letter of each word
    .join("") // Join the initials together
    .toUpperCase(); // Convert to uppercase (optional)
}

export function showToast({
  isDark,
  message,
  status,
}: {
  message: string;
  isDark?: boolean;
  status: TypeToastStatus;
}): void {
  const toastOption: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: isDark ? "dark" : "light",
    transition: Bounce,
  };

  switch (status) {
    case "success":
      toast.success(message, toastOption);
      break;
    case "warn":
      toast.warn(message, toastOption);
      break;
    case "error":
      toast.error(message, toastOption);
      break;
    case "info":
      toast.info(message, toastOption);
      break;
    default:
      toast.info(message, toastOption);
      break;
  }
}
