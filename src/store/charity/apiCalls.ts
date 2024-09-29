import api, {
  CHARITY_FOUNDATIONS,
  CHARITY_FOUNDATIONS_ALL,
  CHARITY_FOUNDATIONS_CREATE,
  CHARITY_FOUNDATIONS_DONATE,
  CHARITY_FOUNDATIONS_MY,
  CHARITY_FOUNDATIONS_TYPES,
  CREATE_PROPOSAL,
  MONEY_COLLECTION_DONATE,
  MONEY_COLLECTION_FINISHED,
  MONEY_COLLECTION_GET,
  MONEY_COLLECTION_TEST_ANSWER,
  MONEY_COLLECTION_TEST_INIT,
  MONEY_COLLECTION_TEST_QUESTION,
  MONEY_COLLECTION_TEST_STATUS,
  MONEY_COLLECTION_USER_PROPOSALS,
  MONEY_COLLECTION_WITHDRAWAL_LOGS,
} from '@api';
import {
  setActiveCollections,
  setCurrentFund,
  setFundList,
  setFundTypes,
  setPersonals,
  setSadkas,
  setTestQuestion,
  setTestState,
  setTransactionInfo,
  setUserFunds,
  setUserPersonals,
  setUserProposal,
  setUserSadakas,
  setUserZakats,
  setZakats,
} from './actions';
import {showModal} from '@store/modal';
import {
  ATTEMPTS_OVER,
  MADE_MISTAKE,
  TEST_PASSED,
} from '@components/modals/Information/constantProps';
import {MONEY_COLLECTION_IDS, MUSLIM_TEST_STATUS} from '@constants/index';
import {navigationRef} from '@navigation/index';

export const getFoundTypes = () => async (dispatch: any) => {
  try {
    const {data} = await api.get(CHARITY_FOUNDATIONS_TYPES);
    dispatch(setFundTypes(data));
  } catch (e) {
    console.log('getFoundTypes', e.response);
  }
};

export const getFounds = (type_id?: number) => async (dispatch: any) => {
  try {
    const {data} = await api.get(CHARITY_FOUNDATIONS_ALL, {
      params: {type_id},
    });
    dispatch(setFundList(data));
  } catch (e) {
    console.log('getFounds', e.response);
  }
};

export const getCollections = (type?: number) => async (dispatch: any) => {
  try {
    const {data} = await api.get(MONEY_COLLECTION_GET, {
      params: {type},
    });

    // if (type === MONEY_COLLECTION_IDS.PERSONAL) {
    //   dispatch(setPersonals(data));
    // } else if (type === MONEY_COLLECTION_IDS.ZAKAT) {
    //   dispatch(setZakats(data));
    // } else if (type === MONEY_COLLECTION_IDS.SADAKA) {
    //   dispatch(setSadkas(data));
    // } else {
    //   dispatch(setCollectionList(data));
    // }

    dispatch(setActiveCollections(data));
  } catch (e) {
    console.log('getCollections', e.response);
  }
};

export const getFinishedCollections =
  (type?: number) => async (dispatch: any) => {
    try {
      const {data} = await api.get(MONEY_COLLECTION_FINISHED, {
        params: {type},
      });

      if (type === MONEY_COLLECTION_IDS.PERSONAL) {
        dispatch(setPersonals(data));
      } else if (type === MONEY_COLLECTION_IDS.ZAKAT) {
        dispatch(setZakats(data));
      } else {
        dispatch(setSadkas(data));
      }
    } catch (e) {
      console.log('getCollections', e.response);
    }
  };

export const getFoundById = (id: number) => async (dispatch: any) => {
  try {
    const {data} = await api.get(`${CHARITY_FOUNDATIONS}/${id}`);
    dispatch(setCurrentFund(data));
  } catch (e) {
    console.log('getFoundById', e.response);
  }
};

export const fundDonate =
  ({params, callback}) =>
  async () => {
    try {
      const {data} = await api.post(CHARITY_FOUNDATIONS_DONATE, params);

      callback?.();
    } catch (e) {
      console.log('fundDonate', e.response);
    }
  };

export const moneyCollectionDonate =
  ({params, callback}) =>
  async () => {
    try {
      const {data} = await api.post(MONEY_COLLECTION_DONATE, params);

      callback?.();
    } catch (e) {
      console.log('moneyCollectionDonate', e.response);
    }
  };

export const createFounds = fundData => async (dispatch: any) => {
  try {
    const formData = new FormData();
    Object.entries(fundData).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach(img => {
          formData.append('images[]', img);
        });
      } else {
        formData.append(key, value);
      }
    });

    await api.post(CHARITY_FOUNDATIONS_CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(
      showModal({
        modalType: 'APPLICATION_INSTRUCTION',
        modalProps: {currentStep: 4},
      }),
    );
  } catch (e) {
    console.log('createFounds', e.response.message);
  }
};

