"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DEVICE = exports.WEB_SOCKET_URL = exports.ID_CARD_CHECK_URL = exports.BASE_CONFIG_URL = exports.BASE_CASSANDRA_URL = exports.BASE_API_URL = exports.BASE_HOST = exports.VERSION_NAME = exports.API_VERSION_NAME = exports.API_VERSION_KEY = exports.SHARED_STORE_KEY = exports.SHARED_KEY = exports.API_KEY = exports.ID_CHECK_SECRET_KEY = void 0;
exports.ID_CHECK_SECRET_KEY = '4aa6d1c301a97154bc1098c2';
exports.API_KEY = 'ccd59ee269c01511ba763467045c115779fcae3050238a252f1bd1a4b65cfec6';
exports.SHARED_KEY = 'yayZ1';
exports.SHARED_STORE_KEY = 'yayZ1payment';
exports.API_VERSION_KEY = '214f86de09614a5a9970d8a3313f635e';
exports.API_VERSION_NAME = '3.32';
exports.VERSION_NAME = '3.32.0';
exports.BASE_HOST = 'api.yay.space';
exports.BASE_API_URL = `https://${exports.BASE_HOST}/`;
exports.BASE_CASSANDRA_URL = 'https://cas.yay.space/';
exports.BASE_CONFIG_URL = 'https://settings.yay.space/';
exports.ID_CARD_CHECK_URL = 'https://idcardcheck.com/';
exports.WEB_SOCKET_URL = 'wss://cable.yay.space/';
exports.DEFAULT_DEVICE = {
    deviceType: 'android',
    osVersion: '11',
    screenDensity: '3.5',
    screenSize: '1440x2960',
    model: 'Galaxy S9',
};
