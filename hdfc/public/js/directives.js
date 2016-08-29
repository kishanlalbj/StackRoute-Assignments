angular.module('app').directive('myDirective',myDirective);

function myDirective () {
  return {
    restrict :'E',
    templateUrl : 'templates/table.html'
  }
}
