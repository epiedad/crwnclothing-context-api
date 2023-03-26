import { takeLatest, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import UserActionTypes from '../user/user-types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* onSignInSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchCollectionsAsync);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGNUP_SUCCESS, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionStart),
        call(onSignInSuccess),
        call(onSignUpSuccess)
    ])
}