import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';

class LessonDelete extends Component {
  constructor(props) {
    super(props);

  }
  
  componentDidMount() {
  }

  render() {
    const { isOpen, closeModal, deleteLesson } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Xóa tiết học</ModalHeader>

        <ModalBody>
          Bạn có muốn xóa tiết học này?
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={closeModal}>Hủy</Button>
          <Button color="primary" onClick={deleteLesson}>Đồng ý</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

LessonDelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteLesson: PropTypes.func.isRequired,
};

export default LessonDelete;
