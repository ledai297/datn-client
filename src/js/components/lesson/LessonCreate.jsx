import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
  Nav, NavItem, NavLink, TabContent,
} from 'reactstrap';
import DatePicker from "react-datepicker";
import classnames from 'classnames';
import LessonBatchCreate from './LessonBatchCreate';
import Loading from '../common/Loading';
import { NotificationManager } from 'react-notifications';

const ModalCustom = styled(Modal)`
  max-width: 700px !important;
`;

export const WrapperDateTimeInput = styled.div`
  input {
    font-size: 13px;
    border-radius: 4px;
    box-shadow: inset 0 2px 2px #e9e9e9;
    border: 1px solid #aeaeae;
    line-height: 16px;
    padding: 6px 10px 5px;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  height: 18px !important;
`;

const NavItemCustom = styled(NavItem)`
  cursor: pointer;
`;

const LESSON_TABS = {
  CREATE: { id: 1 },
  BATCH_CREATE: { id: 2 }, 
};

class LessonCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: {
        value: null,
        error: '',
      },
      endTime: {
        value: null,
        error: '',
      },
      lessons: [
        {
          start: null,
          end: null,
        },
      ],
      currentTab: LESSON_TABS.CREATE.id,
      isLoading: false,
      totalLessons: 0,
    };

    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleCreateLesson = this.handleCreateLesson.bind(this);
    this.handleChangeActiveTab = this.handleChangeActiveTab.bind(this);
    this.batchCreateLessons = this.batchCreateLessons.bind(this);
    this.onSuccessBatchCreate = this.onSuccessBatchCreate.bind(this);
    this.onErrorBatchCreate = this.onErrorBatchCreate.bind(this);
    this.changeLessonStart = this.changeLessonStart.bind(this);
    this.changeLessonEnd = this.changeLessonEnd.bind(this);
    this.handleAddLesson = this.handleAddLesson.bind(this);
    this.handleDeleteLesson = this.handleDeleteLesson.bind(this);
    this.handleChangeTotalLessons = this.handleChangeTotalLessons.bind(this);
  }
  
  componentDidMount() {
  }

  isFormValid() {
    const { startTime, endTime } = this.state;

    return startTime.value && endTime.value;
  }

  getErrorBatchCreate(lessons, totalLessons) {
    if (!totalLessons) {
      return 'Số buổi học phải lớn hơn 0';
    }

    if (!lessons || lessons.length === 0) {
      return 'Không để danh sách buổi học trống';
    }

    if (lessons.find(item => !item.start || !item.end)) {
      return 'Không để thời gian bắt đầu hoặc kết thúc buổi học trống';
    }

    if (lessons.find(item => item.start.getTime() > item.end.getTime())) {
      return 'Thời gian bắt đầu buổi học phải trước thời gian kết thúc buổi học';
    }

    for (let i = 0; i < lessons.length; i += 1) {
      for (let j = 0; j < lessons.length; j += 1) {
        if (i !== j) {
          if (
            lessons[j].start.getTime() > lessons[i].start.getTime()
            && lessons[j].start.getTime() < lessons[i].end.getTime()
          ) {
            return 'Thời gian buổi học bị trùng';
          }
        }
      }
    }

    return '';
  }

  setErrors() {
    const { startTime, endTime } = this.state;
    startTime.error = startTime.value ? '' : 'Thêm giá trị cho trường bắt đầu';
    endTime.error = endTime.value ? '' : 'Thêm giá trị cho trường kết thúc';
    this.setState({ startTime, endTime });
  }

  resetState() {
    const newState = {
      startTime: {
        value: null,
        error: '',
      },
      endTime: {
        value: null,
        error: '',
      },
      lessons: [
        {
          start: null,
          end: null,
        },
      ],
      currentTab: LESSON_TABS.CREATE.id,
      isLoadingBatchCreate: false,
      totalLessons: 0,
    };
    this.setState(newState);
  }

  onSuccessBatchCreate(response) {
    console.log(response);
    this.setState({ isLoading: false });
    if (response.code <= 300) {
      this.props.toggle();
      this.resetState();
      NotificationManager.success('Tạo mới buổi học thành công');
      this.props.fetchLessons(1);
    } else {
      NotificationManager.error(response.error);
    }
  }

  onErrorBatchCreate() {
    this.setState({ isLoading: false });
    NotificationManager.error(
      'Lỗi server',
      'Lỗi',
      3000,
    );
  }

  batchCreateLessons() {
    const { batchCreateLessons, classId } = this.props;
    const { lessons, totalLessons } = this.state;

    const error = this.getErrorBatchCreate(lessons, totalLessons);

    if (error) {
      NotificationManager.error(error, 'Form không hợp lệ', 3000);
      return;
    }

    this.setState({ isLoading: true });
    batchCreateLessons(
      classId,
      lessons,
      totalLessons,
      this.onSuccessBatchCreate,
      this.onErrorBatchCreate,
    );
  }

  changeLessonStart(startTime, index) {
    const { lessons } = this.state;
    lessons[index].start = startTime;
    this.setState({ lessons });
  }

  changeLessonEnd(endTime, index) {
    const { lessons } = this.state;
    lessons[index].end = endTime;
    this.setState({ lessons });
  }

  handleAddLesson() {
    const { lessons } = this.state;
    const newLesson = {
      start: null,
      end: null,
    };
    this.setState({ lessons: [ ...lessons, newLesson ]});
  }

  handleDeleteLesson(index) {
    const { lessons } = this.state;
    const newLessons = lessons.filter((item, i) => i !== index);
    this.setState({ lessons: newLessons });
  }

  handleChangeTotalLessons(value) {
    this.setState({ totalLessons: value });
  }

  handleFocus(type) {
    const currentState = { ...this.state };
    currentState[type].isFocus = true;
    this.setState(currentState);
  }

  handleBlur(type) {
    const currentState = { ...this.state };
    currentState[type].isFocus = false;
    this.setState(currentState);
  }

  handleChangeStartTime(date) {
    const { startTime } = this.state;
    startTime.value = date;
    this.setState({ startTime });
  }

  handleChangeEndTime(date) {
    const { endTime } = this.state;
    endTime.value = date;
    this.setState({ endTime });
  }

  handleCreateLesson() {
    const { createLesson } = this.props;
    const { startTime, endTime } = this.state;
    if (this.isFormValid()) {
      createLesson(startTime.value, endTime.value);
    }
    this.setErrors();
  }

  handleChangeActiveTab(tabId) {
    this.setState({ currentTab: tabId });
  }

  renderCreateForm() {
    const { startTime, endTime } = this.state;

    return (
      <div>
        <div className="row mx-3 mt-3 mb-0">
          <div className="col-3">Bắt đầu</div>
          <WrapperDateTimeInput className="col-9">
            <DatePicker
              selected={startTime.value}
              onChange={this.handleChangeStartTime}
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              dateFormat="Pp"
              maxDate={endTime.value}
            />
          </WrapperDateTimeInput>
        </div>
        {
          startTime.error
            ? (<Error className="row mx-3">
                <div className="offset-3 col-9">{startTime.error}</div>
              </Error>)
            : null
        }
        <div className="row mx-3 mt-3 mb-0">
          <div className="col-3">Kết thúc</div>
          <WrapperDateTimeInput className="col-9">
            <DatePicker
              selected={endTime.value}
              onChange={this.handleChangeEndTime}
              showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              dateFormat="Pp"
              minDate={startTime.value}
            />
          </WrapperDateTimeInput>
        </div>
        {
          endTime.error
            ? (<Error className="row mx-3">
                <div className="offset-3 col-9">{endTime.error}</div>
              </Error>)
            : null
        }
      </div>
    );
  }

  renderModalBody() {
    const { currentTab } = this.state;
    return (
      <div>
        <Nav tabs>
        <NavItemCustom>
          <NavLink
            className={classnames({ active: currentTab === 1 })}
            onClick={() => { this.handleChangeActiveTab(1); }}
          >
            Tạo
          </NavLink>
        </NavItemCustom>
        <NavItemCustom>
          <NavLink
            className={classnames({ active: currentTab === 2 })}
            onClick={() => { this.handleChangeActiveTab(2); }}
          >
            Tạo hàng loạt
          </NavLink>
        </NavItemCustom>
        </Nav>
        <TabContent>
          {
            currentTab === 1
              ? this.renderCreateForm()
              : <LessonBatchCreate
                  changeLessonStart={this.changeLessonStart}
                  changeLessonEnd={this.changeLessonEnd}
                  handleAddLesson={this.handleAddLesson}
                  handleDeleteLesson={this.handleDeleteLesson}
                  handleChangeTotalLessons={this.handleChangeTotalLessons}
                  lessons={this.state.lessons}
                />
          }
        </TabContent>
      </div>
    )
  }

  render() {
    const { isOpen, toggle } = this.props;
    const { currentTab, isLoading } = this.state;

    return (
      <ModalCustom isOpen={isOpen} toggle={toggle}>
        <Loading isLoading={isLoading} />
        <ModalHeader toggle={toggle}>
          {
            currentTab === LESSON_TABS.CREATE.id
              ? 'Tạo 1 buổi học'
              : 'Tạo nhiều buổi học'
          }
        </ModalHeader>

        <ModalBody>
          {this.renderModalBody()}
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={toggle}>Hủy</Button>
          <Button
            color="primary"
            onClick={
                      currentTab === LESSON_TABS.CREATE.id
                        ? () => this.handleCreateLesson()
                        : () => this.batchCreateLessons()
                    }
          >Tạo</Button>
        </ModalFooter>
      </ModalCustom>
    );
  }
}

LessonCreate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  createLesson: PropTypes.func.isRequired,
  batchCreateLessons: PropTypes.func.isRequired,
  classId: PropTypes.number.isRequired,
  fetchLessons: PropTypes.func.isRequired,
};

export default LessonCreate;
