'use strict';

/* Controllers */

var buybsControllers = angular.module('buybsControllers', []);

var ipAddress = 'http://180.76.152.112';
var mobileSize = 800;



function displayPosition(miles){
  var timer = setInterval(function(){
    window.clearInterval(timer);

    if($(window).width() < mobileSize) {
      $('.footstep_list_home').css("padding", "0px 10%");
      $('.footstep-list-div').css('width', '95%');
      $('.footstep-list_end').css('position', 'relative');
      $('.footstep-list_end').css('float', 'left');
      $('.footstep-list_end').css('padding', '10px 30% 0px 20%');
      $('.footstep-count').css({"position": "relative", "float": "left", "margin": "10px 0px 0px 5%"});
    } else {

      if ($(".footstep_list_home").children("#footstep-list-div").size() > 1) {
        var i = 0;
        var count = 0;
        var trigger = 0;
        var topPxs = [
          {"topPx": 155, "leftPx": "20%"},
          {"topPx": 155, "leftPx": "40%"},
          {"topPx": 155, "leftPx": "60%"}
        ];

        var maxVal = 30;
        var listIndex = 0;
        $("#footstep-list").children("#footstep-list-div").each(function (index, element) {
          listIndex++;
          $(element).css({
            "position": "absolute",
            "width": '18%',
            "top": topPxs[i].topPx + "px",
            "left": topPxs[i].leftPx + ""
          });

          topPxs[i].topPx = topPxs[i].topPx + $(element).height() + 10;

          if ((index + 1) % 3 == 0) {
            i = 0;
            count++;
          } else {
            i++;

            if ((count * 3) + 3 > $("#footstep-list").children("#footstep-list-div").size() && trigger == 0) {
              trigger++;
            }
          }

          if($(".footstep_list_home").children("#footstep-list-div").size() -1 == listIndex ) {
            console.log("children(#footstep-list-div) = " + $(".footstep_list_home").children("#footstep-list-div").size() + ", index = " + listIndex);
            maxVal = topPxs[i].topPx;
          }

        });
        console.log("maxVal = " + maxVal)
        $('.footstep-list_end').css('top', maxVal + 500);

      } else {
        $('.footstep-list_end').css('display', 'none');
      }
    }

  },miles);
}

function displayProfilePosition(miles){
  var timer = setInterval(function(){
    clearInterval(timer);

    if ($(window).width() < mobileSize) {
      $('.footstep_list_profile').css("padding", "0px 5%");
      $('.footstep-list-div').css('width', '95%');
      $('.profile_middle').css("margin", "0px ");
      $('.profile_top-edit-info').css("margin", "0px 35%");
      $('.profile_top-edit-info').css("left", "0px");
      $('.footstep-list_profile_end').css('position', 'relative');
      $('.footstep-list_profile_end').css('float', 'left');
    } else {

      if ($(".footstep_list_profile").children("#footstep-list-div").size() > 4) {
        var i = 0;
        var count = 0;
        var trigger = 0;
        var topPxs = [
          {"topPx": 320, "leftPx": "0%"},
          {"topPx": 320, "leftPx": "20%"},
          {"topPx": 320, "leftPx": "40%"},
          {"topPx": 320, "leftPx": "60%"},
          {"topPx": 320, "leftPx": "80%"}
        ];

        var maxVal = 30;
        $("#footstep-list").children("#footstep-list-div").each(function (index, element) {

          $(element).css({
            "position": "absolute",
            "width": '18%',
            "top": topPxs[i].topPx + "px",
            "left": topPxs[i].leftPx + ""
          });

          topPxs[i].topPx = topPxs[i].topPx + $(element).height() + 10;

          if ((index + 1) % 5 == 0) {
            i = 0;
            count++;
          } else {

            i++;

            for (var j = 0; j < 3; j++) {
              maxVal = topPxs[j];
              if (maxVal < topPxs[j + 1] && j < 2) {
                maxVal = topPxs[j + 1];
              }
            }

            if ((count * 5) + 5 > $("#footstep-list").children("#footstep-list-div").size() && trigger == 0) {
              // i = 0;
              trigger++;
              // alert("test");
            }
          }
        });
        $('.footstep-list_profile_end').css('top', maxVal.topPx + 500);

      }
    }
  },miles);
}

