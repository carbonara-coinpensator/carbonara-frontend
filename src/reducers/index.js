export default (state, action) => {
  switch (action.type) {
    case 'calculate':
      return {
        testActionProp: action.payload
      }
    default:
      return state;
  }
}
