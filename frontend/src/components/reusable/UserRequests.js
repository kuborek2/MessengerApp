import axios from "axios"


const RequestUserCredintionals = (userName, funcSettled, funcRejected) => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/users/'+userName,
  }).then(funcSettled, funcRejected)
    .catch((err) => {console.log(err)})
}

const RequestUserRegistration = (newUserObject, funcSettled, funcRejected) => {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/users',
    data: newUserObject
  }).then(funcSettled, funcRejected)
    .catch((err) => {console.log(err)})
}

const RequestAllUsersData = (funcSettled, funcRejected) => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/users',
  }).then(funcSettled, funcRejected)
    .catch((err) => {console.log(err)})
}

export default { RequestUserCredintionals, RequestUserRegistration, RequestAllUsersData };