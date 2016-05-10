class timeController {
  constructor($scope) {
    $scope.date = new Date()
    $scope.refreshDate = () => {
      $scope.date = new Date()
    }
    $scope.getDate = () => {
      return new Date()
    }
  }
}

timeController.$inject = ['$scope']

export default timeController
