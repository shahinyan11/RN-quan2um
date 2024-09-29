import api, {ACCOUNT_SUPPORT_CREATE_QUESTION, FAQ_ALL, FAQ_DETAIL} from '@api';
import {onSuccessMessage} from '@store/app';
import {IAction, IPayload, IStore} from '@store/types';
import {AxiosRequestConfig} from 'axios';
import {Answer, IFaq, IPages, SET_VALUE} from './types';
import {GET_REGISTER_LIST} from '../reducerTypes';

const setValue = (payload: IPayload<IPages>) => ({
  type: SET_VALUE,
  payload,
});

export const setLoading = (data: boolean): IAction<IPayload<IPages>> => ({
  type: SET_VALUE,
  payload: {
    field: 'loading',
    data,
  },
});

export const getFaq =
  (
    config: {
      keywords?: string;
      category_id?: number;
      page?: number;
      loadMore?: boolean;
    } = {
      keywords: undefined,
      category_id: undefined,
      page: 1,
      loadMore: false,
    },
  ) =>
  (dispatch: any, getStore: () => IStore) => {
    const {faq: oldFaq} = getStore().pages;
    const {meta} = oldFaq;

    const needNextPage =
      config.loadMore && meta?.current_page < meta?.last_page;

    let requestConfig: AxiosRequestConfig = {
      params: {
        keywords: config.keywords,
        page: needNextPage ? meta?.current_page + 1 : config?.page,
        category_id: config.category_id,
      },
    };

    if (!config.loadMore || (config.loadMore && needNextPage)) {
      dispatch(setLoading(true));

      api
        .get<IFaq>(FAQ_ALL, requestConfig)
        .then(({data: faqData}) => {
          const customData: IFaq = config.loadMore
            ? {
                ...faqData,
                data: {
                  ...faqData.data,
                  faqs: oldFaq.data.faqs.concat(faqData.data.faqs),
                },
              }
            : faqData;

          dispatch(
            setValue({
              field: 'faq',
              data: customData,
            }),
          );
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

export const getFaqDetail =
  (id: number, onSuccess: (data: Answer) => void) => () => {
    api.get(`${FAQ_DETAIL}/${id}`).then(({data}) => {
      onSuccess(data);
    });
  };

type onSendQuestionProps = {
  config: {
    category_id: number;
    comment: string;
    userfile: any;
  };
  onSuccess: () => void;
};

export const onSendQuestion =
  ({config, onSuccess}: onSendQuestionProps) =>
  async (dispatch: any) => {
    try {
      const formData = new FormData();
      formData.append('category_id', config.category_id);
      formData.append('comment', config.comment);

      if (config.userfile) {
        formData.append('userfile', config.userfile);
      }

      await api.post(ACCOUNT_SUPPORT_CREATE_QUESTION, formData);

      onSuccess();

      dispatch(onSuccessMessage('Question successful send'));
    } catch (e) {
      console.log(e);
    }
  };

/**
 * Get terms and conditions list
 */
export const getRegisterList = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const config = {
      params: {
        app: 'app',
      },
    };
    const {data} = await api.get('/pages/register-list', config);

    dispatch({
      type: GET_REGISTER_LIST,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
