export default {
  // Functions return fixtures

  // entity fixtures
  updateRequest: (request) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-request.json'),
    };
  },
  getAllRequests: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-requests.json'),
    };
  },
  getRequest: (requestId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-request.json'),
    };
  },
  deleteRequest: (requestId) => {
    return {
      ok: true,
    };
  },
  updateReclRep: (reclRep) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-recl-rep.json'),
    };
  },
  getAllReclReps: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-recl-reps.json'),
    };
  },
  getReclRep: (reclRepId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-recl-rep.json'),
    };
  },
  deleteReclRep: (reclRepId) => {
    return {
      ok: true,
    };
  },
  updateNotification: (notification) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-notification.json'),
    };
  },
  getAllNotifications: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-notifications.json'),
    };
  },
  getNotification: (notificationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-notification.json'),
    };
  },
  deleteNotification: (notificationId) => {
    return {
      ok: true,
    };
  },
  updateHistoryLine: (historyLine) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-history-line.json'),
    };
  },
  getAllHistoryLines: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-history-lines.json'),
    };
  },
  getHistoryLine: (historyLineId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-history-line.json'),
    };
  },
  deleteHistoryLine: (historyLineId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
