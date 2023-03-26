import { createSelector } from "@reduxjs/toolkit";

const shopData = state => state.shop;

export const selectCollections = createSelector(
    [shopData],
    shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectCollections],
            collections => (collections ? collections[collectionUrlParam] : null)
    );

export const selectIsCollectionFetching = createSelector(
    [shopData],
    shop => shop.isLoading
);

export const selectIsCollectionsLoaded = createSelector(
    [shopData],
    shop => !!shop.collections
)