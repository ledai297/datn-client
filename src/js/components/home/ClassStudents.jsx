import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { convertToLocalTime } from '../../helpers/utils';

export const TableScrollX = styled.table`
  display: inline-block;
  overflow-x: auto;
  width: 100%;
  font-size: 14px;
`;

export const ThStyled = styled.th`
  white-space: nowrap;
  text-align: center;
  vertical-align: middle !important;
`;

export const TdStyled = styled.td`
  white-space: nowrap;
  text-align: center;
  vertical-align: middle !important;
`;

export const WrapperCheckIcon= styled.div`
  position: relative;
`;

export const CheckIcon = styled.i`
  color: ${props=>props.checked ? 'blue' : 'red'};
  position: absolute;
  // visibility: ${props=>props.hidden ? 'hidden' : ''};
`;

const renderThead = (lessonsDate) => (
  <thead className="thead-dark">
    <tr>
      <ThStyled scope="col">STT</ThStyled>
      <ThStyled scope="col">Họ và tên</ThStyled>
      <ThStyled scope="col">MSSV</ThStyled>
      <ThStyled scope="col">Lớp</ThStyled>
      <ThStyled scope="col">Ngày sinh</ThStyled>
      <ThStyled scope="col">Số buổi nghỉ</ThStyled>
      {
        lessonsDate && lessonsDate.length > 0
          ? (
              lessonsDate.map((item, index) => (
                <ThStyled scope="col" key={index}>
                  <div>{convertToLocalTime(item, 'DD-MM-YYYY')}</div>
                  <div>{convertToLocalTime(item, 'HH:mm:ss')}</div>
                </ThStyled>
              ))
            )
          : null
      }
    </tr>
  </thead>
)
;

const renderStudentsData = (data) => {
  if (!data || data.length === 0) {
    return (
      <tr>
        <TdStyled col="6">Không có danh sách sinh viên lớp</TdStyled>
      </tr>
    );
  }

  return data.map((item, index) => {
    const lessonOff = item.rollUps.filter(element => !element).length;
    return (
      <tr key={item.id}>
        <TdStyled>{index + 1}</TdStyled>
        <TdStyled>{item.name}</TdStyled>
        <TdStyled>{item.student_code}</TdStyled>
        <TdStyled>{item.class_name}</TdStyled>
        <TdStyled>{item.birth_day}</TdStyled>
        <TdStyled>{lessonOff} / {item.rollUps.length}</TdStyled>
        {
          item.rollUps.length > 0
            ? renderStudentRolledUpRow(item.rollUps)
            : null
        }
      </tr>
    );
  });
};

const renderStudentRolledUpRow = (data) => (
  data.map(item => (
    <React.Fragment key={Math.random()}>
      <TdStyled>
        <WrapperCheckIcon>
          <CheckIcon className="fas fa-check" checked hidden={!item} />
          <CheckIcon className="fas fa-ban" checked={false} hidden={item} />
        </WrapperCheckIcon>
      </TdStyled>
    </React.Fragment>
  ))
);

class ClassStudents extends Component {
  componentDidMount() {}

  renderTableData() {
    const { lessonsDate, students } = this.props;

    return (
      <TableScrollX className="table">
        {renderThead(lessonsDate)}
        <tbody>
          {renderStudentsData(students)}
        </tbody>
      </TableScrollX>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderTableData()}
      </div>
    );
  }
}

ClassStudents.propTypes = {
  students: PropTypes.array.isRequired,
  lessonsDate: PropTypes.array.isRequired,
};

export default ClassStudents;
