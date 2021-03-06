// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  const login = (userAuth) => api.post('api/authenticate', userAuth);
  const register = (user) => api.post('api/register', user);
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    });

  const getAccount = () => api.get('api/account');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    );

  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/users/' + userId);

  const getRequest = (requestId) => api.get('api/requests/' + requestId);
  const getAllRequests = (options) => api.get('api/requests', options);
  const createRequest = (request) => api.post('api/requests', request);
  const updateRequest = (request) => api.put(`api/requests/${request.id}`, request);
  const deleteRequest = (requestId) => api.delete('api/requests/' + requestId);

  const getReclRep = (reclRepId) => api.get('api/recl-reps/' + reclRepId);
  const getAllReclReps = (options) => api.get('api/recl-reps', options);
  const createReclRep = (reclRep) => api.post('api/recl-reps', reclRep);
  const updateReclRep = (reclRep) => api.put(`api/recl-reps/${reclRep.id}`, reclRep);
  const deleteReclRep = (reclRepId) => api.delete('api/recl-reps/' + reclRepId);

  const getNotification = (notificationId) => api.get('api/notifications/' + notificationId);
  const getAllNotifications = (options) => api.get('api/notifications', options);
  const createNotification = (notification) => api.post('api/notifications', notification);
  const updateNotification = (notification) => api.put(`api/notifications/${notification.id}`, notification);
  const deleteNotification = (notificationId) => api.delete('api/notifications/' + notificationId);

  const getHistoryLine = (historyLineId) => api.get('api/history-lines/' + historyLineId);
  const getAllHistoryLines = (options) => api.get('api/history-lines', options);
  const createHistoryLine = (historyLine) => api.post('api/history-lines', historyLine);
  const updateHistoryLine = (historyLine) => api.put(`api/history-lines/${historyLine.id}`, historyLine);
  const deleteHistoryLine = (historyLineId) => api.delete('api/history-lines/' + historyLineId);
  // jhipster-react-native-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,

    createRequest,
    updateRequest,
    getAllRequests,
    getRequest,
    deleteRequest,

    createReclRep,
    updateReclRep,
    getAllReclReps,
    getReclRep,
    deleteReclRep,

    createNotification,
    updateNotification,
    getAllNotifications,
    getNotification,
    deleteNotification,

    createHistoryLine,
    updateHistoryLine,
    getAllHistoryLines,
    getHistoryLine,
    deleteHistoryLine,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
