export type Action = {
  type: string;
  payload: any | undefined;
};

export type InitState = {
  fundTypes: any[];
  fundList: any[];
  collectionList: any[];
  activeCollections: any[];
  currentFund: {[key: string]: any};
  transactions: any[];
  selectedMethod: {[key: string]: any};
  currentExchange: CurrentExchange;
  userProposal: {[key: string]: any};
  testQuestion: {[key: string]: string};
  testState: TestState | {};
  transactionInfo: TransactionInfo | {};
  userFunds: UserFund[];
  personals: Proposal[];
  zakats: Proposal[];
  sadakas: Proposal[];
  userPersonals: Proposal[];
  userZakats: Proposal[];
  userSadakas: Proposal[];
  selectedFundType?: {[key: string]: any};
};

export interface CurrentExchange {
  address?: string;
  amount: string;
  expire: number;
  fee?: number;
  link: string;
  status: string;
  text: string;
}

export interface TestState {
  current_question: number;
  tries: number;
  status: number;
  current_question_start_time: string;
  max_tries_count: number;
  allowed_answer_time: number;
}

export interface TransactionInfo {
  id: number;
  created_at: string;
  updated_at: string;
  report: string[];
  money_collection_id: number;
  wallets: string[];
}

export interface UserFund {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  annotation: string;
  about: string;
  region: string;
  wallet: string;
  uri: string;
  vkontakte: string;
  odnoklassniki: string;
  facebook: string;
  instagram: string;
  logo: string;
  cover: string;
  status: number;
  user_id: number;
  type_id: number;
  images: {
    id: number;
    file: string;
  };
}

export interface Proposal {
  id: number;
  description: string;
  wallet: string;
  image: string;
  video: string;
  status: number;
  money_collection_id: number;
  start_date: string;
  end_date: string;
}
