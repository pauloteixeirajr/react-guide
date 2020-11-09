import axios from 'axios';
import { firebase } from './.env/firebase';

export default axios.create({
  baseURL: firebase.baseUrl,
});
