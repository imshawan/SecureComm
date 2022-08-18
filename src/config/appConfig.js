// import Reactotron from 'reactotron-react-native';
import { LOGS } from '../common';


export function log(logData) {
  if (!LOGS) {
    // Reactotron.log(logData);
    console.log(logData);
  }
}

export function showAlert(logData) {
    if (!LOGS) {
      alert(logData);
    }
  }