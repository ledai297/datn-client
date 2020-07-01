import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WrapperLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: gray;
  opacity: 0.7;
  z-index: 999;

  span {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
  }
`;

class Loading extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { isLoading } = this.props;

    if (!isLoading) {
      return null;
    }

    return (
      <WrapperLoading>
        <span>
          <i class="fas fa-spinner" />
        </span>
      </WrapperLoading>
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default Loading;
