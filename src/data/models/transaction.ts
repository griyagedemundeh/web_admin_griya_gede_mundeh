type Transaction = {
  id: string;
  title: string;
  status: string;
  paymentType: string;
  totalPrice: number;
  ceremonyDate: Date;
  invoiceNumber: string;
};

export default Transaction;
