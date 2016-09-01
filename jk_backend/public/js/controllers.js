'use strict';

/* Controllers */

var buybsControllers = angular.module('buybsControllers', []);

var ipAddress = 'http://180.76.152.112';
var mobileSize = 550;

var eLike = 1;
var eFollow = 2;
var eCollect = 3;
var eComment = 4;
var eFootstep = 1;
var eTopic = 2;
var ePeople = 3;


function displayPosition(miles, top){
  var maxTop = 500;
  var timer = setInterval(function(){
    window.clearInterval(timer);
    // if($("#footstep-list").width() < mobileSize) {
      
    // } else {

    var arrayAcount = Math.floor($("#footstep-list").width()/248);
    var left = 248;

    if($("#footstep-list").width() < mobileSize && $("#footstep-list").width() >= (mobileSize - 100)){
      arrayAcount = 2;
      left = 248;
      top = 80;
    }
    // alert($("#footstep-list").width() < mobileSize - 100);
    if($("#footstep-list").width() < (mobileSize - 100)){
      arrayAcount = 2;
      left = 180;
    }

      if ($("#footstep-list").children("#footstep-list-div").size() > 0) {
        var i = 0;
        var count = 0;
        var trigger = 0;
        var multiply = arrayAcount;

        var topPxs = [

        ];

        for(var h = 0; h < arrayAcount; h ++) {
          topPxs.push({"topPx": top, "leftPx": left * h});
        }

        var maxVal = 30;
        var listIndex = 0;
        $("#footstep-list").children("#footstep-list-div").each(function (index, element) {
          listIndex++;
          $(element).css({
            "top": topPxs[i].topPx + "px",
            "left": topPxs[i].leftPx + "px",
            "visibility": "visible"
          });

          if(maxTop < topPxs[i].topPx) {
            maxTop = topPxs[i].topPx;
            $(element).css({
              "margin-bottom": "200px"
            });
          }

          topPxs[i].topPx = topPxs[i].topPx + $(element).height() + 25;

          if ((index + 1) % multiply == 0) {
            i = 0;
            count++;
          } else {
            i++;

            if ((count * multiply) + multiply > $("#footstep-list").children("#footstep-list-div").size() && trigger == 0) {
              trigger++;
            }
          }
          if($("#footstep-list").children("#footstep-list-div").size() -1 == listIndex ) {
            console.log("children(#footstep-list-div) = " + $(".footstep_list_home").children("#footstep-list-div").size() + ", index = " + listIndex);
            maxVal = topPxs[i].topPx;
          }
        });
        console.log("maxVal = " + maxVal);
        $('.footstep-list_end').css('top', maxVal + 500);

      } else {
        $('.footstep-list_end').css('display', 'none');
      }
    // }

  },miles);

  // $('#footstep-list').css("top", maxTop + 200 + "px");

}

function dynamicallyCSS(mobileSize, defaultCSS, mobileCSS, cssObj) {
  if($(window).width() < mobileSize - 100) {
    cssObj.add(mobileCSS);
  } else {
    cssObj.add(defaultCSS);
  }
}

