import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';

class LessonConfirm extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
  }

  render() {
    const { isOpen, closeModal, confirmLesson } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Xác nhận</ModalHeader>

        <ModalBody>
          Xác nhận?
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={closeModal}>Hủy</Button>
          <Button color="primary" onClick={confirmLesson}>Đồng ý</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

LessonConfirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmLesson: PropTypes.func.isRequired,
};

export default LessonConfirm;
