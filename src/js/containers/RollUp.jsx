import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lessonActions from '../actions/lesson';
import * as studentActions from '../actions/student';
import RollUpComponent from '../components/rollUp/RollUp';
import { NotificationManager} from 'react-notifications';
import Fingerprint2 from 'fingerprintjs2';
import styled from 'styled-components';

const Title = styled.div`
  width: 100%;
  text-align: center;
  color: #0366d6;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #020783;
  }
`;

class RollUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.oSuccessRollUp = this.oSuccessRollUp.bind(this);
    this.onErrorRollUp = this.onErrorRollUp.bind(this);
    this.handleRollUp = this.handleRollUp.bind(this);
  }

  componentDidMount() {
    this.fetchClassByLessonId();
    
  }

  onSuccess() {
    this.setState({ isLoading: false });
  }

  onError() {
    this.setState({ isLoading: false });
  }

  oSuccessRollUp(response) {
    const { data } = response;
    const { match, history } = this.props;
    if (200 < parseInt(data.code) && parseInt(data.code) < 300) {
      NotificationManager.success('Sinh viên điểm danh thành công');
    } else {
      NotificationManager.error(data.error, 'Lỗi', 3000);
    }
  }

  onErrorRollUp(error) {
    console.log('error', error);
  }

  handleRollUp(studentCode) {
    const { actions, match } = this.props;
    const { lessonId } = match.params;
    Fingerprint2.get({}, (components) => {
      const values = components.map(item => item.value);
      const deviceId = Fingerprint2.x64hash128(values.join(''), 31);
      actions.studentActions.rollUp(lessonId, studentCode, deviceId, this.oSuccessRollUp, this.onErrorRollUp);
    });
  }

  fetchClassByLessonId() {
    const { match, actions } = this.props;
    this.setState({ isLoading: true });
    const { lessonId } = match.params;
    actions.lessonActions.fetchClassByLessonId(lessonId, this.onSuccess, this.onError);
  }

  render() {
    const { data, match } = this.props;
    return (
      <div>
        <RollUpComponent
          classDetail={data.lesson.classDetail}
          isLoading={this.state.isLoading}
          rollUp={this.handleRollUp}
        />
      </div>
    );
  }
}

RollUp.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      lesson: state.lesson,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      lessonActions: bindActionCreators(lessonActions, dispatch),
      studentActions: bindActionCreators(studentActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RollUp);
