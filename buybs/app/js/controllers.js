'use strict';

/* Controllers */

var buybsControllers = angular.module('buybsControllers', []);


/* Get footsteps list */
buybsControllers.controller('FootstepsListCtrl', ['$scope', '$http', '$cookies', '$window', function ($scope, $http, $cookies, $window) {

  // $scope.footsteps = function(){
    $http({method: 'GET', url: 'http://localhost:3000/footsteps/getFootsteps'})
        .success(function(data){
          $scope.footsteps = data;
          preview = setInterval(timePage, 100);
        }, function(error){
          $scope.error = error;
        });
  // };

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

    preview = setInterval(timePage, 100);

  };


  $scope.homepageBtn = function(){
    alert("clicked");
    // $window.location.href = "#/shops";
    
  };


  $scope.stickBtn = function(id){


    $http({method: 'GET', url: 'http://localhost:3000/sticks/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          if(data.length > 0 ) {
            alert("已经收藏成功");
          } else {
            var req = {
              method: 'POST',
              url: 'http://localhost:3000/sticks/add',
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                'fs_id': id,
                'u_id': $cookies.get('u_id')
              }
            };

            $http(req).success(function(result){
              console.log('stick');
            }, function(error){
              console.log(error);
            });
          }
        }, function(error){
          console.log(error);
        });

  };

  $scope.likeBtn = function(id){

    $http({method: 'GET', url: 'http://localhost:3000/likes/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          console.log(data);
          if(data.length > 0) {
            alert('每个人只能喜欢一次哦');
          } else {
            var req = {
              method: 'POST',
              url: 'http://localhost:3000/likes/add',
              header: {
                'Content-Type': 'application/json'
              },
              data: {
                'fs_id': id,
                'u_id': $cookies.get('u_id')
              }
            };

            $http(req).success(function(result){
              console.log('liked');
            }, function(error){
              console.log(error);
            })
          }


        }, function(error){
          $scope.error = error;
        });

  };


  // var preview = setInterval(timePage, 100);

  var preview;

  function timePage(){
    if($("#footstep_list-div").children("#footstep_div").size() > 5){
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
buybsControllers.controller('headerController', ['$scope', '$cookies', '$window', function($scope, $cookies, $window){
  
  $scope.homepageBtn = function() {
    $window.location = '#/shops';
    $window.location.reload();
  };
  
  $scope.logout = function(){
    console.log("remove cookies");
    $cookies.remove('username');
    $window.location.href = '#/shops';
    $window.location.reload();
  }

}]);


/* Call web service to add a user account info into MONGODB */
buybsControllers.controller('LoginController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {

  var cookieUser = $cookies.get("username");
  if(cookieUser) {
    // $("#login_username").text(cookieUser);
    $("#login_username").html("<a href='#/profile?u_id="+ $cookies.get('u_id') +"'><div class='user-icon'></a></div><div class='user-icon-hover'>欢迎迹客: "+ cookieUser +"</div>");
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
      if(result.length > 0) {

        console.log('login result:' + JSON.stringify(result));
        // $("#login_username").text(result[0].u_name);
        $("#login_username").html("<a href='#/profile?u_id="+ result[0].u_id +"'><div class='user-icon'></div></a><div class='user-icon-hover'>欢迎迹客: "+ result[0].u_name +"</div>");
        $cookies.put('username', result[0].u_name);
        $cookies.put('u_id', result[0].u_id);
        $("#logout-nav").css("display", "block");
        $("#login-nav").css("display", "none");
        $("#login_popup").css("display", "none");
      }else {
        $("#login_invalid").css("display", "block");
        $scope.user = angular.copy($scope.data);
      }
    }, function(error){
      console.log(error);
    });
  };

  $scope.user = angular.copy($scope.data);

}]);



/* Call Web service to add a shop info into MONGODB */
buybsControllers.controller('ProfileController', ['$scope', '$http', '$window','$cookies','$routeParams', function($scope, $http, $window, $cookies, $routeParams) {

  var data = {
    fs_desc: '',
    fs_from: '',
    fs_pic: ''
  };
  $scope.footstep = angular.copy(data);

  
  $scope.closeBtn = function(){
    $('.create_footstep').css('display','none');
  };
  
  
  $scope.createBtn = function(){
    $('.create_footstep').css('display','inherit');
  };
  

  $http({method: 'GET', url: 'http://localhost:3000/countries/getCountries'})
      .success(function(data){
        console.log('countries: ' + data);
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });
  
  

  $scope.submit = function(){

    var footstepData = {
      fs_desc: $scope.footstep.fs_desc,
      fs_from: $scope.footstep.fs_from,
      fs_pic: $scope.footstep.fs_pic,
      u_id: $cookies.get('u_id')
    };

    console.log("shopData: " + JSON.stringify(footstepData));

    var req = {
      method: 'POST',
      url: 'http://localhost:3000/footsteps/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(footstepData)
    };

    $http(req).success(function(result){
      // alert("添加成功");
      $('.create_footstep').css("display","none");
    }, function(error){
      console.log(error);
    });

  };

  $scope.uploadFile = function(file){
    console.log('upload file');
    var file_data = $(file).prop('files')[0];
    var form_data = new FormData();
    form_data.append('u_id', $cookies.get('u_id'));
    form_data.append("file", file_data);

    $.ajax({
      url: "http://localhost:3000/api/uploadPhotos",
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


  $http({method: 'GET', url: 'http://localhost:3000/users/getUserDetail', params:{u_id: $routeParams.u_id}})
      .success(function(data){
        console.log(JSON.stringify(data));
        $scope.userProfile = data;
      }, function(error){
        $scope.error = error;
      });


  $scope.profileFootsteps = function(u_id){
    $http({method: 'GET', url: 'http://localhost:3000/footsteps/getFootstepsByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.footsteps = data;
        }, function(error){
          $scope.error = error;
        });

    preview = setInterval(timePage, 10);
  };


  $scope.profileSticks = function(u_id){
    $http({method: 'GET', url: 'http://localhost:3000/footsteps/getSticksByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.footsteps = data;
        }, function(error){
          $scope.error = error;
        });

    preview = setInterval(timePage, 10);
  };

  var preview = setInterval(timePage, 10);

  function timePage(){
    if($("#footstep_list-div").children("#footstep_div").size() > 4){
      clearInterval(preview);
      var i = 0;
      var count = 0;
      var trigger = 0;
      var topPxs = [
        {"topPx":380, "leftPx":"0%"},
        {"topPx":380, "leftPx":"20%"},
        {"topPx":380,"leftPx": "40%"},
        {"topPx":380, "leftPx":"60%"},
        {"topPx":380,"leftPx": "80%"}
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











