export const subSectionReducer = function (state, action) {
  console.log('ACTION', action);
  switch (action.type) {
    case 'Add':
      return {
        ...state,
        status: 'Add',
        sectionId: action.payload.sectionId,
        subSection:{}
      };
    case 'Edit':
      return {
        ...state,
        status: 'Edit',
        sectionId: action.payload.sectionId,
        subSection: action.payload.subSection
      };
    case 'Reset':
      return {};

    default:
      throw new Error('Illegal type');
  }
};
