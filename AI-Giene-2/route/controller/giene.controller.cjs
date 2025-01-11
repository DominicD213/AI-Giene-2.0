const signup = require('./controller.signup.cjs');
const login = require('./controller.login.cjs');
const sessionStatus = require('./controller.sessionStatus.cjs');
const logout = require('./controller.logout.cjs');
const openAIResponse = require('./controller.openAIResponse.cjs');
const recentHistory = require('./controller.recentHistory.cjs');
const longtermHistory = require('./controller.longtermHistory.cjs');
const uploadRoute = require('./controller.validateUpload.cjs')

module.exports = {signup, login, sessionStatus, logout,openAIResponse, recentHistory, longtermHistory, uploadRoute}