export type ProposalData = {
  description: string;
  wallet: string;
  image?: {
    uri: string;
    name: string;
    type: string;
  };
  video?: {
    uri: string;
    name: string;
    type: string;
  };
};

export const createProposal =
  (proposalData: ProposalData) => async (dispatch: any) => {
    try {
      const formData = new FormData();
      Object.entries(proposalData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await api.post(CREATE_PROPOSAL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(
        showModal({
          modalType: 'APPLICATION_INSTRUCTION',
          modalProps: {currentStep: 4},
        }),
      );
    } catch (e) {
      console.log('createProposal', e.response);
    }
  };

export const testInit = money_collection_id => async (dispatch: any) => {
  try {
    await api.post(MONEY_COLLECTION_TEST_INIT, {
      money_collection_id,
    });

    dispatch(getTestQuestion());
    navigationRef.current?.navigate('ApplicationTest');
  } catch (e) {
    dispatch(getTestQuestionStatus());
  }
};

export const getTestQuestionStatus =
  (
    {afterQuestion, afterAnswer, appInit} = {
      afterQuestion: false,
      afterAnswer: false,
      appInit: false,
    },
  ) =>
  async (dispatch: any) => {
    try {
      const {data} = await api.get(MONEY_COLLECTION_TEST_STATUS);

      if (appInit) {
        if (data.current_question_start_time) {
          dispatch(getTestQuestion());
        }

        return;
      }

      dispatch(setTestState(data));

      if (data.status === MUSLIM_TEST_STATUS.STATUS_PASSED) {
        if (afterAnswer) {
          dispatch(
            showModal({
              modalType: 'INFORMATION',
              modalProps: TEST_PASSED,
            }),
          );
        } else {
          navigationRef.current?.navigate('ApplicationRegistration');
        }

        return;
      }

      if (data.tries >= data.max_tries_count) {
        dispatch(
          showModal({
            modalType: 'INFORMATION',
            modalProps: ATTEMPTS_OVER,
          }),
        );

        return;
      }

      if (data.status === MUSLIM_TEST_STATUS.STATUS_PENDING) {
        const currentScreen = navigationRef.current?.getCurrentRoute()?.name;
        if (currentScreen !== 'ApplicationTest') {
          navigationRef.current?.navigate('FeesZakat', {
            screen: 'ApplicationTest',
          });
        }

        !afterQuestion && dispatch(getTestQuestion());
      }
    } catch (e) {
      console.log('getTestQuestionStatus', e.response.message);
    }
  };

export const getTestQuestion = () => async (dispatch: any) => {
  try {
    const {data} = await api.get(MONEY_COLLECTION_TEST_QUESTION);
    dispatch(setTestQuestion(data));
    dispatch(getTestQuestionStatus({afterQuestion: true}));
  } catch (e) {
    console.log('getTestQuestion', e.response.message);
  }
};

export const answerToQuestion =
  ({answer}) =>
  async (dispatch: any) => {
    try {
      const {data} = await api.post(MONEY_COLLECTION_TEST_ANSWER, {answer});

      if (data.correct) {
        dispatch(getTestQuestionStatus({afterAnswer: true}));
        return;
      }

      dispatch(
        showModal({
          modalType: 'INFORMATION',
          modalProps: MADE_MISTAKE,
        }),
      );
    } catch (e) {
      console.log('answerToQuestion', e.response.message);
    }
  };

export const getUserFunds = () => async (dispatch: any) => {
  try {
    const {data} = await api.get(CHARITY_FOUNDATIONS_MY);
    dispatch(setUserFunds(data));
  } catch (e) {
    console.log('getUserFunds', e.response.message);
  }
};

type GetUserProposals = {
  type?: number;
  status?: number;
};

export const getUserProposals =
  ({type, status}: GetUserProposals = {}) =>
  async (dispatch: any) => {
    try {
      const {data} = await api.get(MONEY_COLLECTION_USER_PROPOSALS, {
        params: {type, status},
      });

      if (type === MONEY_COLLECTION_IDS.PERSONAL) {
        dispatch(setUserPersonals(data));
      } else if (type === MONEY_COLLECTION_IDS.ZAKAT) {
        dispatch(setUserZakats(data));
      } else if (type === MONEY_COLLECTION_IDS.SADAKA) {
        dispatch(setUserSadakas(data));
      }

      dispatch(setUserProposal(data));
    } catch (e) {
      console.log('getUserProposals', e.response);
    }
  };

export const getWithdrawalLogs =
  money_collection_id => async (dispatch: any) => {
    try {
      const {data} = await api.get(MONEY_COLLECTION_WITHDRAWAL_LOGS, {
        params: {money_collection_id},
      });
      dispatch(setTransactionInfo(data));
    } catch (e) {
      console.log('getWithdrawalLogs', e.response);
    }
  };
