import React, { useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import CheckoutPage from './pages/checkout/checkout.component';
import CollectionsOverview from './components/collections-overview/collections-overview.component';
import CollectionPage from './pages/collection/collection.component';

import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user-selectors';
import { createStructuredSelector } from 'reselect';
import { fetchCollectionStart } from './redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from './redux/shop/shop.selector';
import WithSpinner from './components/with-spinner/with-spinner.component';
import { checkUserSession } from './redux/user/user-actions';



const HomePageWithSpinner = WithSpinner(HomePage);
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const App = ({
  fetchCollectionStart,
  checkUserSession,
  isCollectionFetching,
  isCollectionsLoaded,
  currentUser
}) => {

  useEffect(() => {
    checkUserSession();
    fetchCollectionStart();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
        <Routes>
          <Route path='/' element={<HomePageWithSpinner isLoading={isCollectionFetching} />} />
          <Route path='/shop'>
            <Route index element={<CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded} />} />
            <Route path=":categoryId" element={<CollectionPageWithSpinner isLoading={!isCollectionsLoaded} />} />
          </Route>
          <Route 
            exact
            path='/signin'
            element=
            {
              currentUser
              ? (<Navigate to='/' replace />)
              : (<SignInAndSignUpPage />)
            }
            />
          <Route exact path= '/checkout' element={<CheckoutPage />} />
        </Routes>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
