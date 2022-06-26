export const networkTypes = {
  Bitcoin: 1,
  Ethereum: 2,
  Solana: 3,
  Tether: 4,
  Binance: 5,
};

export const transactionTypes = {
  Deposit: 0,
  Withdraw: 1,
};

export const transactionStatusTypes = {
  Pending: 1,
  TimedOut: 2,
  RejectByUser: 3,
  RejectByNetwork: 4,
  ConfirmedByNetwork: 5,
};
