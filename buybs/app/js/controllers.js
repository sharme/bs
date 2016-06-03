'use strict';

/* Controllers */

var buybsControllers = angular.module('buybsControllers', []);


/* Get footsteps list */
buybsControllers.controller('FootstepsListCtrl', ['$scope', '$http', function ($scope, $http) {

  $http({method: 'GET', url: 'http://localhost:3000/footsteps/getFootsteps'})
      .success(function(data){
        $scope.footsteps = data;
      }, function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: 'http://localhost:3000/countries/getCountries'})
      .success(function(data){
        console.log('countries: ' + data);
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });

  $scope.countryFilter = function(element, fs_from){
    $http({method: 'GET', url: 'http://localhost:3000/footsteps/getFootsteps', params:{fs_from: fs_from}})
        .success(function(data){
          $scope.footsteps = data;
        }, function(error){
          $scope.error = error;
        });

      preview = setInterval(timePage, 500);
  };


  var preview = setInterval(timePage, 500);

  function timePage(){
    if($("#footstep_list-div").children("#footstep_div").size() > 0){
      clearInterval(preview);
      var i = 0;
      var count = 0;
      var trigger = 0;
      var topPxs = [
        {"topPx":125, "leftPx":"0%"},
        {"topPx":125, "leftPx":"20%"},
        {"topPx":125,"leftPx": "40%"},
        {"topPx":125, "leftPx":"60%"},
        {"topPx":125,"leftPx": "80%"}
      ];

      $("#footstep_list-div").children("#footstep_div").each(function(index, element){
        // alert(i);

        $(element).css({
          "position":"absolute",
          "top": topPxs[i].topPx + "px",
          "left": topPxs[i].leftPx + ""
        });

        topPxs[i].topPx = topPxs[i].topPx + $(element).height() +10;

        if((index+1)%5 == 0){
          // alert("第一" + topPxs[0].topPx);
          i = 0;
          count++;
          // alert($(element).height());
        } else {

          i++;

          if((count * 5) + 5 > $("#footstep_list-div").children("#footstep_div").size() && trigger == 0 ){
            // i = 0;
            trigger++;
            // alert("test");
          }
        }
      });
    }
  }



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
      url: 'http://localhost:3000/users/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };
    console.log("sign up: " + JSON.stringify($scope.user));

    $http(req).success(function(result){
      console.log('sign up:' + result);
      $scope.result = result;
      $window.location.href = '#/signUpCompleted';
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
    // $("#login_username").text(cookieUser);
    $("#login_username").html("<a href='#/profile'><div class='user-icon'></a></div><div class='user-icon-hover'>欢迎迹客: "+ cookieUser +"</div>");
    $("#logout-nav").css("display", "block");
    $("#login-nav").css("display", "none");
  } else {
    $("#logout-nav").css("display", "none");
    $("#login-nav").css("display", "block");
  }

  $scope.showUName = function(){alert("1")};

  console.log("cookieUser: " + cookieUser);

  $scope.data = {
    phoneNumber: '',
    password: ''
  };

  $scope.submit = function(){
    var req = {
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };
    console.log("login : " + JSON.stringify($scope.user));

    $http(req).success(function(result){
      if(result) {

        console.log('login result:' + JSON.stringify(result));
        // $("#login_username").text(result[0].u_name);
        $("#login_username").html("<a href='#/profile'><div class='user-icon'></div></a><div class='user-icon-hover'>欢迎迹客: "+ result[0].u_name +"</div>");
        $cookies.put('username', result[0].u_name);
        $cookies.put('u_id', result[0].u_id);
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
        $(file).parent().nextAll("#register_shop-href").val(res);
        $(file).parent().nextAll("#register_shop-href").change();
        $(file).css("display", "none");
      }
    });
  };

}]);











