const axios = require('axios');

const Request = async (type, api, token, data = {}) => {
  return axios({
    method: type,
    url: `${process.env.REACT_APP_API_ROUTE}/${api}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  })
    .then(function (response) {
      // console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default Request;
