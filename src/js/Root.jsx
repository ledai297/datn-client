/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config';
import configureStore from './store/configureStore';
import SignIn from './containers/SignIn';
import PrivateRoute from './PrivateRoute';
import Home from './containers/Home';
import Lesson from './containers/Lesson';
import LessonQRCode from './containers/LessonQRCode';
import RollUp from './containers/RollUp';
import { NotificationContainer } from 'react-notifications';
import ClassStudents from './containers/ClassStudents';
import LessonStudents from './containers/LessonStudents';
import StudentsList from './containers/StudentsList';

const store = configureStore();

const Root = () => (
  <Provider store={store} key={Math.random()}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/:lessonId/roll-up" component={RollUp} />
          <Route path="/:lessonId/students" component={StudentsList} />
          <Route path="/classes/:id/lessons" component={Lesson} />
          <PrivateRoute path="/:lessonId/qr-code" component={LessonQRCode} />
          <PrivateRoute path="/classes/:classId/students" component={ClassStudents} />
          <PrivateRoute path="/lesson/:lessonId/students" component={LessonStudents} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
    <NotificationContainer />
  </Provider>
);

export default Root;
