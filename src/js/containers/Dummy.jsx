import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/dummy';
import User from '../components/dummy/User';
import Friend from '../components/dummy/Friend';

class Dummy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onLoading = this.onLoading.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onLoading(value) {
    this.setState({
      isLoading: value,
    });
  }

  onSuccess() {
    this.onLoading(false);
  }

  onError(err) {
    try {
      const { status } = err.response;
      switch (status) {
        case 404:
          break;

        case 401:
          break;

        default: break;
      }
    } catch (e) {
      // Do something
    } finally {
      this.onLoading(false);
    }
  }

  fetchData() {
    this.onLoading(true);
    this.props.actions.dummy.fetchData(this.onSuccess, this.onError);
  }

  render() {
    const { data } = this.props;
    if (this.state.isLoading) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    return (
      <div>
        <User user={data.dummy.user} />
        <h1>Friends:</h1>
        <Friend friends={data.dummy.friends} />
      </div>
    );
  }
}

Dummy.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      dummy: state.dummy,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      dummy: bindActionCreators(actions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dummy);
