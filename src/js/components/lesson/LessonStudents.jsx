import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ThStyled, TdStyled, CheckIcon, WrapperCheckIcon,
} from '../home/ClassStudents';
import { convertToLocalTime } from '../../helpers/utils';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';
import { getToken } from '../../helpers/storage';

const Container = styled.div`
  margin-top: 1em;
`;

const SubjectNameTitle = styled.div`
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  color: blue;

  span:first-child {
    font-size: 20px;
    font-weight: 600;
  }
`;

const Title = styled.span`
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
        <ThStyled scope="col"></ThStyled>
     </tr>
  </thead>
);

const renderStudentsData = (data) => {
  if (!data || data.length === 0) {
    return (
      <tr>
        <TdStyled col="5">Không có danh sách sinh viên lớp</TdStyled>
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
      {
        getToken()
          ? (<TdStyled>
              <button type="button" className="btn btn-primary">
                Thay đổi
              </button>
            </TdStyled>)
          : null
      }
    </tr>
  ));
};

class LessonStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: 0,
    };
  }

  renderTableData() {
    const { students } = this.props;

    return (
      <table className="table">
        {renderThead()}
        <tbody>
          {this.renderStudentsData(students)}
        </tbody>
      </table>
    );
  }

  renderModal() {
    const { toggleRollUp, isOpen, closeModal } = this.props;
    const { studentId } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={() => closeModal()}>
        <ModalHeader toggle={() => closeModal()}>
          Thay đổi trạng thái điểm danh
        </ModalHeader>

        <ModalBody>
          Bạn có muốn thay đổi trạng thái điểm danh của sinh viên?
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={() => closeModal()}>Hủy</Button>
          <Button color="primary" onClick={() => toggleRollUp(studentId)}>Đồng ý</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderStudentsData (data) {
    if (!data || data.length === 0) {
      return (
        <tr>
          <TdStyled col="7">Không có danh sách sinh viên lớp</TdStyled>
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
        <TdStyled>
          <button
            type="button"
            className={`btn ${item.is_rolled_up ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => {
              this.props.openModal();
              this.setState({ studentId: item.id });
            }}
          >
            {
              item.is_rolled_up ? 'Hủy điểm danh' : 'Điểm danh'
            }
          </button>
        </TdStyled>
      </tr>
    ));
  }

  render() {
    const { detail } = this.props;

    return (
      <Container className="container">
        <SubjectNameTitle>
          <span>{detail.subject_name} {' '}</span>
          <Title>({convertToLocalTime(detail.start_time)}</Title>
          <span>{`   -   `}</span>
          <Title>{convertToLocalTime(detail.end_time)})</Title>
        </SubjectNameTitle>
        {this.renderTableData()}
        {this.renderModal()}
      </Container>
    );
  }
}

LessonStudents.propTypes = {
  students: PropTypes.array.isRequired,
  detail: PropTypes.object.isRequired,
  toggleRollUp: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default LessonStudents;
