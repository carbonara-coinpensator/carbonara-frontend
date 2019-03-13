import React, {
    Component
} from 'react';

class FormErrors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formErrors: [],
        }
    }

    componentDidMount() {
        console.log(this.state.formErrors)
    }

    render() {
        return (
            <ul>
                { this.state.formErrors.map(formError => <li>{formError}</li>)}
            </ul>
        )
    }
}
export default FormErrors;