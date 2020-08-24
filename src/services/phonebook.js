import axios from "axios";

//const baseUrl = "http://localhost:3001/persons";

// Changed so the phonebook front end would work with the phonebook back end
//const baseUrl = "http://localhost:3001/api/persons";

// Changing to work with phonebook backend on heroku
//const baseUrl = "https://sleepy-wildwood-05846.herokuapp.com/api/persons";

// Changing again to support the frontend and backend both being on heroku
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

export default { getAll, create, update, remove };