buybsControllers.controller('loginCtrl', ['$scope', '$cookies', '$window', '$http', function($scope, $cookies, $window, $http){

  var cookieUser = $cookies.get("username");
  if(cookieUser) {

    if($cookies.get('u_avatar')) {
      $("#login_username").html("<a href='#/profile?u_id="+ $cookies.get('u_id') +"'><div class='user-avatar'><img title='"+ cookieUser +"' class='user-avatar-img' src='"+ $cookies.get('u_avatar') +"'></div></a>");
    } else {
      $("#login_username").html("<a href='#/profile?u_id=" + $cookies.get('u_id') + "'><div class='header-right-user-icon'></div></a>");
    }
    $(".header-right-logout").css("display", "block");
    $(".header-right-login").css("display", "none");
  } else {
    $(".header-right-logout").css("display", "none");
    $(".header-right-login").css("display", "block");
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
      url: ipAddress + '/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };

    $http(req).success(function(result){
      if(result.length > 0) {
        if(result[0].u_avatar) {
          $("#login_username").html("<a href='#/profile?u_id=" + result[0].u_id + "'><div class='user-avatar'><img title='"+ result[0].u_name +"' class='user-avatar-img' src='"+ result[0].u_avatar +"'></div></a>");
          $cookies.put('u_avatar', result[0].u_avatar);
        } else {
          $("#login_username").html("<a href='#/profile?u_id=" + result[0].u_id + "'><div class='header-right-user-icon'></div></a>");
        }
        $cookies.put('username', result[0].u_name);
        $cookies.put('u_id', result[0].u_id);
        $(".header-right-logout").css("display", "block");
        $(".header-right-login").css("display", "none");
        $("#login-popup").css("display", "none");
        $(".login-cover").css("display", "none");
        $("body").css("overflow","auto");
        $window.location.href="#/foot";
      }else {
        $(".login-popup-form-invalid").css("display", "block");
        $scope.user = angular.copy($scope.data);
      }
    }, function(error){
      console.log(error);
    });
  };

  $scope.user = angular.copy($scope.data);


}]);

/* Get footsteps list */
buybsControllers.controller('FootstepsListCtrl', ['$scope', '$http', '$cookies', '$window', function ($scope, $http, $cookies, $window) {

  console.log("Browser width: " + $(window).width());

  $http({method: 'GET', url: ipAddress + '/footsteps/getFootsteps', params:{index_start: 0, count: 9}})
      .success(function(data){
        $scope.footsteps = data;
        $('.footstep_list_home').css("display","block");
        displayPosition(500);
      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        console.log('countries: ' + data);
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });

  $scope.countryFilter = function(element, fs_from){
    $http({method: 'GET', url: ipAddress + '/footsteps/getFootsteps', params:{fs_from: fs_from}})
        .success(function(data){
          $scope.footsteps = data;
          displayPosition(500);
          $scope.number = data.length;
        }, function(error){
          $scope.error = error;
        });
  };


  $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsNumber'})
      .success(function(data){
        $scope.number = data[0].number;
      },function(error){
        $scope.error = error;
      });


  $scope.isbusy = false;
  $scope.loadMore = function() {

    console.log("Community load more!!! Topics: " + $scope.footsteps.length);
    if($scope.number > $scope.footsteps.length) {
      $scope.isbusy = true;
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getFootsteps',
        params: {index_start: $scope.footsteps.length, count: 3}
      }).success(function (data) {
        console.log("data length: " + data.length);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }
          $scope.isbusy = false;
          $('.footstep_list_home').css("display","none");
          displayPosition(1);
          $('.footstep_list_home').css("display","block");

        }
      }, function (error) {
        $scope.error = error;
      });
    }
  };


  $scope.stickBtn = function(id){

    console.log("User: " + $cookies.get('u_id'));
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
    }

    $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          if(data.length > 0 ) {
            alert("已经收藏成功");
          } else {
            var req = {
              method: 'POST',
              url: ipAddress + '/sticks/add',
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

  $scope.loginCheck = function(fs_id) {
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
    } else {
      $window.location.href = "#/foot/" + fs_id;
    }
  };

  $scope.likeBtn = function(id){
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
    }

    $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          console.log(data);
          if(data.length > 0) {
            alert('每个人只能喜欢一次哦');
          } else {
            var req = {
              method: 'POST',
              url: ipAddress + '/likes/add',
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

}]);

