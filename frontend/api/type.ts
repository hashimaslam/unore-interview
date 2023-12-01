export type TWithdraws = {
  id: string;
  to: string;
  from: string;
  amountUSD: string;
  timestamp: string;
  hash: string;
};

export type TWithdrawsResponse = {
  withdraws: TWithdraws[];
};

export type TGetTotalAmount = {
  walletAddress: string;
};

export type TGetTotalAmountResponse = {
  totalAmount: number;
};
