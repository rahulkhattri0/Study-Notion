export const subSectionReducer = function (_, action) {
  console.log('ACTION', action);
  switch (action.type) {
    case 'Add':
      return {
        status: 'Add',
        sectionId: action.payload.sectionId
      };
    case 'Edit':
      return {
        status: 'Edit',
        subSection: action.payload.subSection
      };
    case 'Reset':
      return null;

    default:
      throw new Error('Illegal type');
  }
};
