import { TypeToastStatus } from "@/types";
import { showToast } from ".";

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
