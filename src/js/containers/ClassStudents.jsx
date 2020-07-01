import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as authActions from '../actions/auth';
import * as classesActions from '../actions/classes';
import ClassStudentsComponent from '../components/home/ClassStudents';
import Header from '../components/common/Header';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import Loading from '../components/common/Loading';

const WrapperSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  input {
    width: 30%;
    min-width: 250px;
  }
`;

class ClassStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      searchKey: '',
    };

    this.handleChangeSearchKey = this.handleChangeSearchKey.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onError = this.onError.bind(this);
    this.backToClassesScreen = this.backToClassesScreen.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { classId } = match.params;
    const { searchKey } = this.state;
    this.fetchClassStudentsRolledUp(classId, searchKey);
  }

  onError(err) {
    let errorMessage = '';
    try {
      const { data } = err.response;
      errorMessage = data.error;
    } catch (e) {
      errorMessage = 'Lỗi server';
    } finally {
      this.setState({ isLoading: false });
      NotificationManager.error(errorMessage, 'Lỗi', 3000);
    }
  }

  backToClassesScreen() {
    this.props.history.push('/');
  }

  fetchClassStudentsRolledUp(classId, searchKey) {
    const { actions } = this.props;
    this.setState({ isLoading: true });
    actions.classesActions.fetchClassStudentsRolledUp(
      classId,
      searchKey,
      () => {
        this.setState({ isLoading: false });
      },
      this.onError,
    );
  }

  handleChangeSearchKey(e) {
    this.setState({ searchKey: e.target.value });
  }

  handleSearch(e) {
    if (e.which === 13) {
      const { match } = this.props;
      const { classId } = match.params;
      const { searchKey } = this.state;
      this.fetchClassStudentsRolledUp(classId, searchKey);
    }
  }

  render() {
    const { data, actions, history } = this.props;
    const { isLoading } = this.state;

    return (
      <div className="container">
        <Loading isLoading={isLoading} />
        <Header
          me={data.me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
          hitory={history}
        />
        <WrapperSearch className="my-2">
          <button
            type="button"
            onClick={this.backToClassesScreen}
            className="btn btn-primary"
            style={{ fontSize: '12px' }}
          >
            <span className="mr-2">
              <i className="fas fa-arrow-left" />
            </span>
            Danh sách lớp
          </button>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="MSSV"
              onChange={this.handleChangeSearchKey}
              onKeyPress={this.handleSearch}
            />
          </div>
        </WrapperSearch>
        <ClassStudentsComponent
          students={data.classes.studentsRolledUp}
          lessonsDate={data.classes.lessonsDate}
        />
      </div>
    );
  }
}

ClassStudents.propTypes = {
  match: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      classes: state.classes,
      me: state.auth.me,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      classesActions: bindActionCreators(classesActions, dispatch),
      auth: bindActionCreators(authActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassStudents);