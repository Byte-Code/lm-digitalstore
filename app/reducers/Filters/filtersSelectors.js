// eslint-disable-next-line import/prefer-default-export
export const getFilterMap = state => state.get('active');

export const getDialogStatus = state => state.get('isDialogOpen');

export const getActiveAid = state => state.getIn(['active', 'aid']);

export const getActiveFilters = state => state.getIn(['active', 'filters']);

export const getActiveAvailability = state => state.getIn(['active', 'availability']);

export const getTempAid = state => state.getIn(['temp', 'aid']);

export const getTempFilters = state => state.getIn(['temp', 'filters']);

export const getTempAvailability = state => state.getIn(['temp', 'availability']);