/* get footstep detail by foot id */
buybsControllers.controller('FootDetailCtrl', ['$scope', '$routeParams', '$http', '$cookies', '$window', function ($scope, $routeParams, $http, $cookies, $window) {


  $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsDetail', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        console.log('data: ' + (JSON.stringify(data)));
        $scope.foot = data[0];

        if($(window).width() < mobileSize){
          $('.foot_wrapper-back').css("padding", "0px 5% 0px 5%");
          $('.foot_wrapper-main').css("padding", "0px 5% 0px 5%");
        }

      }, function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/comments/getCommentsByFSID', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        console.log('comments data: ' + (JSON.stringify(data)));
        $scope.comments = data;
      }, function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/sticks/getSticksByFSID', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        console.log('sticks data: ' + (JSON.stringify(data)));
        $scope.sticks = data;
      }, function(error){
        $scope.error = error;
      });


  $scope.backHome = function () {
    // window.history.go(-1);
    window.location.href = '#/foot'
  };

  $scope.stickBtn = function(id){

    $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
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

    $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          console.log(data);
          if(data.length > 0) {
            alert('每个人只能喜欢一次哦');
          } else {
            var req = {
              method: 'POST',
              url: ipAddress + '/likes/add',
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

  $scope.followUpBtn = function(id) {


    $http({method: 'GET', url: ipAddress + '/followers/getFollowCheck', params:{u_id:id, fl_fl_id:$cookies.get('u_id')}})
        .success(function(data){
          console.log('follower check data: ' + (JSON.stringify(data.length)));
          if(data.length == 0){
            var reqData = {
              u_id: id,
              fl_fl_id: $cookies.get('u_id')
            };
            var req = {
              method: 'POST',
              url: ipAddress + '/followers/add',
              headers: {
                'Content-Type': 'application/json'
              },
              data: reqData
            };

            console.log("follow up: " + JSON.stringify(reqData));

            $http(req).success(function(result){
              console.log('added:' + result);
              $window.location.reload();
            }, function(error){
              console.log(error);
            });
          } else {
            alert("您已经关注成功了.");
          }

        }, function(error){
          $scope.error = error;
        });
  };

  $scope.addComment = {
    cm_content: '',
    fs_id: '',
    u_id: $cookies.get('u_id')
  };

  $scope.submit = function(){

    $scope.addComment.fs_id = $scope.foot.fs_id;
    $scope.addComment.cm_content = CKEDITOR.instances.editor1.getData();
    var req = {
      method: 'POST',
      url: ipAddress + '/comments/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.addComment)
    };

    console.log("add comment: " + JSON.stringify(CKEDITOR.instances.editor1.getData()));

    $http(req).success(function(result){
      console.log('added comment:' + result);
      $window.location.reload();
    }, function(error){
      console.log(error);
    });
  };

  
  
}]);

/* sign up */
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
      url: ipAddress + '/users/create',
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

/* header */
buybsControllers.controller('headerController', ['$scope', '$cookies', '$window', function($scope, $cookies, $window){
  
  $scope.homepageBtn = function() {
    $window.location = '#/foot';
    $window.location.reload();
  };
  
  $scope.logout = function(){
    console.log("remove cookies");
    $cookies.remove('username');
    $cookies.remove('u_id');
    $window.location.href = '#/foot';
    $window.location.reload();
  }

}]);

