import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as lessonActions from '../actions/lesson';
import * as authActions from '../actions/auth';
import styled from 'styled-components';
import LessonCreate from '../components/lesson/LessonCreate';
import { convertToUTCTime, convertToLocalTime } from '../helpers/utils';
import { NotificationManager} from 'react-notifications';
import Header from '../components/common/Header';
import Pagination from 'rc-pagination';
import { Link } from 'react-router-dom';
import LessonDelete from '../components/lesson/LessonDelete';
import LessonConfirm from '../components/lesson/LessonConfirm';
import DatePicker from "react-datepicker";

const renderThead = () => (
  <thead className="thead-dark">
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Ngày</th>
      <th scope="col">Giờ bắt đầu</th>
      <th scope="col">Giờ kết thúc</th>
      <th />
      <th />
      <th />
    </tr>
  </thead>
);

const WrapperClassDetail = styled.div`
  width: 100%;
  color: #007bff;
  font-weight: 600;
  margin: 10px 0px;
  font-size: 1.3em;
`;

const WrapperDateTimeInput = styled.div`
  input {
    font-size: 13px;
    border-radius: 4px;
    box-shadow: inset 0 2px 2px #e9e9e9;
    border: 1px solid #aeaeae;
    line-height: 16px;
    padding: 6px 10px 5px;
  }
`;

const WrapperDates = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 400px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const CreateIcon = styled.span`
  margin-right: 0.5rem;
`;

const ButtonCustom = styled.button`
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'} !important;
`;

