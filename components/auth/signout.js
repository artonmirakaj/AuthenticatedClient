import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentDidMount() {
        this.props.signoutUser();
    }

    render() {
        return <div>You Have Successfully Signed Out</div>;
    }
}


export default connect(null, actions)(Signout);