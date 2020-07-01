import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Account extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>Account</div>
    );
  }
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Account;
