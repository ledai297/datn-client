import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as lessonActions from '../actions/lesson';
import * as classActions from '../actions/classes';
import LessonStudentsComponent from '../components/lesson/LessonStudents';
import { Nav, NavItem, NavLink } from 'reactstrap';
import ClassStudents from '../components/home/ClassStudents';

const TABS = {
  LESSON: {
    id: 1,
    label: 'Tiết học',
  },
  CLASS: {
    id: 2,
    label: 'Lớp học'
  }
}

class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabId: TABS.LESSON.id,
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  componentDidMount() {
    this.fetchLessonStudentsRolledUp();
  }
  
  handleChangeTab(tabId) {
    this.setState({ tabId });

    if (tabId === TABS.LESSON.id) {
      this.fetchLessonStudentsRolledUp();
    } else {
      this.fetchClassStudentsRolledUp()
    }
  }
  
  fetchLessonStudentsRolledUp() {
    const { match, actions } = this.props;
    actions.lessonActions.fetchLessonStudentsRolledUp(
      match.params.lessonId,
      '',
      -1,
      () => {},
      () => {},
    );
  }

  fetchClassStudentsRolledUp() {
    const { match, actions } = this.props;
    actions.classActions.fetchClassStudentsByLessonId(
      match.params.lessonId,
      () => {},
      () => {},
    );
  }

  renderTabs() {
    const { tabId } = this.state;
    return (
      <Nav tabs>
        <NavItem>
          <NavLink
            onClick={() => this.handleChangeTab(TABS.LESSON.id)}
            className={tabId === TABS.LESSON.id ? 'active' : ''}
            style={{ color: tabId === TABS.LESSON.id ? 'blue' : ''}}
          >
            {TABS.LESSON.label}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => this.handleChangeTab(TABS.CLASS.id)}
            className={tabId === TABS.CLASS.id ? 'active' : ''}
            style={{ color: tabId === TABS.CLASS.id ? 'blue' : ''}}
          >
            {TABS.CLASS.label}
          </NavLink>
        </NavItem>
      </Nav>
    );
  }

  render() {
    const { data } = this.props;
    const { tabId } = this.state;

    return (
      <div>
        {this.renderTabs()}
        {/* {
          tabId === TABS.LESSON.id
            ? (
                <LessonStudentsComponent
                  students={data.lesson.studentsRolledUp}
                  detail={data.lesson.detail}
                />
              )
            : (
                <ClassStudents
                  students={data.classes.studentsRolledUp}
                  lessonsDate={data.classes.lessonsDate}
                />
              )
        } */}
      </div>
    );
  }
}

StudentsList.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    data: {
      lesson: state.lesson,
      me: state.auth.me,
      classes: state.classes,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      lessonActions: bindActionCreators(lessonActions, dispatch),
      classActions: bindActionCreators(classActions, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentsList);