/* welcome */
buybsControllers.controller('WelcomeCtrl', ['$scope', '$cookies', '$window', function($scope, $cookies, $window){

}]);

/* Register */
buybsControllers.controller('RegisterCtrl', ['$scope', '$cookies', '$window', function($scope, $cookies, $window){

  $("#login-popup").css("display", "none");
  $(".login-cover").css("display", "none");
  $("body").css("overflow","auto");

}]);

/* Login */
buybsControllers.controller('LoginController', ['$scope', '$http', '$window', '$cookies', function($scope, $http, $window, $cookies) {

  var cookieUser = $cookies.get("username");
  if(cookieUser) {

    if($cookies.get('u_avatar')) {
      $("#login_username").html("<a href='#/profile?u_id="+ $cookies.get('u_id') +"'><div class='user-avatar'><img title='"+ cookieUser +"' class='user-avatar-img' src='"+ $cookies.get('u_avatar') +"'></div></a>");
    } else {
      $("#login_username").html("<a href='#/profile?u_id=" + $cookies.get('u_id') + "'><div class='header-right-user-icon'></div></a>");
    }
    $(".header-right-logout").css("display", "block");
    $(".header-right-login").css("display", "none");
  } else {
    $(".header-right-logout").css("display", "none");
    $(".header-right-login").css("display", "block");
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
      url: ipAddress + '/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };
    console.log("login : " + JSON.stringify($scope.user));

    $http(req).success(function(result){
      if(result.length > 0) {

        console.log('login result:' + JSON.stringify(result));
        if(result[0].u_avatar) {
          $("#login_username").html("<a href='#/profile?u_id=" + result[0].u_id + "'><div class='user-avatar'><img title='"+ result[0].u_name +"' class='user-avatar-img' src='"+ result[0].u_avatar +"'></div></a>");
          $cookies.put('u_avatar', result[0].u_avatar);
        } else {
          $("#login_username").html("<a href='#/profile?u_id=" + result[0].u_id + "'><div class='header-right-user-icon'></div></a>");
        }

        $cookies.put('username', result[0].u_name);
        $cookies.put('u_id', result[0].u_id);
        $(".header-right-logout").css("display", "block");
        $(".header-right-login").css("display", "none");
        $("#login-popup").css("display", "none");
        $(".login-cover").css("display", "none");
        $("body").css("overflow","auto");
        $window.location.href="#/foot";
      }else {
        $(".login-popup-form-invalid").css("display", "block");
        $scope.user = angular.copy($scope.data);
      }
    }, function(error){
      console.log(error);
    });
  };

  $scope.user = angular.copy($scope.data);

}]);

