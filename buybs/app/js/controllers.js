'use strict';

/* Controllers */

var buybsControllers = angular.module('buybsControllers', []);

var ipAddress = 'http://localhost:3000';

/* Get footsteps list */
buybsControllers.controller('FootstepsListCtrl', ['$scope', '$http', '$cookies', '$window', function ($scope, $http, $cookies, $window) {

  $http({method: 'GET', url: ipAddress + '/footsteps/getFootsteps', params:{index_start: 0, index_end: 30}})
      .success(function(data){
        $scope.footsteps = data;
        preview = setInterval(timePage, 1000);
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
        }, function(error){
          $scope.error = error;
        });
    preview = setInterval(timePage, 100);
  };


  var range = 500;
  var totalHeight = 0;
  var number = 0;
  $(window).scroll(function(){

    if(document.location.href == "http://localhost:8000/app/#/foot") {

      var scrollTop = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)

      console.log("滚动条到顶部的垂直高度: " + $(document).scrollTop());
      console.log("页面的文档高度 ：" + $(document).height());
      console.log('浏览器的高度：' + $(window).height());

      totalHeight = parseFloat($(window).height()) + parseFloat(scrollTop);
      if (($(document).height() - range) <= totalHeight) {

        $http({
          method: 'GET',
          url: ipAddress + '/footsteps/getFootsteps',
          params: {index_start: 0, index_end: 15 + (number * 15)}
        })
            .success(function (data) {
              $scope.footsteps = data;
              preview = setInterval(timePage, 1000);
            }, function (error) {
              $scope.error = error;
            });

        number++;
      }
    }
  });


  $scope.stickBtn = function(id){

    console.log("User: " + $cookies.get('u_id'));

    if($cookies.get('u_id') == undefined){
      $("#login-popup").css("display", "block");
      $(".login-cover").css("display", "block");
      return;
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
      $("#login-popup").css("display", "block");
      $(".login-cover").css("display", "block");
      return;
    } else {
      $window.location.href = "#/foot/" + fs_id;
    }

  };

  $scope.likeBtn = function(id){

    if($cookies.get('u_id') == undefined){
      $("#login-popup").css("display", "block");
      $(".login-cover").css("display", "block");
      return;
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

  var preview;

  function timePage(){
    if($("#footstep-list").children("#footstep-list-div").size() > 5){
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

      $("#footstep-list").children("#footstep-list-div").each(function(index, element){

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

          if((count * 5) + 5 > $("#footstep-list").children("#footstep-list-div").size() && trigger == 0 ){
            // i = 0;
            trigger++;
            // alert("test");
          }
        }
      });
    }
  }
  

}]);

