import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Friend extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.friends.map(friend => <h4 key={friend.name}>{friend.name}</h4>)}
      </div>
    );
  }
}

Friend.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Friend;