function addEvent($http, $window, u_id, at_id, nf_to, tp_id, c_id, reload){

  if(u_id != nf_to) {

    var data = {
      u_id: u_id,
      at_id: at_id,
      nf_to: nf_to,
      tp_id: tp_id,
      c_id: c_id
    };
    var req = {
      method: 'POST',
      url: ipAddress + '/notifications/add',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    $http(req).success(function (result) {
      console.log('add event');
      if(reload) {
        $window.location.reload();
      }
    }, function (error) {
      console.log(error);
    });
  } else {
    if(reload){
      $window.location.reload();
    }
  }


}

buybsControllers.controller('loginCtrl', ['$scope', '$cookies', '$window', '$http','$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

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

  // console.log("cookieUser: " + cookieUser);

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
buybsControllers.controller('FootstepsListCtrl', ['$scope', '$http', '$cookies', '$window','$css', function ($scope, $http, $cookies, $window, $css) {

  dynamicallyCSS(mobileSize,'../css/home/footstep.css', '../css/home/footstep-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $http({method: 'GET', url: ipAddress + '/footsteps/getFootsteps', params:{index_start: 0, count: 12, u_id: $cookies.get('u_id')}})
      .success(function(data){
        $scope.footsteps = data;
        displayPosition(500,10);

      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });

  $scope.countryFilter = function(element, fs_from){
    $http({method: 'GET', url: ipAddress + '/footsteps/getFootsteps', params:{fs_from: fs_from,u_id: $cookies.get('u_id')}})
        .success(function(data){
          $scope.footsteps = data;
          displayPosition(500,10);
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

    // console.log("Community load more!!! Topics: " + $scope.footsteps.length);
    if($scope.number > $scope.footsteps.length) {
      $scope.isbusy = true;
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getFootsteps',
        params: {index_start: $scope.footsteps.length, count: 3,u_id: $cookies.get('u_id')}
      }).success(function (data) {
        // console.log("data length: " + data.length);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }
          $scope.isbusy = false;
          displayPosition(500,10);
        }
      }, function (error) {
        $scope.error = error;
      });
    }
  };

  $scope.stickBtn = function(id, u_id){
    // console.log("User: " + $cookies.get('u_id'));
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
    }
    $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          if(data.length > 0 ) {
            // alert("已经收藏成功");
            var req = {
              method: 'POST',
              url: ipAddress + '/sticks/delete',
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                'fs_id': id,
                'u_id': $cookies.get('u_id')
              }
            };

            $http(req).success(function(result){

              // addEvent($http, $window, $cookies.get('u_id'),eCollect,u_id,eFootstep,id);
              $(".btnStick" + id).css("background-color","");
              // console.log('unfollow stick');
            }, function(error){
              console.log(error);
            });


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

              addEvent($http, $window, $cookies.get('u_id'),eCollect,u_id,eFootstep,id, false);
              $(".btnStick" + id).css("background-color","darkgrey");
              // console.log('stick');
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

  $scope.likeBtn = function(id, u_id){
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
    }

    $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          console.log(data);
          if(data.length > 0) {
            // alert('每个人只能喜欢一次哦');
            var req = {
              method: 'POST',
              url: ipAddress + '/likes/delete',
              header: {
                'Content-Type': 'application/json'
              },
              data: {
                'fs_id': id,
                'u_id': $cookies.get('u_id')
              }
            };
            $http(req).success(function(result){
              // addEvent($http, $window, $cookies.get('u_id'),eLike,u_id,eFootstep,id);
              // console.log('unliked');
             $(".btnLike" + id).css("background-color","");
            }, function(error){
              console.log(error);
            })
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
              addEvent($http, $window, $cookies.get('u_id'),eLike,u_id,eFootstep,id, false);
              // console.log('liked');
              $(".btnLike" + id).css("background-color","darkgrey");
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
buybsControllers.controller('FootDetailCtrl', ['$scope', '$routeParams', '$http', '$cookies', '$window','$css','$sce', function ($scope, $routeParams, $http, $cookies, $window,$css,$sce) {

  dynamicallyCSS(mobileSize,'../css/home/footdetail.css','../css/home/footdetail-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  if($(window).width() < mobileSize - 100) {
    $scope.zoom = false;
  } else {
    $scope.zoom = true;
  }
  
  $scope.windowSize = $(window).width();

  $scope.trustSrc = function(src){
    return $sce.trustAsResourceUrl(src);
  };

  
  $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsDetail', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        console.log('data: ' + (JSON.stringify(data)));
        $scope.foot = data[0];
      }, function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/comments/getCommentsByFSID', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        $scope.comments = data;
      }, function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/sticks/getSticksByFSID', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        $scope.sticks = data;
      }, function(error){
        $scope.error = error;
      });


  $scope.backHome = function () {
    window.location.href = '#/foot'
  };


  $scope.followUpBtn = function(id) {

    $http({method: 'GET', url: ipAddress + '/followers/getFollowCheck', params:{u_id:id, fl_fl_id:$cookies.get('u_id')}})
        .success(function(data){
          // console.log('follower check data: ' + (JSON.stringify(data.length)));
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

            // console.log("follow up: " + JSON.stringify(reqData));

            $http(req).success(function(result){
              addEvent($http, $window, $cookies.get('u_id'),eFollow,id,ePeople,id, true);
              // console.log('added:' + result);
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

    // console.log("add comment: " + JSON.stringify(CKEDITOR.instances.editor1.getData()));

    $http(req).success(function(result){
      console.log($scope.foot.u_id + " ; " + $scope.foot.fs_id);
      addEvent($http, $window, $cookies.get('u_id'),eComment,$scope.foot.u_id,eFootstep,$scope.foot.fs_id, true);
    }, function(error){
      console.log(error);
    });
  };
  
}]);

/* header */
buybsControllers.controller('headerController', ['$scope', '$cookies', '$window','$http', function($scope, $cookies, $window,$http){
  
  $scope.homepageBtn = function() {
    $window.location = '#/foot';
    $window.location.reload();
  };
  
  $scope.logout = function(){
    console.log("remove cookies");
    $cookies.remove('username');
    $cookies.remove('u_id');
    $cookies.remove('u_avatar');
    $window.location.href = '#/foot';
    $window.location.reload();
  };

  // alert('1');
  $http({method: 'GET', url: ipAddress + '/notifications/getNotifications', params:{u_id: $cookies.get('u_id')}})
      .success(function(data){
        $scope.notifications = data;
        var newmsgShow = false;
        $scope.notifications.forEach(function (item, index) {
          // alert(item);
          for(var key in item) {
            // alert(key + " ; " + item[key]);
            if(key === 'nf_status' && item[key] == 0){
              newmsgShow = true;
              return;
            }
          }
        });
        // alert(newmsgShow);
        if(newmsgShow) {
          $('.newmsg').css("display","block");
        }else{
          $('.newmsg').css("display","none");
        }
      },function(error){
        $scope.error = error;
      });

  $scope.linkTo = function(type, c_id, nf_id) {

    $http({method: 'POST', url: ipAddress + '/notifications/consume', params: {nf_id: nf_id}})
        .success(function(data){
          if(type === '足迹'){
            $window.location.href = '#/foot/' + c_id;
          } else {
            $window.location.href = '#/community/topics/' + c_id;
          }
        }, function(error){
          $scope.error = error;
        });

  };
  

}]);

/* welcome */
buybsControllers.controller('WelcomeCtrl', ['$scope', '$cookies', '$window','$css', function($scope, $cookies, $window, $css){
  dynamicallyCSS(mobileSize,'../css/welcome/welcome.css','../css/welcome/welcome.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);
}]);

/* Register */
buybsControllers.controller('RegisterCtrl', ['$scope', '$cookies', '$window','$http','$css', function($scope, $cookies, $window,$http, $css){
  
  dynamicallyCSS(mobileSize, '../css/register/register.css','../css/register/register-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.data = {
    username: '',
    phoneNumber: '',
    password: '',
    scCode: '',
    agreement: "checked"
  };

  $scope.submit = function(){

    if ($('#register_form').valid()) {
      if($('#register-form-phoneNumber').val().length != 11){
        alert("请输入正确的手机号");
        return;
      }

      var req = {
        method: 'GET',
        url: ipAddress + "/api/checkCode?to=" + $scope.user.phoneNumber + "&scCode=" + $scope.user.scCode,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      var postData = $scope.user;

      $http(req).success(function (result) {
        if (result === "00") {
          alert("请输入正确验证码");
          $window.location.reload();
        } else if(result === '03'){
          alert("验证码失效.");
          $window.location.reload();
        }else {

          var req = {
            method: 'POST',
            url: ipAddress + '/users/create',
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(postData)
          };
          // console.log("sign up: " + JSON.stringify(postData));

          $http(req).success(function (result) {
            console.log('sign up:' + result);
            if(result.errno){
              alert("注册失败, 请联系管理员.");
            } else {
              alert("注册成功, 进行登录");
              $window.location.href = '#/login';
            }

          }, function (error) {
            console.log(error);
          });
        }
      }, function (error) {
        console.log(error);
      });
    }

    $scope.user = angular.copy($scope.data);
  };
  $scope.user = angular.copy($scope.data);


  $scope.sendVerifyCode = function() {

      if ($('#register-form-phoneNumber').val().length == 11 && $('#register-form-password').val().length > 8 && $('#register-form-username').val().length > 4 ) {

        var req = {
          method: 'GET',
          url: ipAddress + "/api/sendCode?to=" + $scope.user.phoneNumber,
          headers: {
            'Content-Type': 'application/json'
          }
        };
        $http(req).success(function (result) {

          if ("01" == result) {
            $('.sendScCode').css("pointer-events", "none");
            $scope.scCount = 60;
            var scCodeBan = setInterval(function () {

              $('.sendScCode').text("重新发送(" + $scope.scCount + "s)");
              $scope.scCount--;

              if ($scope.scCount == 0) {
                clearInterval(scCodeBan);
                $('.sendScCode').text("获取验证码");
                $('.sendScCode').css("pointer-events", "");
              }
            }, 1000);
            
          } else if ("02" == result) {
            alert("验证码发送频繁.")
          } else if ("03" == result) {
            alert("发送异常, 请联系管理员.");
          } else {
            alert("发送失败. 再试一次");
          }

        }, function (error) {
          console.log(error);
        });
      } else if ($('#register-form-phoneNumber').val().length == 0 || $('#register-form-phoneNumber').val().length != 11) {
        alert("请输入正确的手机号码");
      } else if ($('#register-form-password').val().length < 8){
        alert("密码长度不能低于8位");
      } else if ($('#register-form-username').val().length < 4){
        alert("用户名长度太短");
      }
    }

}]);

/* Login */
buybsControllers.controller('LoginController', ['$scope', '$http', '$window', '$cookies','$css', function($scope, $http, $window, $cookies,$css) {

  dynamicallyCSS(mobileSize,'../css/login/login.css','../css/login/login.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  var cookieUser = $cookies.get("username");
  if(cookieUser) {

    if($cookies.get('u_avatar')) {
      $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='"+ cookieUser +"' class='user-avatar-img' src='"+ $cookies.get('u_avatar') +"'></div>&nbsp;<a href='#/profile?u_id="+ $cookies.get('u_id') +"'>"+cookieUser +"</a>");
    } else {
      $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='"+ cookieUser +"' class='user-avatar-img' src='../../img/default_icon.png'></div>&nbsp;<a href='#/profile?u_id="+ $cookies.get('u_id') +"'>"+cookieUser +"</a>");
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
          $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='"+ result[0].u_name +"' class='user-avatar-img' src='"+ result[0].u_avatar +"'></div>&nbsp;<a href='#/profile?u_id=" + result[0].u_id + "'>"+ result[0].u_name +"</a>");
          $cookies.put('u_avatar', result[0].u_avatar);
        } else {
          $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='"+ result[0].u_name +"' class='user-avatar-img' src='../../img/default_icon.png'></div>&nbsp;<a href='#/profile?u_id=" + result[0].u_id + "'>"+ result[0].u_name +"</a>");
        }

        $cookies.put('username', result[0].u_name);
        $cookies.put('u_id', result[0].u_id);
        $(".header-right-logout").css("display", "block");
        $(".header-right-login").css("display", "none");
        $("#login-popup").css("display", "none");
        $(".login-cover").css("display", "none");
        $("body").css("overflow","auto");
        // $window.location.href="#/foot";
        // $window.location.reload();
        $window.history.back();
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
buybsControllers.controller('ProfileController', ['$scope', '$http', '$window','$cookies','$routeParams','$css', function($scope, $http, $window, $cookies, $routeParams, $css) {

  dynamicallyCSS(mobileSize,'../css/profile/profile.css','../css/profile/profile-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

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
        // console.log(JSON.stringify(data));
        $scope.userProfile = data;
      }, function(error){
        $scope.error = error;
      });

  var val = 0;
  $scope.isbusy = false;
  $scope.loadMore = function() {
    // console.log("profile load more! val = " + val);
    if(val == 1) {
      $scope.isbusy = true;
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getFootstepsByUID',
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

          displayPosition(500,320);
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
        // console.log(data.length);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }

         displayPosition(300,320);
        }
        $scope.isbusy = false;

      }, function (error) {
        $scope.error = error;
      });
    }

  };
  
  $scope.profileFootsteps = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsByUID', params:{u_id: u_id, index_start: 0, count: 12}})
        .success(function(data){
          $scope.footsteps = data;
          val = 1;
          $('.follow-list').css("display",'none');
          $(".footstep-list").css("display", "block");
          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });
    displayPosition(500,320);
  };
  
  $scope.profileSticks = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/footsteps/getStickFootstepsByUID', params:{u_id: u_id, index_start: 0, count: 12}})
        .success(function(data){
          $scope.footsteps = data;
          val = 2;
          $('.follow-list').css("display",'none');
          $(".footstep-list").css("display", "block");
          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });
    displayPosition(500,320);
  };

  $scope.profileFollows = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/followers/getFollowsByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.results = data;
          $(".footstep-list").css("display", "none");
          $('.follow-list').css("display",'block');
        }, function(error){
          $scope.error = error;
        });
  };

  $scope.profileFans = function(u_id) {
    $http({method: 'GET', url: ipAddress + '/followers/getFansByUID', params:{u_id: u_id}})
        .success(function(data){
          $scope.results = data;
          $(".footstep-list").css("display", "none");
          $('.follow-list').css("display",'block');
        }, function(error){
          $scope.error = error;
        });
  };

}]);

/* Message to site owner */
buybsControllers.controller('FootstepAddController', ['$scope', '$cookies', '$window', '$http','$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/footstep/add.css','../css/footstep/add-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });

  $scope.closeBtn = function() {
    $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
  };

  $scope.submit = function() {
    
    if($scope.footstep.fs_from == null){
      alert('国家不能为空');
      return;
    }

    if($scope.footstep.fs_desc == null){
      alert('描述不能为空');
      return;
    }

    var footstepData = {
      fs_desc: $scope.footstep.fs_desc,
      fs_from: $scope.footstep.fs_from,
      fs_pic: $scope.footstep.fs_smallImg,
      u_id: $cookies.get('u_id'),
      fs_bigImg: $scope.footstep.fs_bigImg,
      fs_smallImg: $scope.footstep.fs_smallImg
    };
    // console.log("shopData: " + JSON.stringify(footstepData));
    var req = {
      method: 'POST',
      url: ipAddress + '/footsteps/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(footstepData)
    };

    $http(req).success(function(result){
      alert("恭喜, 创建成功.");
      $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
    }, function(error){
      console.log(error);
    });
  };

var progress = 1;
  var progressBar = function(){
    progress += 1;
    if(progress < 99) {
      $('#myBar').width(progress + "%");
      $('#myBar').text(progress + "%");
    } else {
      clearInterval(progressBar);
    }
  };

  $scope.uploadFile = function(file) {
    console.log('upload file');

      setInterval(progressBar, 20);

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
          $('#myBar').width("100%");
          $('#myBar').text('上传完成!');

          console.log('successfully uploaded, URL: ' + res);
          $(file).parent().css("min-height", '0px');
          $scope.uploadUrl = res.bigImg;
          $(file).parent().nextAll("#upload_smallImg-href").val(res.smallImg);
          $(file).parent().nextAll("#upload_bigImg-href").val(res.bigImg);
          $(file).parent().nextAll("#upload_smallImg-href").change();
          $(file).parent().nextAll("#upload_bigImg-href").change();
          $(file).css("display", "none");
          $('.fileUpload').css("display", 'none');
        }
      });
  }

}]);

/* Message to site owner */
buybsControllers.controller('ProfileEditController', ['$scope', '$cookies', '$window', '$http','$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/profile/edit.css','../css/profile/edit-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.closeBtn = function() {
    $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
  };

  $http({method: 'GET', url: ipAddress + '/users/getUserById', params:{u_id:$cookies.get('u_id')}})
      .success(function(data){
        // console.log('user: ' + data);
        $scope.user = data[0];
      }, function(error){
        $scope.error = error;
      });

  $scope.updateSubmit = function() {
    // console.log("userData: " + JSON.stringify($scope.user));
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
     $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
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
        $('.profile_top_info-avatar-div_img').attr('src', res);
        // $('.profile_top_info-avatar-div_img').css("background-image", 'url(' + res + ')');
        $scope.user.u_avatar = res;
        // $window.location.reload();
        // $(file).css("display", "none");
      }
    });
  };

}]);

