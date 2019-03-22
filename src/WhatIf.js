import React, {Component} from 'react';
// import gamificationmap from './images/carbonara_gamificationmap.png';

import WorldMap from './WorldMap';
import RangeYears from './RangeYears';
import RangeCountries from './RangeCountries';

class WhatIf extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            values: [33, 66]
        }

        this.onChange = this.onChange.bind(this);

    }

    onChange(values) {
        // console.log(values);
        this.setState({ values });
    }

    componentDidMount() {

    }

    render() {

        return (
            <section className="uk-section uk-section-default">
                <div className="uk-container uk-position-relative">

                    <h2><span uk-icon="icon: world; ratio: 2" className="uk-margin-right"></span> What if &hellip;</h2>
                    <span className="uk-label uk-position-top-right">Play</span>

                    <div uk-grid="" className="">
                        <div className="uk-width-5-6">

                            <WorldMap onChange={this.onChange} values={this.state.values} />

                            <RangeCountries onChange={this.onChange} values={this.state.values} />
                        </div>
                        <div className="uk-width-1-6">
                            <RangeYears />
                        </div>
                    </div>

                </div>

            </section>
        )
    }
}

export default WhatIf;
