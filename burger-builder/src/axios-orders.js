import axios from 'axios';

export default axios.create({
  baseURL: 'https://burger.firebaseio.com/',
});
