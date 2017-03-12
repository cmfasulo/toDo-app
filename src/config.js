//Main AngularJS file with configuration, routing
import angular from 'angular'; //ES6 syntax, regular JS would use 'require'
import uiRouter from 'angular-ui-router';
import todosController from 'todos/todos.js';

const app = angular.module('app', [uiRouter]);

//ES6 syntax for functions =>
app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('todos', {
      url: '/',
      template: require('todos/todos.html'),
      controller: todosController
    })

    .state('about', {
      url: '/about',
      template: require('about/about.html')
    });

  $locationProvider.html5Mode(true); //makes urls look nicer without hashes
});

export default app;
