import _ from 'lodash';

export default function($scope, todoFactory) {
  let params = {
    createHasInput: false
  };

  todoFactory.getTasks($scope);

  $scope.onCompletedClick = todo => {
    todo.isCompleted = !todo.isCompleted;
  };

  $scope.onEditClick = todo => {
    todo.isEditing = true;
    todo.updatedTask = todo.task;
  };

  $scope.onCancelClick = todo => {
    todo.isEditing = false;
  };

  //lodash method to bind $scope and params. this ensures the original objects are mutated, not copied and changed.
  $scope.createTask = _.partial(todoFactory.createTask, $scope, params);

  $scope.updateTask = _.partial(todoFactory.updateTask, $scope);

  $scope.deleteTask = _.partial(todoFactory.deleteTask, $scope);

  $scope.$watch('createTaskInput', _.partial(todoFactory.watchCreateTaskInput, params, $scope));
}
