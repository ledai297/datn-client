import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from '../common/Loading';

const Container = styled.div`
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  white-space: wrap;
`;

const WrapperText = styled.div`
  justify-content: center;
  width: 100%;
`;

const TextContent = styled.span`
  color: blue;
  font-size: 26px;
  margin-y: 20px;
`;

const WrapperForm = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Error = styled.span`
  font-size: 12px;
  color: red;
`;

class RollUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentCode: {
        value: '',
        error: '',
        isFocus: '',
      },
    };

    this.handleRollUp = this.handleRollUp.bind(this);
    this.handleChangeStudentCode = this.handleChangeStudentCode.bind(this);
    this.handleFocusStudentCode = this.handleFocusStudentCode.bind(this);
    this.handleBlurStudentCode = this.handleBlurStudentCode.bind(this);
  }

  componentDidMount() {}

  handleRollUp() {
    const { studentCode } = this.state;
    if (studentCode.value) {
      const { studentCode } = this.state;
      this.props.rollUp(studentCode);
    } else {
      studentCode.error = 'Mã số sinh viên là bắt buộc';
      this.setState({ studentCode });
    }
  }

  handleFocusStudentCode() {
    const { studentCode } = this.state;
    studentCode.isFocus = true;
    this.setState({ studentCode });
  }

  handleChangeStudentCode(e) {
    const { studentCode } = this.state;
    studentCode.value = e.target.value;
    studentCode.error = e.target.value ? '' : 'Mã số sinh viên là bắt buộc';
    this.setState({ studentCode });
  }

  handleBlurStudentCode() {
    const { studentCode } = this.state;
    console.log('studentCode', studentCode)
    if (!studentCode.value) {
      studentCode.error = 'Mã số sinh viên là bắt buộc';
    }
    studentCode.isFocus = false;
    this.setState({ studentCode });
  }

  render() {
    const { classDetail, isLoading } = this.props;
    const { studentCode } = this.state;

    return (
      <Container className="container">
        <Loading isLoading={isLoading} />
        <WrapperText className="row">
          <TextContent>{classDetail.subject_name}</TextContent>
          {' - '}
          <TextContent>{classDetail.subject_code}</TextContent>
        </WrapperText>
        <WrapperText className="row">
          <div className="col-4">Mã lớp</div>
          <span>{classDetail.class_code}</span>
        </WrapperText>

        <WrapperForm>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="mssv"
              placeholder="MSSV"
              value={this.state.studentCode.value}
              onChange={this.handleChangeStudentCode}
              onFocus={this.handleFocusStudentCode}
              onBlur={this.handleBlurStudentCode}
            />
            <Error>
              {
                studentCode.isFocus ? '' : studentCode.error
              }
            </Error>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleRollUp}
          >Điểm danh</button>
        </WrapperForm>
      </Container>
    );
  }
}

RollUp.propTypes = {
  classDetail: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rollUp: PropTypes.func.isRequired,
};

export default RollUp;
