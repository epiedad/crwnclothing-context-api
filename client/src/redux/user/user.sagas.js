import { takeLatest, call, put, all } from "redux-saga/effects";
import UserActionTypes from "./user-types";
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure,
} from "./user-actions";


import {auth, createUserProfileDocument, provider, getCurrentUser} from "../../firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalData = null) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const snapShot = yield userRef.get();
        const currentUser = {
            id: snapShot.id,
            ...snapShot.data()
        };
        if(additionalData) {
            yield put(signUpSuccess(currentUser));
        } else {
            yield put(signInSuccess(currentUser));
        }
    } catch (error) {
        if(additionalData) {
            yield put(signUpFailure(error));
        } else {
            yield put(signInFailure(error))
        }
    }
}

export function* googleSignInAsync() {
    try {
        const { user } = yield auth.signInWithPopup(provider);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        googleSignInAsync
    )
}

export function* signOutCurrentUser() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch ( error ) {
       yield put(signOutFailure(error));
    }
}

export function* onSignOut() {
    yield takeLatest(
        UserActionTypes.SIGNOUT_START,
        signOutCurrentUser
    )
}

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return
        yield getSnapShotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}


export function* signUpEmailPassword({payload: {displayName, email, password}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user, { displayName });
    } catch(error) {
        console.error(error);
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGNUP_START, signUpEmailPassword);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGNUP_SUCCESS, isUserAuthenticated);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onSignOut),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}