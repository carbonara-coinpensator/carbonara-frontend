const testAction = (payload) => {
  console.log(payload)
  return {
    type: 'calculate',
    payload
  }
}
export default testAction;
