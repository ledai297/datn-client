import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Row,
} from 'reactstrap';
import DatePicker from "react-datepicker";
import { WrapperDateTimeInput } from './LessonCreate'; 
import styled from 'styled-components';

const WrapperRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const WrapperAddIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Icon = styled.span`
  .fa-plus-circle {
    width: 27px;
    height: 27px;
    color: blue;
    cursor: pointer;
  }
`;

const SubtractIcon = styled.span`
  .fa-minus-circle {
    color: red;
    cursor: pointer;
  }
`;

const WrapperTotalLessons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

class LessonBatchCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleAddLesson = this.handleAddLesson.bind(this);
    this.handleChangeTotalLessons = this.handleChangeTotalLessons.bind(this);
  }
  
  componentDidMount() {
  }

  handleChangeTotalLessons(e) {
    this.props.handleChangeTotalLessons(Number(e.target.value));
  }

  handleChangeStartTime(startTime, index) {
    this.props.changeLessonStart(startTime, index);
  }

  handleChangeEndTime(endTime, index) {
    this.props.changeLessonEnd(endTime, index);
  }

  handleAddLesson() {
    this.props.handleAddLesson();
  }

  renderRow(index) {
    const { lessons } = this.props;
    return (
      <WrapperRow className="row mx-3 mt-3 mb-0" key={index}>
        <div>Bắt đầu</div>
        <WrapperDateTimeInput>
          <DatePicker
            selected={lessons[index].start}
            onChange={(time) => this.handleChangeStartTime(time, index)}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
          />
        </WrapperDateTimeInput>
        <div>Kết thúc</div>
        <WrapperDateTimeInput>
          <DatePicker
            selected={lessons[index].end}
            onChange={(time) => this.handleChangeEndTime(time, index)}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="Pp"
          />
        </WrapperDateTimeInput>
        <SubtractIcon onClick={() => this.props.handleDeleteLesson(index)}>
          <i className="fas fa-minus-circle" />
        </SubtractIcon>
      </WrapperRow>
    );
  }

  render() {
    const { lessons } = this.props;
    return (
      <div>
        <WrapperTotalLessons>
          <form className="mt-2">
            <div className="form-group row">
              <label className="col-form-label">Tổng số buổi học</label>
              <div className="col-6">
                <input
                  type="number"
                  className="form-control"
                  onChange={this.handleChangeTotalLessons}
                />
              </div>
            </div>
          </form>
        </WrapperTotalLessons>
        {
          lessons && lessons.length > 0
            ? lessons.map((item, index) => this.renderRow(index))
            : null
        }
        <WrapperAddIcon>
          <Icon className="mt-2" onClick={this.handleAddLesson}>
            <i className="fas fa-plus-circle" />
          </Icon>
        </WrapperAddIcon>
      </div>
    );
  }
}

LessonBatchCreate.propTypes = {
  changeLessonStart: PropTypes.func.isRequired,
  changeLessonEnd: PropTypes.func.isRequired,
  handleAddLesson: PropTypes.func.isRequired,
  handleDeleteLesson: PropTypes.func.isRequired,
  handleChangeTotalLessons: PropTypes.func.isRequired,
  lessons: PropTypes.array.isRequired,
};

export default LessonBatchCreate;
