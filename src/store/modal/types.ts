import {InformationProps} from '@components/modals/Information';
import {WithdrawalProps} from '@components/modals/Withdrawal';
import {SendDonationProps} from '@components/modals/SendDonation';
import {ApplicationInstructionProps} from '@components/modals/ApplicationInstruction';
import {IdentificationCheckProps} from '@components/modals/IdentificationCheck';
import {ExchangeProcessProps} from '@components/modals/ExchangeProcess';
import {ExchangeCompleteProps} from '@components/modals/ExchangeComplete';

export type Action = {
  type: string;
  payload: any | undefined;
};

export type Modal =
  | Information
  | Invest
  | SelectStatus
  | InfoMasterNodes
  | InvestSuccess
  | WithdrawSuccess
  | WithdrawConfirm
  | ExchangeMethodSelect
  | InfoCharity
  | SendDonation
  | DonationConfirm
  | DonationCheck
  | KycVerification
  | AlreadyAppliedZakat
  | KycPersonalAssistance
  | PayAttentionZakat
  | ApplicationInstruction
  | Testing
  | Withdrawal
  | IdentificationCheck
  | WhaleDealFilters
  | ExchangeProcess
  | ExchangeComplete;

type Information = {
  modalType: 'INFORMATION';
  modalProps?: InformationProps;
};

type Invest = {
  modalType: 'INVEST';
};

type SelectStatus = {
  modalType: 'STATUS_SELECT';
};

type InfoMasterNodes = {
  modalType: 'INFO_MASTERNOD';
};

type InvestSuccess = {
  modalType: 'INVEST_SUCCESS';
};

type WithdrawSuccess = {
  modalType: 'WITHDRAW_SUCCESS';
};

type WithdrawConfirm = {
  modalType: 'WITHDRAW_CONFIRM';
};

type ExchangeMethodSelect = {
  modalType: 'EXCHANGE_METHOD_SELECT';
};

type InfoCharity = {
  modalType: 'INFO_CHARITY';
};
type SendDonation = {
  modalType: 'SEND_DONATION';
  modalProps: SendDonationProps;
};
type DonationConfirm = {
  modalType: 'DONATION_CONFIRM';
};
type DonationCheck = {
  modalType: 'DONATION_CHECK';
};
type KycVerification = {
  modalType: 'KYC_VERIFICATION';
};

type AlreadyAppliedZakat = {
  modalType: 'ALREADY_APPLIED_ZAKAT';
};
type KycPersonalAssistance = {
  modalType: 'KYC_PERSONAL_ASSISTANCE';
};
type PayAttentionZakat = {
  modalType: 'PAY_ATTENTION_ZAKAT';
};

type ApplicationInstruction = {
  modalType: 'APPLICATION_INSTRUCTION';
  modalProps?: ApplicationInstructionProps;
};

type Testing = {
  modalType: 'TESTING';
};
type Withdrawal = {
  modalType: 'WITHDRAWAL';
  modalProps: WithdrawalProps;
};
type IdentificationCheck = {
  modalType: 'IDENTIFICATION_CHECK';
  modalProps: IdentificationCheckProps;
};
type ExchangeProcess = {
  modalType: 'EXCHANGE_PROCESS';
  modalProps: ExchangeProcessProps;
};

type WhaleDealFilters = {
  modalType: 'WHALE_DEAL_FILTERS';
};

type ExchangeComplete = {
  modalType: 'EXCHANGE_COMPLETE';
  modalProps: ExchangeCompleteProps;
};