/* Message to site owner */
buybsControllers.controller('MessageController', ['$scope', '$cookies', '$window', '$http', '$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

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

    // console.log("message to Station house : " + JSON.stringify($scope.message));

    $http(req).success(function(result){
      // console.log('message sent:' + result);
      alert("留言发送成功.");
      $window.history.back();
    }, function(error){
      console.log(error);
    });
  };


  $scope.closeTopic = function() {
    $window.history.back();
  };
  

}]);

/* Message to site owner */
buybsControllers.controller('AboutController', ['$scope', '$cookies', '$window', '$http', '$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/about/about.css','../css/about/about-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);


}]);

/* community */
buybsControllers.controller('CommunityCtrl', ['$scope', '$cookies', '$window', '$http', '$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize, '../css/community/community.css','../css/community/community-m.css', $css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

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

  $scope.shareFilter = function() {
    if($scope.type == '分享'){
      $scope.type = '';
      $scope.shareSelected = false;
      $('.shareFilter').css('background-color','white');
    } else {
      $('.shareFilter').css('background-color','#eee');
      if($scope.topicSelected){
        $('.topicFilter').css('background-color','white');
      }
      $scope.shareSelected = true;
      $scope.type = '分享';
    }
    
    $http({method: 'GET', url: ipAddress + '/topics/getTopics', params:{index_start: 0, count: 12, tp_type: $scope.type }})
        .success(function(data){
          $scope.topics = data;
        },function(error){
          $scope.error = error;
        });
  };

  $scope.topicFilter = function(val) {
    if($scope.type == '话题'){
      $scope.topicSelected = false;
      $scope.type = '';
      $('.topicFilter').css('background-color','white');
    } else {
      if($scope.shareSelected) {
        $('.shareFilter').css('background-color','white');
      }
      $('.topicFilter').css('background-color','#eee');
      $scope.topicSelected = true;
      $scope.type = '话题';
    }

    $http({method: 'GET', url: ipAddress + '/topics/getTopics', params:{index_start: 0, count: 12, tp_type: $scope.type }})
        .success(function(data){
          $scope.topics = data;
        },function(error){
          $scope.error = error;
        });
  };
  

  $scope.isbusy = false;
  $scope.loadMore = function() {

      if($scope.number > $scope.topics.length) {
        $scope.isbusy = true;
        $http({
          method: 'GET',
          url: ipAddress + '/topics/getTopics',
          params: {index_start: $scope.topics.length, count: 3, tp_type: $scope.type}
        }).success(function (data) {
            // console.log("data length: " + data.length);
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              $scope.topics.push(data[i]);
            }
            $scope.isbusy = false;
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


buybsControllers.controller('TopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams','$css', function($scope, $cookies, $window, $http, $routeParams, $css){

  dynamicallyCSS(mobileSize, '../css/community/community.css','../css/community/community-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $http({method: 'GET', url: ipAddress + '/topics/getTopicsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.topic = data[0];
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

  $scope.likeBtn = function(tp_id,u_id){

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
      addEvent($http, $window, $cookies.get('u_id'),eLike,u_id,eTopic,tp_id, true);
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

    // console.log("topic comments replied : " + JSON.stringify(replayData));

    $http(req).success(function(result){
      addEvent($http,$window,$cookies.get('u_id'),eComment,$scope.topic.u_id,eTopic,$scope.topic.tp_id, true);
    }, function(error){
      console.log(error);
    });
  };

  $scope.closeTopic = function() {
    $window.location.href = '#/community/index';
  }

}]);


buybsControllers.controller('AddTopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams','$css', function($scope, $cookies, $window, $http, $routeParams,$css){

  dynamicallyCSS(mobileSize, '../css/community/community.css','../css/community/community-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });

  $scope.closeTopic = function() {
    $window.location.href = '#/community/index';
  };

  $scope.topic = {
    u_id: '',
    tp_about: '中国',
    tp_content: '从这里开始输入内容...',
    tp_img: '',
    tp_title: '',
    tp_type: '话题'
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
      tp_subject: tp_subject,
      tp_type: $scope.topic.tp_type
    };

    if($scope.topic.tp_about == ''){
      alert('关于不能为空!');
      return;
    }

    var req = {
      method: 'POST',
      url: ipAddress + '/topics/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(replayData)
    };

    // console.log("topic comments replied : " + JSON.stringify(replayData));

    $http(req).success(function(result){
      alert("发布成功");
      $window.location.href= '#/community/index';
    }, function(error){
      console.log(error);
    });
  };

}]);











