import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import * as lessonActions from '../actions/lesson';
import { DOMAIN } from '../config/dev';
import {
  ThStyled, TdStyled, CheckIcon, WrapperCheckIcon,
} from '../components/home/ClassStudents';
import Loading from '../components/common/Loading';

const WrapperQRCode = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TableCustom = styled.table`
  width: 70%;
  min-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;

const renderThead = () => (
  <thead className="thead-dark">
     <tr>
        <ThStyled scope="col">STT</ThStyled>
        <ThStyled scope="col">Họ và tên</ThStyled>
        <ThStyled scope="col">MSSV</ThStyled>
        <ThStyled scope="col">Lớp</ThStyled>
        <ThStyled scope="col">Ngày sinh</ThStyled>
        <ThStyled scope="col">Trạng thái</ThStyled>
     </tr>
  </thead>
);

const renderStudentsData = data => {
  if (!data || data.length === 0) {
    return (
      <tr>
        <TdStyled col="6">Không có danh sách sinh viên lớp</TdStyled>
      </tr>
    );
  }

  return data.map((item, index) => (
    <tr key={item.id}>
      <TdStyled>{index + 1}</TdStyled>
      <TdStyled>{item.name}</TdStyled>
      <TdStyled>{item.student_code}</TdStyled>
      <TdStyled>{item.class_name}</TdStyled>
      <TdStyled>{item.birth_day}</TdStyled>
      <TdStyled>
        {
          <WrapperCheckIcon>
            <span hidden={!item.is_rolled_up}>
              <CheckIcon
                className="fas fa-check"
                checked
              />
            </span>
            <span hidden={item.is_rolled_up}>
              <CheckIcon
                className="fas fa-ban"
                checked={false}
              />
            </span>
          </WrapperCheckIcon>
        }
      </TdStyled>
    </tr>
  ));
}

class LessonQRCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isBiggerZoom: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchLessonStudentsRolledUp();
    const pusher = new Pusher('e15757b4005659566b27', {
      cluster: 'ap1',
      app_id: '1007305',
      secret: '49a4fa27ec7afe5b5950',
      authEndpoint:  `${DOMAIN}/broadcasting/auth`,
    });
    const channel = pusher.subscribe('roll-up');
    channel.bind('App\\Events\\NotifyRollUpSuccess', (data) => {
      if (data.message === 'success') {
        this.fetchLessonStudentsRolledUp();
      }
    });
  }

  fetchLessonStudentsRolledUp() {
    const { actions, match } = this.props;
    const { lessonId } = match.params;
    actions.lessonActions.fetchLessonStudentsRolledUp(
      lessonId,
      '',
      0,
      () => {this.setState({ isLoading: false })},
      () => {this.setState({ isLoading: false })},
    );
  }

  renderTableData() {
    const { data } = this.props;
    const students = data.lesson.studentsRolledUp || [];

    return (
      <TableCustom className="table">
        {renderThead()}
        <tbody>
          {renderStudentsData(students)}
        </tbody>
      </TableCustom>
    );
  }

  render() {
    const { lessonId } = this.props.match.params;
    const { isBiggerZoom } = this.state;
    const size = isBiggerZoom
      ? window.innerHeight
      : window.innerHeight * 45 / 100;
    return (
      <div>
        <Loading isLoading={this.state.isLoading} />
        <WrapperQRCode>
          <QRCode
            id='qrcode'
            value={`http://192.168.0.5:8080/${lessonId}/roll-up`}
            size={size}
            level={'H'}
            includeMargin={true}
          />
          <button className="btn btn-primary" onClick={() => this.setState({ isBiggerZoom: !isBiggerZoom })}>
            {isBiggerZoom ? 'Thu nhỏ' : 'Mở rộng' }
          </button>
        </WrapperQRCode>
        {this.renderTableData()}
      </div>
    );
  }
}

LessonQRCode.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      lesson: state.lesson,
      me: state.auth.me,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      lessonActions: bindActionCreators(lessonActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LessonQRCode);
