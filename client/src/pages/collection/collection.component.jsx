import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';
import withRouterWrapper from '../../components/withRouter.component';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { checkUserSession } from '../../redux/user/user-actions';

import './collection.component.styles.scss';

const CollectionPage = ({ collection, checkUserSssion }) => {
    checkUserSession();
    const { title, items } = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
   collection: selectCollection(ownProps.params.categoryId)(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});
export default withRouterWrapper(connect(mapStateToProps, mapDispatchToProps)(CollectionPage));