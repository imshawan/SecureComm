import axios from 'axios';
import { APP_REMOTE_HOST } from '../common';

const HEADERS = {
    "Content-Type" : "application/json",
    "accept": "*/*"
  }

export const HTTP = {
    get: async (uri, queryParams={}) => {
        const params = new URLSearchParams(queryParams);

        return new Promise((resolve, reject) => {
            axios.request({
                url: APP_REMOTE_HOST + uri + '?' + params.toString(),
                method: 'GET',
                data: {},
                headers: HEADERS
            }).then((response) => {
                resolve(response.data);
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data);
                } else {
                    reject(err.message);
                }
              });
        });
    },
    put: (uri, payload={}) => {
        return new Promise((resolve, reject) => {
            axios.request({
                url: APP_REMOTE_HOST + uri,
                method: 'PUT',
                data: payload,
                headers: HEADERS
            }).then((response) => {
                resolve(response.data);
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data);
                } else {
                    reject(err.message);
                }
              });
        });
    },
    post: (uri, payload={}) => {
        return new Promise((resolve, reject) => {
            axios.request({
                url: APP_REMOTE_HOST + uri,
                method: 'POST',
                data: payload,
                headers: HEADERS
            }).then((response) => {
                resolve(response.data);
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data);
                } else {
                    reject(err.message);
                }
              });
        });
    },
    del: (uri) => {
        return new Promise((resolve, reject) => {
            axios.request({
                url: APP_REMOTE_HOST + uri,
                method: 'DELETE',
                data: {},
                headers: HEADERS
            }).then((response) => {
                resolve(response.data);
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data);
                } else {
                    reject(err.message);
                }
              });
        });
    },
};