/* get footstep detail by foot id */
buybsControllers.controller('FootDetailCtrl', ['$scope', '$routeParams', '$http', '$cookies', '$window', function ($scope, $routeParams, $http, $cookies, $window) {


  $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsDetail', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        console.log('data: ' + (JSON.stringify(data)));
        $scope.foot = data[0];
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

    var req = {
      method: 'POST',
      url: ipAddress + '/comments/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.addComment)
    };

    console.log("add comment: " + JSON.stringify($scope.addComment));

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
      $("#login_username").html("<a href='#/profile?u_id="+ $cookies.get('u_id') +"'><div class='user-avatar'><img class='user-avatar-img' src='"+ $cookies.get('u_avatar') +"'></div></a><div class='header-right-user-icon-hover'>欢迎迹客: "+ cookieUser +"</div>");
    } else {
      $("#login_username").html("<a href='#/profile?u_id=" + $cookies.get('u_id') + "'><div class='header-right-user-icon'></div></a><div class='header-right-user-icon-hover'>欢迎迹客: " + cookieUser + "</div>");
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
          $("#login_username").html("<a href='#/profile?u_id=" + result[0].u_id + "'><div class='user-avatar'><img class='user-avatar-img' src='"+ result[0].u_avatar +"'></div></a><div class='header-right-user-icon-hover'>欢迎迹客: " + result[0].u_name + "</div>");
          $cookies.put('u_avatar', result[0].u_avatar);
        } else {
          $("#login_username").html("<a href='#/profile?u_id=" + result[0].u_id + "'><div class='header-right-user-icon'></div></a><div class='header-right-user-icon-hover'>欢迎迹客: " + result[0].u_name + "</div>");
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
    fs_pic: ''
  };
  $scope.footstep = angular.copy(data);

  
  $scope.closeBtn = function(){
    $('.create_footstep').css('display','none');
    $('.profile_top').css('display', 'none');
    $('#create_footstep-info-image').css('background-image', null);
  };
  
  
  $scope.createBtn = function(){
    $('.create_footstep').css('display','inherit');
    $("#create_footstep-info-image").css("background-image", '');

  };
  

  $scope.editProfileBtn = function(){
    $('.profile_top').css("display","block");
    if($scope.user.u_avatar) {
       // $('#avatarImg-btn').css("display", "none");
      // $('#avatarImg-btn')
    }
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

      }, function(error){
        $scope.error = error;
      });

  $scope.submit = function() {

    var footstepData = {
      fs_desc: $scope.footstep.fs_desc,
      fs_from: $scope.footstep.fs_from,
      fs_pic: $scope.footstep.fs_pic,
      u_id: $cookies.get('u_id')
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
        console.log('uploaded, URL: ' + res);
        $(file).parent().css("background-image", 'url(' + res + ')');
        // $(file).prev().src(res);
        // $scope.uploadUrl = res;
        $(file).parent().nextAll("#register_shop-href").val(res);
        $(file).parent().nextAll("#register_shop-href").change();
        $(file).css("display", "none");
      }
    });





  };
  
  $scope.uploadAvatar = function(file) {
    console.log('upload file');
    var file_data = $(file).prop('files')[0];
    var form_data = new FormData();
    form_data.append('u_id', $cookies.get('u_id'));
    form_data.append("file", file_data);

    $.ajax({
      url:  ipAddress + "/api/uploadPhotos",
      contentType: false,
      data: form_data,
      processData: false,
      cache: false,
      type: "POST",
      success: function (res) {
        console.log('uploaded, URL: ' + res);
        $(file).prev().css("background-image", 'url(' + res + ')');
        $scope.user.u_avatar = res;
        // $(file).parent().nextAll("#profile_top-edit-avatar").val(res);
        // $(file).parent().nextAll("#profile_top-edit-avatar").change();
        $(file).css("display", "none");
      }
    });
  };
  
  $scope.profileFootsteps = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.footsteps = data;
          $("#footstep-list").css("display", "block");

          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });

    preview = setInterval(timePage, 10);
  };
  
  $scope.profileSticks = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/footsteps/getSticksByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.footsteps = data;
          $("#footstep-list").css("display", "block");
          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });

    preview = setInterval(timePage, 10);
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
  
  var preview = setInterval(timePage, 10);

  function timePage(){
    if($("#footstep-list").children("#footstep-list-div").size() > 4){
      clearInterval(preview);
      var i = 0;
      var count = 0;
      var trigger = 0;
      var topPxs = [
        {"topPx":320, "leftPx":"0%"},
        {"topPx":320, "leftPx":"20%"},
        {"topPx":320,"leftPx": "40%"},
        {"topPx":320, "leftPx":"60%"},
        {"topPx":320,"leftPx": "80%"}
      ];

      $("#footstep-list").children("#footstep-list-div").each(function(index, element){
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

          if((count * 5) + 5 > $("#footstep-list").children("#footstep-list-div").size() && trigger == 0 ){
            // i = 0;
            trigger++;
            // alert("test");
          }
        }
      });
    }
  }

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

  $http({method: 'GET', url: ipAddress + '/topics/getTopics', params:{index_start: 0, index_end: 30}})
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



  $scope.topicLoginCheck = function(tp_id) {
    if($cookies.get('u_id') == undefined){
      $("#login-popup").css("display", "block");
      $(".login-cover").css("display", "block");
      return;
    } else {
      $window.location.href = "#/topics/" + tp_id;
    }
  };


}]);


buybsControllers.controller('TopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams', function($scope, $cookies, $window, $http, $routeParams){

  $http({method: 'GET', url: ipAddress + '/topics/getTopicsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.topic = data[0];
        console.log($scope.topic)
      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/topicComments/getCommentsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.comments = data;
        console.log($scope.topic)
      },function(error){
        $scope.error = error;
      });

}]);











