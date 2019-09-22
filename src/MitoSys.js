import React, { Component } from 'react';

class MitoSys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribeDisabled: false,
            subscribeText: 'Subscribe',
            subscribeLoading: false,
            unsubscribeDisabled: true,
            unsubscribeText: 'Not subscribed',
            unsubscribeLoading: false,
            totalEarnings: 0.500141412412,
        };
    }

    subscribeBtn(event) {
        if (!this.state.subscribeDisabled) {
            this.setState({ subscribeDisabled: true });
            this.setState({ subscribeLoading: true });

            let that = this;
            setTimeout(function() {
                that.setState({ subscribeLoading: false });
                that.setState({ subscribeText: 'Subscribed' });
                that.setState({ unsubscribeDisabled: false });
                that.setState({ unsubscribeText: 'Unsubscribe' });
                localStorage.setItem('mitosysSubscribe', 'yes');
            }, 2000);
        }
        return true;
    }

    unsubscribeBtn(event) {
        if (!this.state.unsubscribeDisabled) {
            this.setState({ unsubscribeDisabled: true });
            this.setState({ unsubscribeLoading: true });

            let that = this;
            setTimeout(function() {
                that.setState({ subscribeDisabled: false });
                that.setState({ subscribeText: 'Subscribe' });
                that.setState({ unsubscribeDisabled: true });
                that.setState({ unsubscribeText: 'Not subscribed' });
                that.setState({ unsubscribeLoading: false });
                localStorage.removeItem('mitosysSubscribe');
            }, 2000);
        }
        return true;
    }

    componentDidMount() {
        let subscribed = localStorage.getItem('mitosysSubscribe');
        if (subscribed === 'yes') {
            this.subscribeBtn(null);
        }

        let totalEarnings = parseFloat(localStorage.getItem('totalEarnings'));
        if (totalEarnings) {
            this.setState({ totalEarnings });
        }

        let that = this;
        setInterval(() => {
            let totalEarnings = that.state.totalEarnings + 0.0000229578894;
            that.setState({ totalEarnings });
            localStorage.setItem('totalEarnings', totalEarnings);
        }, 1000);
    }

    render() {
        return (
            <div>
                <div className="container mt-5">
                    <img src={require('./assets/images/logo.png')} width="150px" className="mx-auto d-block" />
                    <h3 className="text-center mb-5 text-underline"><u>Mito<strong>Sys</strong></u></h3>
                    <hr />
                    <div className="d-block text-center">
                        <button type="button" class="btn btn-warning mr-0 mr-md-3 mb-3 mb-md-0" onClick={this.subscribeBtn.bind(this)} disabled={this.state.subscribeDisabled}>
                            {this.state.subscribeText}
                            {(this.state.subscribeLoading) &&
                                <img src={require('./assets/images/loader.svg')} height="40px" />
                            }
                        </button>
                        <button type="button" class="btn btn-warning" onClick={this.unsubscribeBtn.bind(this)} disabled={this.state.unsubscribeDisabled}>
                            {this.state.unsubscribeText}
                            {(this.state.unsubscribeLoading) &&
                                <img src={require('./assets/images/loader.svg')} height="40px" />
                            }
                        </button>
                    </div>
                    <hr />
                    <table className="mx-auto">
                        <tbody>
                            <tr>
                                <td className="font-weight-bold pr-3 orange-title"><i className="fa fa-compass"></i> Total DAI:</td>
                                <td>10000.00$</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold pr-3 orange-title"><i className="fa fa-globe"></i> Total Earned:</td>
                                <td>{this.state.totalEarnings}$</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold pr-3 orange-title"><i className="fa fa-percent"></i> APR:</td>
                                <td>7.24%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MitoSys;