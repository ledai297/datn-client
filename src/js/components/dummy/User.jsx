import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>
          User
        </h1>
        <h3>
          Id:
          {this.props.user.id}
        </h3>
        <h3>
          Name:
          {this.props.user.full_name}
        </h3>
      </div>
    );
  }
}

User.propTypes = {
};

export default User;
