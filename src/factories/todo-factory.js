import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
  function getTasks($scope) {
    $http.get('/todos').then(response => {
      $scope.todos = response.data.todos;
    });
  }

  function createTask($scope, params) {
    // params.createHasInput = false;
    // $scope.createTaskInput = '';

    if (!$scope.createTaskInput) { return; }

    $http.post('/todos', {
      task: $scope.createTaskInput, //grab task from input box in view
      isCompleted: false,
      isEditing: false
    }).then(response => {
      getTasks($scope);
      $scope.createTaskInput = '';
    });
  }

  function updateTask($scope, todo) {
    // todo.task = todo.updatedTask;
    // todo.isEditing = false;

    $http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).then(
      response => {
        getTasks($scope);
        todo.isEditing = false;
      });
  }

  function deleteTask($scope, todoToDelete) {
    // _.remove($scope.todos, todo => todo.task === todoToDelete.task);

    $http.delete(`/todos/${todoToDelete._id}`).then(response => {
      getTasks($scope);
    });
  }

  function watchCreateTaskInput(params, $scope, val) {
    const createHasInput = params.createHasInput;

    if (!val && createHasInput) {
      $scope.todos.pop();
      params.createHasInput = false;
    } else if (val && !createHasInput) {
      $scope.todos.push({ task: val, isCompleted: false });
      params.createHasInput = true;
    } else if (val && createHasInput) {
      $scope.todos[$scope.todos.length - 1].task = val;
    };
  }

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    watchCreateTaskInput
  };
});

export default todoFactory;
