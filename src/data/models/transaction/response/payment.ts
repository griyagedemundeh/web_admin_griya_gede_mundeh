type Payment = {
  id: number | string;
  title: string;
  paymentUrl: string;
  totalPrice: number;
  createdAt: string;
  ceremonyDate: string;
  status: "pending" | "success" | "cancel"; // assuming status may vary
};
