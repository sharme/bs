'use strict';

/* Controllers */

var buybsControllers = angular.module('buybsControllers', []);


/* Get shop list */
buybsControllers.controller('ShopListCtrl', ['$scope', '$http', function ($scope, $http) {

  $http({method: 'GET', url: 'http://localhost:8081/api/shopService/GetShops'})
      .success(function(data){
        console.log("server address: public/javascripts/modules/app.js/shopListCtrl");
        console.log('data: ' + JSON.stringify(data).length);
        $scope.shops = data;
      }, function(error){
        $scope.error = error;
      });
}]);


/* get shop detail by shop id */
buybsControllers.controller('ShopDetailCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

  $http({method: 'GET', url: 'http://localhost:8081/api/shopService/GetShops/' + $routeParams.shopId})
      .success(function(data){
        console.log("server address: public/javascripts/modules/app.js/shopDetailCtrl");
        console.log('data: ' + (JSON.stringify(data)) + ", images: " + data);
        $scope.result = data;
        $scope.test = JSON.stringify(data);
      }, function(error){
        $scope.error = error;
      });
}]);


/* Call web service to add a user account info into MONGODB */
buybsControllers.controller('SignUpController', ['$scope', '$http', '$window', function($scope, $http, $window) {

  $scope.data = {
    username: '',
    phoneNumber: '',
    password: '',
    scCode: '',
    agreement: "checked"
  };

  $scope.submit = function(){
    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:8081/api/userService/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };
    console.log("sign up: " + JSON.stringify($scope.user));

    $http(req).success(function(result){
      console.log('sign up:' + result);
      $scope.result = result;
      $window.location.href = '#/collectShopInfo';
    }, function(error){
      console.log(error);
    });
    $scope.user = angular.copy($scope.data);
  };


  $scope.user = angular.copy($scope.data);

}]);

/* logout */
buybsControllers.controller('logoutController', ['$scope', '$cookies', '$window', function($scope, $cookies, $window){
  console.log("remove cookies");
  $cookies.remove('username');
  $window.location = '#/shops';
  
}]);


/* Call web service to add a user account info into MONGODB */
buybsControllers.controller('LoginController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {

  var cookieUser = $cookies.get("username");

  if(cookieUser) {
    $("#login_username").text(cookieUser);
    $("#logout-nav").css("display", "block");
    $("#login-nav").css("display", "none");
  } else {
    $("#logout-nav").css("display", "none");
    $("#login-nav").css("display", "block");
  }

  console.log("cookieUser: " + cookieUser);

  $scope.data = {
    phoneNumber: '',
    password: ''
  };

  $scope.submit = function(){
    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:8081/api/userService/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };
    console.log("login : " + JSON.stringify($scope.user));

    $http(req).success(function(result){
      if(result) {
        console.log('login result:' + result );
        $("#login_username").text(result);
        $cookies.put('username', result);
        $("#logout-nav").css("display", "block");
        $("#login-nav").css("display", "none");
        $("#login_popup").css("display", "none");
      }else {
        $("#login_popup").css("display", "block");
        $scope.user = angular.copy($scope.data);
      }
    }, function(error){
      console.log(error);
    });
  };

  $scope.user = angular.copy($scope.data);

}]);



/* Call Web service to add a shop info into MONGODB */
buybsControllers.controller('ShopController', ['$scope', '$http', '$window', function($scope, $http, $window) {

  var imagesData = [{
    url: '',
    price: '',
    desc: ''
  }];

  $scope.images = angular.copy(imagesData);

  var data = {
    shop_name: '',
    shop_type: '',
    shop_address: '',
    sells: ''
  };

  $scope.shop = angular.copy(data);
  

  $scope.addImage = function() {
    var image = {
      url: '',
      price: '',
      desc: ''
    };
    
    console.log('add image! data: ' + angular.toJson($scope.images));
    $scope.images.push(angular.copy(image));
  };




  $scope.submit = function(){

    // imagesData = angular.toJson($scope.images);

    var shopData = {
      shop_name: $scope.shop.shop_name,
      shop_type: $scope.shop.shop_type,
      shop_address: $scope.shop.shop_address,
      sells: $scope.shop.sells,
      images: JSON.parse(angular.toJson($scope.images))
    };

    console.log("shopData: " + JSON.stringify(shopData));

    var req = {
      method: 'POST',
      url: 'http://127.0.0.1:8081/api/shopService/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(shopData)
    };

    $http(req).success(function(result){
      console.log('sign up:' + result);
      $scope.result = result;
      $window.location.href = '#/signUpCompleted';
    }, function(error){
      console.log(error);
    });

  };

  $scope.uploadFile = function(file){
    console.log('upload file');
    var file_data = $(file).prop('files')[0];
    var form_data = new FormData();
    form_data.append("file", file_data);

    $.ajax({
      url: "http://127.0.0.1:8081/api/uploadPhotos",
      contentType: false,
      data: form_data,
      processData: false,
      cache: false,
      type: "POST",
      success: function (res) {
        console.log('uploaded, URL: ' + res);
        $(file).parent().css("background-image", 'url(' + res + ')');
        // $(file).prev().val(res);
        // $(file).prev().change();
        $(file).parent().nextAll("#register_shop-href").val(res);
        $(file).parent().nextAll("#register_shop-href").change();
        $(file).css("display", "none");
      }
    });
  };

}]);