/* mange user's info */
buybsControllers.controller('ProfileController', ['$scope', '$http', '$window','$cookies','$routeParams', function($scope, $http, $window, $cookies, $routeParams) {

  var data = {
    fs_desc: '',
    fs_from: '',
    fs_pic: '',
    fs_bigImg: '',
    fs_smallImg:''
  };
  $scope.footstep = angular.copy(data);

  $scope.createBtn = function(){
    $window.location.href = "#/footsteps/add";
  };

  $scope.editProfileBtn = function(){
    $window.location.href = "#/profile/edit";
  };

  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        console.log('countries: ' + data);
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });
  
  $http({method: 'GET', url: ipAddress + '/users/getUserById', params:{u_id:$cookies.get('u_id')}})
      .success(function(data){
        console.log('user: ' + data);
        $scope.user = data[0];
      }, function(error){
        $scope.error = error;
      });
  
  $http({method: 'GET', url: ipAddress + '/users/getUserDetail', params:{u_id: $routeParams.u_id}})
      .success(function(data){
        console.log(JSON.stringify(data));
        $scope.userProfile = data;

        if($(window).width() < mobileSize){
          $('.profile_middle').css("margin", "0px");
        }

      }, function(error){
        $scope.error = error;
      });

  var val = 0;
  $scope.isbusy = false;
  $scope.loadMore = function() {
    console.log("profile load more! val = " + val);
    if(val == 1) {
      $scope.isbusy = true;
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getFootsteps',
        params: {
          u_id: $cookies.get('u_id'),
          index_start: $scope.footsteps.length,
          count: 5
        }
      }).success(function (data) {
        console.log(data.length);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }

          displayProfilePosition(50);
        }
        $scope.isbusy = false;

      }, function (error) {
        $scope.error = error;
      });
    } else {
      $scope.isbusy = true;
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getStickFootstepsByUID',
        params: {
          u_id: $cookies.get('u_id'),
          index_start: $scope.footsteps.length,
          count: 5
        }
      }).success(function (data) {
        console.log(data.length);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }

         displayProfilePosition(50);
        }
        $scope.isbusy = false;

      }, function (error) {
        $scope.error = error;
      });
    }

  };
  
  $scope.profileFootsteps = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsByUID', params:{u_id: u_id, index_start: 0, count: 9}})
        .success(function(data){
          $scope.footsteps = data;
          // $("#footstep-list").css("display", "block");
          val = 1;
          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });
    displayProfilePosition(100);
    // preview = setInterval(timePage, 1000);
  };
  
  $scope.profileSticks = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/footsteps/getStickFootstepsByUID', params:{u_id: u_id, index_start: 0, count: 9}})
        .success(function(data){
          $scope.footsteps = data;
          // $("#footstep-list").css("display", "block");
          val = 2;
          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });
    displayProfilePosition(100);
    // preview = setInterval(timePage, 1000);
  };

  $scope.profileFollows = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/followers/getFollowsByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.results = data;
          $("#footstep-list").css("display", "none");
        }, function(error){
          $scope.error = error;
        });
  };

  $scope.profileFans = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/followers/getFansByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.results = data;
          $("#footstep-list").css("display", "none");
        }, function(error){
          $scope.error = error;
        });
  };

}]);

/* Message to site owner */
buybsControllers.controller('FootstepAddController', ['$scope', '$cookies', '$window', '$http', function($scope, $cookies, $window, $http){


  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        console.log('countries: ' + data);
        $scope.countries = data;
        if($(window).width() > 800) {
          $(".create_footstep").css("margin", "50px 20%");
        }
      }, function(error){
        $scope.error = error;
      });

  $scope.closeBtn = function() {
    // $window.history.go(-1);
    $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
  };

  $scope.submit = function() {

    var footstepData = {
      fs_desc: $scope.footstep.fs_desc,
      fs_from: $scope.footstep.fs_from,
      fs_pic: $scope.footstep.fs_smallImg,
      u_id: $cookies.get('u_id'),
      fs_bigImg: $scope.footstep.fs_bigImg,
      fs_smallImg: $scope.footstep.fs_smallImg
    };

    console.log("shopData: " + JSON.stringify(footstepData));

    var req = {
      method: 'POST',
      url: ipAddress + '/footsteps/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(footstepData)
    };

    $http(req).success(function(result){
      // alert("添加成功");
      $('.create_footstep').css("display","none");
      $('#create_footstep-info-image').css('background-image', null);
      $window.location.reload();
    }, function(error){
      console.log(error);
    });
  };


  $scope.uploadFile = function(file) {
    console.log('upload file');
    var file_data = $(file).prop('files')[0];
    var form_data = new FormData();
    form_data.append('u_id', $cookies.get('u_id'));
    form_data.append("file", file_data);

    $.ajax({
      url: ipAddress + "/api/uploadPhotos",
      contentType: false,
      data: form_data,
      processData: false,
      cache: false,
      type: "POST",
      success: function (res) {
        console.log('successfully uploaded, URL: ' + res);
        $(file).parent().css("background-image", 'url(' + res.bigImg + ')');
        $(file).parent().nextAll("#upload_smallImg-href").val(res.smallImg);
        $(file).parent().nextAll("#upload_bigImg-href").val(res.bigImg);
        $(file).parent().nextAll("#upload_smallImg-href").change();
        $(file).parent().nextAll("#upload_bigImg-href").change();
        $(file).css("display", "none");
      }
    });
  }


}]);

