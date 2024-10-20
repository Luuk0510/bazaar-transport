import Controller from './controller/controller.js';
import MainView from './view/mainView.js';

const mainView = new MainView();
const controller = new Controller(mainView);
