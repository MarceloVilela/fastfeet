import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  signed: false,
  loading: false,
  profile: {}
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        draft.signed = false;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.id = action.payload.deliveryman.id;
        draft.profile = action.payload.deliveryman;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        draft.signed = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