/* Message to site owner */
buybsControllers.controller('ProfileEditController', ['$scope', '$cookies', '$window', '$http', function($scope, $cookies, $window, $http){


  $scope.closeBtn = function() {
    // $window.history.go(-1);
    $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
  };

  $http({method: 'GET', url: ipAddress + '/users/getUserById', params:{u_id:$cookies.get('u_id')}})
      .success(function(data){
        console.log('user: ' + data);
        $scope.user = data[0];

        if($(window).width() < 800) {
          $(".profile_top").css("margin", "50px 5% 100px 5%");
        }

      }, function(error){
        $scope.error = error;
      });

  $scope.updateSubmit = function() {

    console.log("userData: " + JSON.stringify($scope.user));

    var reqData = {
      u_name: $scope.user.u_name,
      u_avatar: $scope.user.u_avatar,
      u_link: $scope.user.u_link,
      u_slogan: $scope.user.u_slogan,
      u_id: $scope.user.u_id
    };

    var req = {
      method: 'POST',
      url: ipAddress + '/users/update',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(reqData)
    };

    $http(req).success(function(result){
      console.log("添加成功");
      $('.profile_top').css("display","none");
    }, function(error){
      console.log(error);
    });
  };

  $scope.uploadAvatar = function(file) {
    console.log('upload file');
    var file_data = $(file).prop('files')[0];
    var form_data = new FormData();
    form_data.append('u_id', $cookies.get('u_id'));
    form_data.append("file", file_data);

    $.ajax({
      url:  ipAddress + "/api/uploadAvatar",
      contentType: false,
      data: form_data,
      processData: false,
      cache: false,
      type: "POST",
      success: function (res) {
        console.log('uploaded, URL: ' + res);
        $(file).prev().css("background-image", 'url(' + res + ')');
        $scope.user.u_avatar = res;
        $(file).css("display", "none");
      }
    });
  };


}]);

/* Message to site owner */
buybsControllers.controller('MessageController', ['$scope', '$cookies', '$window', '$http', function($scope, $cookies, $window, $http){

  $scope.message = {
    u_id: $cookies.get('u_id'),
    m_content: ''
  };

  $scope.submit = function(){

    var req = {
      method: 'POST',
      url: ipAddress + '/messages/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.message)
    };

    console.log("message to Station house : " + JSON.stringify($scope.message));

    $http(req).success(function(result){
      console.log('message sent:' + result);
      alert("留言发送成功.");
      $window.location.reload();
    }, function(error){
      console.log(error);
    });
  };
  

}]);

/* community */
buybsControllers.controller('CommunityCtrl', ['$scope', '$cookies', '$window', '$http', function($scope, $cookies, $window, $http){

  $http({method: 'GET', url: ipAddress + '/topics/getTopics', params:{index_start: 0, count: 12}})
      .success(function(data){
        $scope.topics = data;
      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/topicClicks/topUsers'})
      .success(function(data){
        $scope.topUsers = data;
      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/topics/getTopicsNumber'})
      .success(function(data){
        $scope.number = data[0].number;
      },function(error){
        $scope.error = error;
      });


  $scope.isbusy = false;
  $scope.loadMore = function() {

      console.log("Community load more!!! Topics: " + $scope.topics.length);
      if($scope.number > $scope.topics.length) {
        $scope.isbusy = true;
        $http({
          method: 'GET',
          url: ipAddress + '/topics/getTopics',
          params: {index_start: $scope.topics.length, count: 3}
        }).success(function (data) {
            console.log("data length: " + data.length);
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              $scope.topics.push(data[i]);
            }
            $scope.isbusy = false;
            // $scope.topics.push(data);
          }
        }, function (error) {
          $scope.error = error;
        });
      }
  };




  $scope.topicLoginCheck = function(tp_id) {
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
    } else {
      var click = {
        tp_id: tp_id,
        u_id: $cookies.get('u_id')
      };

      var req = {
        method: 'POST',
        url: ipAddress + '/topicClicks/add',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(click)
      };
      console.log(click);

      $http(req).success(function(result){
        $window.location.href = "#/community/topics/" + tp_id;
      }, function(error){
        console.log(error);
      });

    }
  };

  $scope.addLoginCheck = function() {
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
    } else {
      $window.location.href = "#/community/topics/addTopic";
    }
  };


}]);


