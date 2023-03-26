import UserActionTypes from "./user-types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    errorMesage: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.GOOGLE_SIGN_IN_START:
            return {
                ...state,
                isLoading: true
            };
        case UserActionTypes.EMAIL_SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
                currentUser: action.payload
            };
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false
            };
        case UserActionTypes.SIGNUP_START:
            return {
                ...state,
                isLoading: true,
                currentUser: action.payload
            };
        case UserActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: null
            };
        case UserActionTypes.SIGNOUT_START:
            return {
                ...state,
                isLoading: true
            };
        case UserActionTypes.SIGNOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: null
            }
        case UserActionTypes.SIGNOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMesage: action.payload
            }
        case UserActionTypes.CHECK_USER_SESSION:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
}

export default userReducer;