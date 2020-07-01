import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as authActions from '../actions/auth';
import * as lessonActions from '../actions/lesson';
import LessonStudentsComponent from '../components/lesson/LessonStudents';
import Header from '../components/common/Header';
import { NotificationManager} from 'react-notifications';
import LessonConfirm from '../components/lesson/LessonConfirm';
import Loading from '../components/common/Loading';

const WrapperSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-item: center;

  select {
    width: auto;
  }
  
  input {
    width: 30%;
    min-width: 250px;
    margin-left: auto;
  }
`;

const ActionsBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrapperNavigationBtns = styled.div`
  width: 30%;
  display: flex;
  jusify-content: flex-start;
  align-items: center;
  min-width: 250px;

  button {
    font-size: 12px;
  }
`;

const ROLL_UP_OPTIONS = [
  { id: 1, label: 'Điểm danh' },
  { id: 0, label: 'Chưa điểm danh' },
  { id: -1, label: 'Tất cả' },
];

class LessonStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModalConfirm: false,
      isOpenConfirmModal: false,
      keySearch: '',
      isLoading: false,
      rollUpOption: -1,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleRollUp = this.toggleRollUp.bind(this);
    this.onSuccessToggleRollUp = this.onSuccessToggleRollUp.bind(this);
    this.onErrorToggleRollUp = this.onErrorToggleRollUp.bind(this);
    this.confirmLesson = this.confirmLesson.bind(this);
    this.onSuccessConfirmLesson = this.onSuccessConfirmLesson.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { lessonId } = match.params;
    const { keySearch } = this.state;
    this.fetchClassStudentsRolledUp(lessonId, keySearch, -1);
  }

  onSuccessConfirmLesson(data) {
    this.setState({ isLoading: false });
    const { match } = this.props;
    const { lessonId } = match.params;
    if (data.code < 300) {
      const { keySearch, rollUpOption } = this.state;
      this.fetchClassStudentsRolledUp(lessonId, keySearch, rollUpOption);
      NotificationManager.success('Xác nhận thành công', 'Success', 3000);
    } else {
      NotificationManager.error(data.error, 'Lỗi', 3000);
    }
    this.setState({ isOpenConfirmModal: false });
  }

  onSuccessToggleRollUp() {
    this.setState({ isLoading: false });
    const { match } = this.props;
    const { lessonId } = match.params;
    const { keySearch, rollUpOption } = this.state;
    this.fetchClassStudentsRolledUp(lessonId, keySearch, rollUpOption);
    this.closeModal();
    NotificationManager.success('Thay đổi trạng thái thành công', 'Success', 3000);
  }

  onErrorToggleRollUp() {
    this.setState({ isLoading: false });
    this.setState({ isOpen: false });
    NotificationManager.error('Thay đổi trạng thái không thành công', 'Error', 3000);
  }

  openModal() {
    this.setState({ isOpenModalConfirm: true });
  }

  backToLessonsScreen() {
    const { detail } = this.props.data.lesson;
    this.props.history.push(`/classes/${detail.class_id}/lessons`)
  }

  closeModal() {
    this.setState({ isOpenModalConfirm: false });
  }

  fetchClassStudentsRolledUp(lessonId, keySearch, rollUp) {
    this.setState({ isLoading: true });
    const { actions } = this.props;
    actions.lessonActions.fetchLessonStudentsRolledUp(
      lessonId,
      keySearch,
      rollUp,
      () => {this.setState({ isLoading: false })},
      () => {this.setState({ isLoading: false })},
    );
  }

  confirmLesson() {
    const { actions, match } = this.props;
    const { lessonId } = match.params;
    actions.lessonActions.confirmLesson(
      lessonId,
      this.onSuccessConfirmLesson,
      () => {this.setState({ isLoading: false })},
    );
  }

  toggleRollUp(studentId) {
    const { actions, match } = this.props;
    const { lessonId } = match.params;
    this.setState({ isLoading: true });
    actions.lessonActions.toggleRollUp(
      lessonId,
      studentId,
      this.onSuccessToggleRollUp,
      this.onErrorToggleRollUp,
    )
  }

  handleSearch(e) {
    if (e.which === 13) {
      const { match } = this.props;
      const { lessonId } = match.params;
      const { keySearch, rollUpOption } = this.state;
      this.fetchClassStudentsRolledUp(lessonId, keySearch, rollUpOption);
    } 
  }

  handleFilter(e) {
    const { match } = this.props;
    const { lessonId } = match.params;
    const { keySearch } = this.state;
    this.setState({ rollUpOption: e.target.value });
    this.fetchClassStudentsRolledUp(lessonId, keySearch, e.target.value);
  }

  render() {
    const { data, actions, history } = this.props;
    const { isOpenModalConfirm, isLoading } = this.state;
    const lessonDetail = data.lesson.detail;

    return (
      <div className="container">
        <Loading isLoading={isLoading} />
        <Header
          me={data.me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
          history={history}
        />
        <ActionsBar>
          <WrapperNavigationBtns>
            <button
              type="button"
              onClick={() => { this.props.history.push('/') }}
              className="btn btn-primary mr-2"
            >
              Danh sách lớp
            </button>
            <button
              type="button"
              onClick={() => this.backToLessonsScreen()}
              className="btn btn-primary"
            >
              <span className="mr-2">
                <i className="fas fa-arrow-left" />
              </span>
              Danh sách buổi học
            </button>
          </WrapperNavigationBtns>
          <button
            type="button"
            className={`btn mt-3 ${lessonDetail && lessonDetail.is_confirmed ? 'btn-secondary' : 'btn-primary'}`}
            onClick={
              lessonDetail && lessonDetail.is_confirmed
                ? () => {}
                : () => this.setState({ isOpenConfirmModal: true })
            }
          >
            Xác nhận
          </button>
        </ActionsBar>
        <WrapperSearch className="my-2">
          <select
            className="form-control"
            onChange={e => this.handleFilter(e)}
            value={this.state.rollUpOption}
          >
            {
              ROLL_UP_OPTIONS.map(
                item => <option key={Math.random()} value={item.id}>{item.label}</option>
              )
            }
          </select>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="MSSV"
              onChange={(e) => { this.setState({ keySearch: e.target.value }) }}
              onKeyPress={this.handleSearch}
            />
          </div>
        </WrapperSearch>
        <LessonStudentsComponent
          students={data.lesson.studentsRolledUp}
          detail={data.lesson.detail}
          toggleRollUp={this.toggleRollUp}
          isOpen={isOpenModalConfirm}
          closeModal={this.closeModal}
          openModal={this.openModal}
        />
        <LessonConfirm
          isOpen={this.state.isOpenConfirmModal}
          closeModal={() => this.setState({ isOpenConfirmModal: false })}
          confirmLesson={this.confirmLesson}
        />
      </div>
    );
  }
}

LessonStudents.propTypes = {
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
      auth: bindActionCreators(authActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LessonStudents);