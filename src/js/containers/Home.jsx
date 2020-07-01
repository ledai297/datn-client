import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from '../actions/auth';
import * as classesAction from '../actions/classes';
import Header from '../components/common/Header';
import Pagination from 'rc-pagination';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.h3`
  text-decoration: underline;
`;

const Link = styled.a``;

const WrapperSearchInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  
  form {
    width: 30%;
  }
`;

const renderThead = () => (
  <thead className="thead-dark">
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Tên môn học</th>
      <th scope="col">Mã môn học</th>
      <th scope="col">Mã lớp</th>
      <th scope="col"></th>
    </tr>
  </thead>
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      keySearch: '',
    };

    this.handleChangeSearchKey = this.handleChangeSearchKey.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.redirectToClassDetail = this.redirectToClassDetail.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    const { actions, data } = this.props;
    const { currentPage, perPage } = data.classes;
    const { keySearch } = this.state;
    actions.classes.fetchClassesData(keySearch, currentPage, perPage, () => {}, this.onError);
  }

  onError(err) {
    let errorMessage = '';
    try {
      const { data } = err.response;
      errorMessage = data.error;
    } catch (e) {
      errorMessage = 'Lỗi server';
    } finally {
      NotificationManager.error(errorMessage, 'Lỗi', 3000);
    }
  }

  handleChangePage(page) {
    const { actions, data } = this.props;
    const { keySearch } = this.state;
    const { currentPage, perPage } = data.classes;
    actions.classes.fetchClassesData(keySearch, currentPage, perPage, () => {}, this.onError);
  }

  redirectToClassDetail(id) {
    const { history } = this.props;

    history.push(`/classes/${id}/lessons`);
  }

  goToClassStudentsDetail(id) {
    const { history } = this.props;

    history.push(`/classes/${id}/students`);
  }

  handleChangeSearchKey(e) {
    this.setState({ keySearch: e.target.value });
  }

  handleSearch(e) {
    if (e.which === 13) {
      const { actions, data } = this.props;
      const { currentPage, perPage } = data.classes;
      const { keySearch } = this.state;
      actions.classes.fetchClassesData(
        keySearch,
        currentPage,
        perPage,
        () => {},
        this.onError
      );
    }
  }

  renderAccount() {
    const { data } = this.props;
    const user = data.me;
    return (
      <div className="mt-4">
        <Title>Thông tin giáo viên</Title>
        <div className="row">
          <div className="col-3">
            <label>Email</label>
          </div>
          <p>{user.email}</p>
        </div>

        <div className="row">
          <div className="col-3">
            <label>Name</label>
          </div>
          <p>{user.name}</p>
        </div>

        <div className="row">
          <div className="col-3">
            <label>Số điện thoại</label>
          </div>
          <p>{user.tel}</p>
        </div>
      </div>
    );
  }

  renderTbody(data) {
    if (!data || data.length === 0) {
      return (
        <tr col="4">
          <td>Không có dữ liệu lớp giáo viên quản lý</td>
        </tr>
      );
    }
  
    return data.map((item, index) => (
      <tr key={item.id}>
        <th scope="row">{index + 1}</th>
        <td>
          <Link
            onClick={() => this.redirectToClassDetail(item.id)}
          >
            {item.subject_name || ''}
          </Link>
        </td>
        <td>{item.subject_code || ''}</td>
        <td>{item.class_code || ''}</td>
        <td>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => this.goToClassStudentsDetail(item.id)}
          >Chi tiết</button>
        </td>
      </tr>
      ));
  };

  renderClassesTable(data) {
    return (
      <table className="table">
        {renderThead()}
        <tbody>
          {this.renderTbody(data)}
        </tbody>
      </table>
    );
  }

  render() {
    const { actions, data, history } = this.props;
    const { classes, me } = data;

    return (
      <Container className="container">
        <Header
          me={me}
          logout={actions.auth.logout}
          getMe={actions.auth.getMe}
          history={history}
        />
        {this.renderAccount()}
        <Title className="my-2">Danh sách lớp giáo viên quản lý</Title>
        <WrapperSearchInput>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Tên môn học, mã môn học, mã lớp, ..."
              onChange={this.handleChangeSearchKey}
              onKeyPress={this.handleSearch}
            />
          </div>
        </WrapperSearchInput>
        {this.renderClassesTable(classes.data)}
        <Pagination
          current={classes.currentPage}
          total={classes.total}
          pageSize={classes.perPage}
          onChange={this.handleChangePage}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: {
      me: state.auth.me,
      classes: state.classes,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: bindActionCreators(authActions, dispatch),
      classes: bindActionCreators(classesAction, dispatch),
    },
  };
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
