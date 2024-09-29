export type Props = {
  amount?: number | string;
  type:
    | 'balance'
    | 'deposit'
    | 'profit'
    | 'award'
    | 'commission'
    | 'masternodes';
};