class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenDeleteLessonModal: false,
      lessonId: 0,
      start: null,
      end: null,
    };

    this.openModal = this.openModal.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.createLesson = this.createLesson.bind(this);
    this.redirectToQRCodeScreen = this.redirectToQRCodeScreen.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.fetchLessons = this.fetchLessons.bind(this);
    this.goToLessonStudentsDetail = this.goToLessonStudentsDetail.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);
    this.onSuccessDelete = this.onSuccessDelete.bind(this);
    this.onErrorDelete = this.onErrorDelete.bind(this);
    this.closeDeleteLessonModal = this.closeDeleteLessonModal.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleCreateQRCode = this.handleCreateQRCode.bind(this);
    this.onSuccessSetStartRollUpTime = this.onSuccessSetStartRollUpTime.bind(this);
  }

  componentDidMount() {
    const { match, data } = this.props;
    const { id } = match.params;
    const { start, end } = this.state;
    this.fetchLessons(id, 1, data.lesson.perPage, start, end);
  }

  onSuccess() {
    const { match, data } = this.props;
    const { id } = match.params;
    const { start, end } = this.state;
    this.fetchLessons(id, data.lesson.currentPage, data.lesson.perPage, start, end);
    this.setState({ isOpen: false, isLoading: false });
  }

  onError(err) {
    this.setState({ isLoading: false });
    let errorMessage = '';
    const { data } = err.response;
    errorMessage = data.error;
    NotificationManager.error(errorMessage, 'Lỗi', 3000);
  }

  onSuccessDelete(response) {
    const { match, data } = this.props;
    const { start, end } = this.state;
    this.setState({ isOpenDeleteLessonModal: false });
    if (response.code < 300) {
      const { id } = match.params;
      this.fetchLessons(id, data.lesson.currentPage, data.lesson.perPage, start, end);
      NotificationManager.success('Xóa lớp học thành công', 'Success',3000);
    } else {
      NotificationManager.error(response.error, 'Error',3000);
    }
  }

  onSuccessSetStartRollUpTime(response) {
    if (response.code === 200) {
      this.props.history.push(`/${response.lesson_id}/qr-code`);
    } else {
      NotificationManager.error(response.error, 'Lỗi', 3000);
    }
  }

  onErrorDelete() {
    this.setState({ isOpenDeleteLessonModal: false });
    NotificationManager.error('Lỗi server', 3000);
  }

  handleFilter() {
    const { match, data } = this.props;
    const { id } = match.params;
    const { start, end } = this.state;
    this.fetchLessons(id, 1, data.lesson.perPage, start, end);
  }

  fetchLessons(classId, currentPage, perPage, start, end) {
    const { actions } = this.props;
    actions.lesson.fetchLessons(
      classId,
      currentPage,
      perPage,
      start,
      end,
      () => {},
      () => {},
    );
  }

  handleChangePage(currentPage) {
    const { match, data } = this.props;
    const { id } = match.params;
    const { start, end } = this.state;
    this.fetchLessons(id, currentPage, data.lesson.perPage, start, end);
  }

  handleCreateQRCode(lessonId) {
    const { actions } = this.props;
    console.log('actions: ', actions);
    const start = convertToUTCTime(new Date());
    actions.lesson.setStartRollUpTime(lessonId, start, this.onSuccessSetStartRollUpTime, () => {});
  }

  openDeleteLessonModal() {
    this.setState({ isOpenDeleteLessonModal: true });
  }

  closeDeleteLessonModal() {
    this.setState({ isOpenDeleteLessonModal: false });
  }

  openModal() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  deleteLesson() {
    const { actions } = this.props;
    const { lessonId } = this.state;
    actions.lesson.deleteLesson(
      lessonId,
      this.onSuccessDelete,
      this.onErrorDelete,
    );
  }

  createLesson(startTime, endTime) {
    const { actions, match } = this.props;
    const { id } = match.params;

    const start = convertToUTCTime(startTime);
    const end = convertToUTCTime(endTime);
    actions.lesson.createLesson(id, start, end, this.onSuccess, this.onError);
  }

  orderLessons(lessons) {
    const lessonsWithLoacalTime = lessons.map(item => ({
      ...item,
      start: convertToLocalTime(item.start_time),
      end: convertToLocalTime(item.end_time),
    }));
    let orderedLessons = [];
    const now = new Date();
    for (let i = 0; i < lessonsWithLoacalTime.length; i += 1) {
      const lessonDate = new Date(lessonsWithLoacalTime[i].start);
      if (lessonDate.getDate() === now.getDate()
        && lessonDate.getMonth() === now.getMonth()
        && lessonDate.getFullYear() === now.getFullYear()) {
          orderedLessons = [ lessonsWithLoacalTime[i], ...orderedLessons ];
      } else {
        orderedLessons = [ ...orderedLessons, lessonsWithLoacalTime[i] ];
      }
    }

    return orderedLessons;
  }

  redirectToQRCodeScreen() {
    const { history, match } = this.props;
    const { id } = match.params;
    history.push(`/${id}/qr-code`);
  }

  goToLessonStudentsDetail(id) {
    const { history, match } = this.props;
    history.replace(`lesson/${id}/students`);
  }

  renderClassDetail() {
    const { lesson } = this.props.data;
    const subjectName = lesson.classDetail.subject_name ? lesson.classDetail.subject_name : '';
    const subjectCode = lesson.classDetail.subject_code ? lesson.classDetail.subject_code : '';
    const classCode = lesson.classDetail.class_code ? lesson.classDetail.class_code : '';
    return (
      <WrapperClassDetail>
        <div>
          <span>Mã lớp: {classCode}</span>
        </div>
        <div>{subjectName} ({subjectCode})</div>
      </WrapperClassDetail>
    )
  }

  renderFilterByDates() {
    const { start, end } = this.state;

    return (
      <WrapperDates>
        <WrapperDateTimeInput className="mr-2">
          <label>Từ ngày</label>
          <DatePicker
            selected={start}
            onChange={(date) => { this.setState({ start: date })}}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            maxDate={end}
          />
        </WrapperDateTimeInput>
        
        <WrapperDateTimeInput className="mr-2">
          <label>Đến ngày</label>
          <DatePicker
            selected={end}
            onChange={(date) => { this.setState({ end: date })}}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
            minDate={start}
          />
        </WrapperDateTimeInput>
        <button
          className="btn btn-primary mr-2"
          onClick={this.handleFilter}
        >Tìm kiếm</button>
      </WrapperDates>
    )
  }

  renderTopBar() {
    return (
      <TopBar>
        <button
          type="button"
          onClick={() => this.props.history.push('/')}
          className="btn btn-primary"
          style={{ fontSize: '12px' }}
        >
          <span className="mr-2">
            <i className="fas fa-arrow-left" />
          </span>
          Danh sách lớp
        </button>
        <RightBlock>
          {this.renderFilterByDates()}
          <button type="button" className="btn btn-primary" onClick={this.openModal}>
            <CreateIcon><i className="fas fa-plus-circle" /></CreateIcon>
            Tạo buổi học
          </button>
        </RightBlock>
      </TopBar>
    );
  }

  renderLessonsData() {
    const { lesson } = this.props.data;

    if (!lesson.data || lesson.data.length == 0) {
      return (
        <tr col="4">
          <td>Không có dữ liệu tiết học</td>
        </tr>
      );
    }

    const orderedLessons = this.orderLessons(lesson.data);

    return orderedLessons.map((item, index) => {
      const start = convertToLocalTime(item.start_time);
      const end = convertToLocalTime(item.end_time);
      const isInLessonTime = new Date(start).getTime() < new Date().getTime()
        && new Date().getTime() < new Date(end).getTime();

      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{dayjs(start).format('DD/MM/YYYY')}</td>
          <td>{dayjs(start).format('HH:mm:ss')}</td>
          <td>{dayjs(end).format('HH:mm:ss')}</td>
          <td>
            <button
              type="button"
              className="btn btn-info"
            >
              <Link to={`/lesson/${item.id}/students`}>
                Chi tiết
              </Link>
            </button>
          </td>
          <td>
            <ButtonCustom
              type="button"
              className={`btn ${item.is_confirmed ? 'btn-secondary' : 'btn-danger'}`}
              onClick={
                item.is_confirmed
                  ? () => {}
                  : () => {
                    this.setState({ isOpenDeleteLessonModal: true, lessonId: item.id });
                  }
              }
              isDisabled={item.is_confirmed}
            >
              Xóa
            </ButtonCustom>
          </td>
          <td>
            {
              isInLessonTime
                ? <button
                    type="button"
                    className="btn btn-primary"
                    onClick={
                      item.start_roll_up_time
                        ? () => { this.props.history.push(`/${item.id}/qr-code`)}
                        : () => this.handleCreateQRCode(item.id)
                    }
                  >
                    {
                      item.start_roll_up_time
                        ? 'QRCode'
                        : 'Tạo QRCode'
                    }
                  </button>
                : null
            }
          </td>
        </tr>
      );
    }
    );
  }

  renderLessonsTable() {
    const { data } = this.props;

    return (
      <table className="table">
        {renderThead()}
        <tbody>
          {this.renderLessonsData()}
        </tbody>
      </table>
    );
  }

  render() {
    const { data, actions, history, match } = this.props;
    const { isOpen } = this.state;
    const { id } = match.params;

    return (
      <div className="container">
        <Header
          me={data.me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
          history={history}
        />
        {this.renderClassDetail()}
        {this.renderTopBar()}
        {this.renderLessonsTable()}
        <Pagination
          current={data.lesson.currentPage}
          total={data.lesson.total}
          pageSize={data.lesson.perPage}
          onChange={this.handleChangePage}
        />
        <LessonCreate
          isOpen={isOpen}
          toggle={this.openModal}
          createLesson={this.createLesson}
          batchCreateLessons={actions.lesson.batchCreateLessons}
          classId={Number(id)}
          fetchLessons={this.handleChangePage}
        />
        <LessonDelete
          isOpen={this.state.isOpenDeleteLessonModal}
          closeModal={this.closeDeleteLessonModal}
          deleteLesson={this.deleteLesson}
        />
      </div>
    );
  }
}

Lesson.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
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
      lesson: bindActionCreators(lessonActions, dispatch),
      auth: bindActionCreators(authActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
