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

export const statusMessage = ({
  message,
  status,
}: {
  message: string | string[] | any;
  status: TypeToastStatus;
}) => {
  if (message instanceof Array) {
    message.forEach((mes) => {
      showToast({ status: status, message: `${mes}` });
    });
    return;
  }
  showToast({ status: status, message: `${message}` });
};

export async function urlToFile({
  fileName,
  mimeType,
  url,
}: {
  url: string;
  fileName: string;
  mimeType?: string;
}) {
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl, {
    headers: { "Content-Type": mimeType ?? "" },
  });

  // Get the original blob
  const originalBlob = await response.blob();

  // If mimeType is specified, create a new blob with the desired type
  const blob = mimeType
    ? new Blob([originalBlob], { type: mimeType })
    : originalBlob;

  const file = new File([blob], fileName, {
    type: mimeType ?? blob.type,
    lastModified: Date.now(),
  });

  return file;
}

export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 0) {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleTimeString(undefined, options);
  }

  if (diffSeconds < 60) {
    return diffSeconds === 1 ? "a second ago" : `${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    return diffMinutes === 1 ? "a minute ago" : `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? "an hour ago" : `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return diffDays === 1 ? "a day ago" : `${diffDays} days ago`;
  } else {
    // Return formatted date in "HH:mm" for more than 7 days
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleTimeString(undefined, options);
  }
}
