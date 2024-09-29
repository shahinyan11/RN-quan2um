import InfoMatsernodModal from '@screens/Profile/MasternodesScreen/components/InfoMatsernodModal';
import InvestSuccessModal from '@screens/Profile/MasternodesScreen/components/InvestSuccessModal';
import WithdrawSuccessModal from '@screens/Profile/MasternodesScreen/components/WithdrawSuccessModal';
import WithdrawConfirmModal from '@screens/Profile/MasternodesScreen/components/WithdrawConfirmModal';
import Invest from '@screens/Profile/MasternodesScreen/components/Invest';
import StatusSelect from '@screens/Profile/TransactionFilterScreen/StatusSelect';
import NoInternet from '@components/modals/NoInternet';
import ModalCalendar from '@components/modals/ModalCalendar';
import StartMining from '@components/modals/StartMining';
import InfoCharity from '@components/modals/InfoCharity';
import SendDonation from '@components/modals/SendDonation';
import DonationConfirm from '@components/modals/DonationConfirm';
import DonationCheck from '@components/modals/DonationCheck';
import VerificationKYC from '@components/modals/VerificationKYC';
import AlreadyAppliedZakat from '@components/modals/AlreadyAppliedZakat';
import KycPersonalAssistance from '@components/modals/KycPersonalAssistance';
import PayAttentionZakat from '@components/modals/PayAttentionZakat';
import Testing from '@components/modals/Testing';
import Information from '@components/modals/Information';
import Withdrawal from '@components/modals/Withdrawal';
import ApplicationInstruction from '@components/modals/ApplicationInstruction';
import IdentificationCheck from '@components/modals/IdentificationCheck';
import MethodSelect from '@screens/ExchangeScreen/components/MethodSelect';
import WhaleDealFilters from '@components/modals/WhaleDealFilters';
import ExchangeProcess from '@components/modals/ExchangeProcess';
import ExchangeComplete from '@components/modals/ExchangeComplete';

const MODAL_COMPONENTS = {
  INVEST: Invest,
  STATUS_SELECT: StatusSelect,
  INFO_MASTERNOD: InfoMatsernodModal,
  INVEST_SUCCESS: InvestSuccessModal,
  WITHDRAW_SUCCESS: WithdrawSuccessModal,
  WITHDRAW_CONFIRM: WithdrawConfirmModal,
  EXCHANGE_METHOD_SELECT: MethodSelect,
  NO_INTERNET: NoInternet,
  CALENDAR: ModalCalendar,
  START_MINING: StartMining,
  INFO_CHARITY: InfoCharity,
  SEND_DONATION: SendDonation,
  DONATION_CONFIRM: DonationConfirm,
  DONATION_CHECK: DonationCheck,
  KYC_VERIFICATION: VerificationKYC,
  ALREADY_APPLIED_ZAKAT: AlreadyAppliedZakat,
  KYC_PERSONAL_ASSISTANCE: KycPersonalAssistance,
  PAY_ATTENTION_ZAKAT: PayAttentionZakat,
  APPLICATION_INSTRUCTION: ApplicationInstruction,
  TESTING: Testing,
  INFORMATION: Information,
  WITHDRAWAL: Withdrawal,
  IDENTIFICATION_CHECK: IdentificationCheck,
  WHALE_DEAL_FILTERS: WhaleDealFilters,
  EXCHANGE_PROCESS: ExchangeProcess,
  EXCHANGE_COMPLETE: ExchangeComplete,
};

export default MODAL_COMPONENTS;
