import UserActionTypes from "./user-types";

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailPassword
});

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = errorMessage => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: errorMessage
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGNOUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGNOUT_SUCCESS,
});

export const signOutFailure = errorMessage => ({
    type: UserActionTypes.SIGNOUT_FAILURE,
    payload: errorMessage
});

export const signUpStart = userDetails => ({
    type: UserActionTypes.SIGNUP_START,
    payload: userDetails 
});

export const signUpSuccess = userDetails => ({
   type: UserActionTypes.SIGNUP_SUCCESS,
   payload: userDetails
});

export const signUpFailure = errorMessage => ({
    type: UserActionTypes.SIGNUP_FAILURE,
    payload: errorMessage
})