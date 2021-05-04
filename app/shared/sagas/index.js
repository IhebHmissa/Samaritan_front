import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { RequestTypes } from '../../modules/entities/request/request.reducer';
import { ReclRepTypes } from '../../modules/entities/recl-rep/recl-rep.reducer';
import { NotificationTypes } from '../../modules/entities/notification/notification.reducer';
import { HistoryLineTypes } from '../../modules/entities/history-line/history-line.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import RequestSagas from '../../modules/entities/request/request.sagas';
import ReclRepSagas from '../../modules/entities/recl-rep/recl-rep.sagas';
import NotificationSagas from '../../modules/entities/notification/notification.sagas';
import HistoryLineSagas from '../../modules/entities/history-line/history-line.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(RequestTypes.REQUEST_REQUEST, RequestSagas.getRequest, api),
    takeLatest(RequestTypes.REQUEST_ALL_REQUEST, RequestSagas.getAllRequests, api),
    takeLatest(RequestTypes.REQUEST_UPDATE_REQUEST, RequestSagas.updateRequest, api),
    takeLatest(RequestTypes.REQUEST_DELETE_REQUEST, RequestSagas.deleteRequest, api),

    takeLatest(ReclRepTypes.RECL_REP_REQUEST, ReclRepSagas.getReclRep, api),
    takeLatest(ReclRepTypes.RECL_REP_ALL_REQUEST, ReclRepSagas.getAllReclReps, api),
    takeLatest(ReclRepTypes.RECL_REP_UPDATE_REQUEST, ReclRepSagas.updateReclRep, api),
    takeLatest(ReclRepTypes.RECL_REP_DELETE_REQUEST, ReclRepSagas.deleteReclRep, api),

    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, NotificationSagas.getNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, NotificationSagas.getAllNotifications, api),
    takeLatest(NotificationTypes.NOTIFICATION_UPDATE_REQUEST, NotificationSagas.updateNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_DELETE_REQUEST, NotificationSagas.deleteNotification, api),

    takeLatest(HistoryLineTypes.HISTORY_LINE_REQUEST, HistoryLineSagas.getHistoryLine, api),
    takeLatest(HistoryLineTypes.HISTORY_LINE_ALL_REQUEST, HistoryLineSagas.getAllHistoryLines, api),
    takeLatest(HistoryLineTypes.HISTORY_LINE_UPDATE_REQUEST, HistoryLineSagas.updateHistoryLine, api),
    takeLatest(HistoryLineTypes.HISTORY_LINE_DELETE_REQUEST, HistoryLineSagas.deleteHistoryLine, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
