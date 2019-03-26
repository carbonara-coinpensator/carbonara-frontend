import { connect } from 'react-redux'
import CarbonaraCalculator from '../components/CarbonaraCalculator'
import testAction from '../actions/testAction'

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    testAction: (payload) => dispatch(testAction(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarbonaraCalculator)