buybsControllers.controller('TopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams', function($scope, $cookies, $window, $http, $routeParams){

  $http({method: 'GET', url: ipAddress + '/topics/getTopicsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.topic = data[0];

        console.log("here!!!!!!" + $(window).width());
        if ($(window).width() < mobileSize) {
          $('.topic_content').css("float", "left");
          $('.topic_info_elements').css({'margin-left':'0px', "float": "left", "width": "100%"});
          $('.topic_info_img').css("width", "100% ");
        }

      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/topicComments/getCommentsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.comments = data;
        $scope.commentNum = data.length;
      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/topicClicks/search', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.clicks = data;
      },function(error){
        $scope.error = error;
      });

  

  $scope.replay = {m_content: '从这里开始输入内容...'};

  $scope.likeBtn = function(tp_id){

    var like = {
      tp_id: tp_id,
      u_id: $cookies.get('u_id')
    };

    var req = {
      method: 'POST',
      url: ipAddress + '/topicLikes/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(like)
    };

    $http(req).success(function(result){
      $window.location.reload();
    }, function(error){
      console.log(error);
    });


  };

  $scope.submit = function(){

    var replayData = {
      tp_id: $scope.topic.tp_id,
      u_id: $cookies.get('u_id'),
      tp_cm_to: 0,
      tp_cm_content: CKEDITOR.instances.editor1.getData()
    };

    var req = {
      method: 'POST',
      url: ipAddress + '/topicComments/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(replayData)
    };

    console.log("topic comments replied : " + JSON.stringify(replayData));

    $http(req).success(function(result){
      $window.location.reload();
    }, function(error){
      console.log(error);
    });
  };


  $scope.closeTopic = function() {
    $window.location.href = '#/community/index';
  }



}]);


buybsControllers.controller('AddTopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams', function($scope, $cookies, $window, $http, $routeParams){


  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        console.log('countries: ' + data);
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });

  $scope.closeTopic = function() {
    $window.location.href = '#/community/index';
  };

  $scope.topic = {
    u_id: '',
    tp_about: '',
    tp_content: '从这里开始输入内容...',
    tp_img: '',
    tp_title: ''
  };

  $scope.checkVal = function() {
    if($scope.topic.tp_about == ''){
      alert('关于不能为空!');
    }

  };

  $scope.submit = function(){

    var tp_subject = "";

    if(CKEDITOR.instances.editor1.getData().length > 150){
      // tp_subject = CKEDITOR.instances.editor1.getData().substr(0, CKEDITOR.instances.editor1.getData().indexOf('</p>')+4);
      tp_subject = CKEDITOR.instances.editor1.getData().substr(0, 150);
    }else{
      tp_subject = CKEDITOR.instances.editor1.getData();
    }



    var replayData = {
      u_id: $cookies.get('u_id'),
      tp_about: $scope.topic.tp_about,
      tp_content: CKEDITOR.instances.editor1.getData(),
      tp_img: '',
      tp_title: $scope.topic.tp_title,
      tp_subject: tp_subject
    };

    if($scope.topic.tp_about == ''){
      alert('关于不能为空!');
      $window.location.reload();
    }


    var req = {
      method: 'POST',
      url: ipAddress + '/topics/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(replayData)
    };

    console.log("topic comments replied : " + JSON.stringify(replayData));

    $http(req).success(function(result){
      alert("发布成功");
      $window.location.href= '#/community/index';
    }, function(error){
      console.log(error);
    });
  };



}]);











