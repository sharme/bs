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

var allowScroll = false;

function displayPosition(miles, top){
  var maxTop = 0;
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

        //align the same disntance between left and right
        var balanceLength = ($('#footstep-list').width() - left*arrayAcount)/2;

        for(var h = 0; h < arrayAcount; h ++) {



          topPxs.push({"topPx": top, "leftPx": (left * h)+balanceLength});
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

            if (listIndex >= $("#footstep-list").children("#footstep-list-div").size() - 1) {
              $(element).css({
                "margin-bottom": "200px"
              });
            }
          }

          topPxs[i].topPx = topPxs[i].topPx + $(element).height() + 35;

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
        allowScroll = true;
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


/* Get footsteps list */
buybsControllers.controller('FootstepsListCtrl', ['$scope', '$http', '$cookies', '$window','$css', function ($scope, $http, $cookies, $window, $css) {

  dynamicallyCSS(mobileSize,'../css/home/footstep.css', '../css/home/footstep-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $http({method: 'GET', url: ipAddress + '/footsteps/getFootsteps', params:{index_start: 0, count: 20, u_id: $cookies.get('u_id')}})
      .success(function(data){
        $scope.footsteps = data;
        displayPosition(500,20);
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
          displayPosition(500,20);
          $scope.number = data.length;
        }, function(error){
          $scope.error = error;
        });
  };

  $scope.bgColorChange = function (divkey) {
    $(".bgColorChange"+divkey).css("background-color",'rgba(239,239,239,0.96)');

  };

  $scope.bgColorRemove = function (divkey) {
    $(".bgColorChange" + divkey).css("background-color",'white');
  };

  $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsNumber'})
      .success(function(data){
        $scope.number = data[0].number;
      },function(error){
        $scope.error = error;
      });

  $scope.isbusy = false;
  $scope.loadMore = function() {
    if($scope.number > $scope.footsteps.length) {
      $scope.isbusy = true;
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getFootsteps',
        params: {index_start: $scope.footsteps.length, count: 3,u_id: $cookies.get('u_id')}
      }).success(function (data) {
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }
          $scope.isbusy = false;
          displayPosition(500,20);
        }
      }, function (error) {
        $scope.error = error;
      });
    }
  };

  $scope.stickBtn = function(id, u_id){
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }
    $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          if(data.length > 0 ) {
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

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnStickNum' + id).html(data.length);
                  });

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
              $(".btnStick" + id).css("background-color","#43c17e");

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnStickNum' + id).html(data.length);
                  });
            }, function(error){
              console.log(error);
            });
          }
        }, function(error){
          console.log(error);
        });

  };

  $scope.loginCheck = function(fs_id) {
      $window.location.href = "#/foot/" + fs_id;
  };

  $scope.likeBtn = function(id, u_id){
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
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
             $(".btnLike" + id).css("background-color","");

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnLikeNum' + id).html(data.length);
                  });

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
              $(".btnLike" + id).css("background-color","#43c17e");

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnLikeNum' + id).html(data.length);
                  });

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

  $scope.renderHtml = function(value) {
    return $sce.trustAsHtml(value);
  };

  $scope.likeBtn = function(id, u_id){
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }

    $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          console.log(data);
          if(data.length > 0) {
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
              $(".like_footstep").css("background-color","");

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnLikeNum' + id).html(data.length);
                  });

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
              $(".like_footstep").css("background-color","darkgrey");

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/likes/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnLikeNum' + id).html(data.length);
                  });

            }, function(error){
              console.log(error);
            })
          }
        }, function(error){
          $scope.error = error;
        });
  };
  
  $scope.delBtn = function(id,u_id) {
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }
    
      var req = {
        method: 'POST',
        url: ipAddress + '/footsteps/delete',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'fs_id': id
        }
      };
  
      $http(req).success(function(result){
        if(result.errno) {
          alert("操作失败, 请稍后再试");
        } else {
          alert("删除成功");
          $window.location.href = '#/';
        }
      }, function(error){
        console.log(error);
      });
    
  };
  

  $scope.stickBtn = function(id, u_id){
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }
    $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id, u_id: $cookies.get('u_id')}})
        .success(function(data){
          if(data.length > 0 ) {
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
              $(".stick_footstep").css("background-color","");

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnStickNum' + id).html(data.length);
                  });

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
              $(".stick_footstep").css("background-color","darkgrey");

              //GET AND REFRESH STICK NUMBER
              $http({method: 'GET', url: ipAddress + '/sticks/search', params: {fs_id: id}})
                  .success(function(data){
                    $('.btnStickNum' + id).html(data.length);
                  });

            }, function(error){
              console.log(error);
            });
          }
        }, function(error){
          console.log(error);
        });
  };
  
  $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsDetail', params:{fs_id:$routeParams.footId}})
      .success(function(data){
        console.log('data: ' + (JSON.stringify(data)));
        $scope.foot = data[0];
        $scope.checkUser = $scope.foot.u_id == $cookies.get('u_id')?true:false;
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

  $scope.loginCheck = function(){
    if($cookies.get('u_id') == undefined){
      return true;
    }
  };


  $scope.followUpBtn = function(id) {

    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }
    
    $http({method: 'GET', url: ipAddress + '/followers/getFollowCheck', params:{u_id:id, fl_fl_id:$cookies.get('u_id')}})
        .success(function(data){
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

            $http(req).success(function(result){
              addEvent($http, $window, $cookies.get('u_id'),eFollow,id,ePeople,id, true);
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

    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }
    
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





// Controllers for registered or account by email address.

buybsControllers.controller('EmailRegistrationCtrl', ['$scope', '$cookies', '$window','$http','$css', function($scope, $cookies, $window,$http, $css){

  dynamicallyCSS(mobileSize, '../css/account/email_registration.css','../css/account/email_registration.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.user = {
    u_name: '',
    u_email: '',
    u_pwd: '',
    agreement: "checked"
  };

  $scope.submit = function(){
    
    if($("#register-form-password").val().length < 8){
      $('.validation_msg').html("密码长度不能小于8位数.");
      return;
    }

    if($("#register-form-username").val().length > 15) {
      $('.validation_msg').html("用户名长度不能大于16位数.");
      return;
    }

      if ($('#register_form').valid()) {
        var postData = $scope.user;
          var req = {
            method: 'POST',
            url: ipAddress + '/users/email',
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(postData)
          };
          $http(req).success(function (result) {
            if(result.errno){
              $(".validation_msg").html("注册失败, 请联系管理员.");
            } else if(result.stage){
              $(".validation_msg").html("邮箱不正确, 请填写正确的邮箱.");
            } else {
              $('.validation_msg').html("发送成功, 请您查看邮箱并完成注册操作.  如果已完成验证, 点击这里 <a href='#/email_login' style='color: black;'>登录</a>");
            }
          }, function (error) {
            console.log(error);
          });
        }
  };
  

}]);

buybsControllers.controller('EmailLoginCtrl', ['$scope', '$cookies', '$window','$http','$css', function($scope, $cookies, $window,$http, $css){

  dynamicallyCSS(mobileSize, '../css/account/email_registration.css','../css/account/email_registration.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.user = {
    u_email: '',
    u_pwd: ''
  };

  $scope.goBack = function() {
    $window.history.back();
  };

  $scope.submit = function(){
    if ($('#email_login_form').valid()) {
      var postData = $scope.user;
      var req = {
        method: 'POST',
        url: ipAddress + '/users/email_login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(postData)
      };
      $http(req).success(function (result) {
        console.log('sign up:' + result);
        if(result.errno == 1003){
          $(".validation_msg").html("您的邮箱还没有激活, 请您去邮箱完成激活操作.");
        } else if(result.errno){
          $(".validation_msg").html("登录失败, 请联系管理员.");
        }else {
          if(result.length > 0) {
            console.log(JSON.stringify(result));
            if (result[0].u_avatar) {
              $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='" + result[0].u_name + "' class='user-avatar-img' src='" + result[0].u_avatar + "'></div>&nbsp;<a href='#/profile?u_id=" + result[0].u_id + "'>" + result[0].u_name + "</a>");
              $cookies.put('u_avatar', result[0].u_avatar);
            } else {
              $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='" + result[0].u_name + "' class='user-avatar-img' src='../../img/default_icon.png'></div>&nbsp;<a href='#/profile?u_id=" + result[0].u_id + "'>" + result[0].u_name + "</a>");
            }
            $cookies.put('secret', result[0].secret);
            $cookies.put('username', result[0].u_name);
            $cookies.put('u_id', result[0].u_id);
            $(".header-right-logout").css("display", "block");
            $(".header-right-login").css("display", "none");
            $("#login-popup").css("display", "none");
            $(".login-cover").css("display", "none");
            $("body").css("overflow", "auto");
            $window.location.href = "#/foot";
            $window.location.reload();
          } else {
            $(".validation_msg").html("用户名或密码不正确, 请正确输入.");
          }
          
        }
      }, function (error) {
        console.log(error);
      });
    }
  };


}]);

buybsControllers.controller('EmailRecoveryPwdCtrl', ['$scope', '$cookies', '$window','$http','$css', function($scope, $cookies, $window,$http, $css){

  dynamicallyCSS(mobileSize, '../css/account/email_registration.css','../css/account/email_registration.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.user = {
    u_email: ''
  };

  $scope.submit = function(){
    if ($('#register_form').valid()) {
      var postData = $scope.user;
      var req = {
        method: 'POST',
        url: ipAddress + '/users/email_recovery',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(postData)
      };
      $http(req).success(function (result) {
        if(result.errno){
          $('.validation_msg').html("操作失败, 请联系管理员.");
        } else if(result.stage){
          $('.validation_msg').html("邮箱不正确, 请填写正确的邮箱.");
        }else {
          $(".validation_msg").html("重置密码邮件已经发送至您的邮箱, 请按操作完成密码设置.");
          $('#register-form-submit').css('display','none');
        }
      }, function (error) {
        console.log(error);
      });
    }
  };


}]);

buybsControllers.controller('EmailResetCtrl', ['$scope', '$cookies', '$window','$http','$css', '$routeParams', function($scope, $cookies, $window,$http, $css, $routeParams){

  dynamicallyCSS(mobileSize, '../css/account/email_registration.css','../css/account/email_registration.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.user = {
    u_email: $routeParams.u_email,
    u_pwd: '',
    secret: $routeParams.secret
  };

  $scope.submit = function(){

    if($('#register-form-password').val().length < 8) {
      $('.validation_msg').html("密码不能低于8位数.");
      return;
    }

    if ($('#register_form').valid()) {
      var postData = $scope.user;
      var req = {
        method: 'POST',
        url: ipAddress + '/users/email_reset',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(postData)
      };
      $http(req).success(function (result) {
        if(result.errno){
          $('.validation_msg').html("操作失败, 请联系管理员.");
          $('#register-form-submit').css('display','none');
        } else {
          $('#register-form-submit').css('display','none');
          $('.validation_msg').html("修改成功. 点击这里<a href='#/email_login' style='color: black;'> 登录</a>");
        }
      }, function (error) {
        console.log(error);
      });
    }
  };


}]);



// Controllers for account management by cell phone


buybsControllers.controller('LoginController', ['$scope', '$http', '$window', '$cookies','$css', function($scope, $http, $window, $cookies,$css) {

  dynamicallyCSS(mobileSize,'../css/account/login.css','../css/account/login.css',$css);
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
          $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='"+ result[0].u_name +"' class='user-avatar-img' src='"+ result[0].u_avatar +"'></div>&nbsp;<a href='#/profile?u_id=" + result[0].u_id + "'>"+ result[0].u_name +"</a>");
          $cookies.put('u_avatar', result[0].u_avatar);
        } else {
          $("#login_username").html("<div class='user-avatar'><em class='newmsg'></em><img title='"+ result[0].u_name +"' class='user-avatar-img' src='../../img/default_icon.png'></div>&nbsp;<a href='#/profile?u_id=" + result[0].u_id + "'>"+ result[0].u_name +"</a>");
        }
        $cookies.put('secret', result[0].secret);
        $cookies.put('username', result[0].u_name);
        $cookies.put('u_id', result[0].u_id);
        $(".header-right-logout").css("display", "block");
        $(".header-right-login").css("display", "none");
        $("#login-popup").css("display", "none");
        $(".login-cover").css("display", "none");
        $("body").css("overflow","auto");
        $window.location.href="#/foot";
        $window.location.reload();
      }else {
        $(".login-popup-form-invalid").css("display", "block");
        $scope.user = angular.copy($scope.data);
      }
    }, function(error){
      console.log(error);
    });
  };

  $scope.user = angular.copy($scope.data);

  $scope.goBack = function() {
    $window.history.back();
  }



}]);

buybsControllers.controller('RegisterCtrl', ['$scope', '$cookies', '$window','$http','$css', function($scope, $cookies, $window,$http, $css){

  dynamicallyCSS(mobileSize, '../css/register/register.css','../css/register/register-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.user = {
    username: '',
    phoneNumber: '',
    password: '',
    scCode: '',
    agreement: "checked"
  };

  $scope.goBack = function() {
    $window.history.back();
  };

  $scope.submit = function(){

    if ($('#register_form').valid()) {
      if($('#register-form-phoneNumber').val().length != 11){
        $('.validation_msg').html("请输入正确的手机号");
        return;
      }

      if($('#register-form-password').val().length < 8) {
        $('.validation_msg').html("密码长度不能低于8位");
        return;
      }

      if($scope.scCode) {
        $('.validation_msg').html("验证码不能为空");
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
          $('.validation_msg').html("请输入正确验证码");
        } else if(result === '03'){
          $('.validation_msg').html("验证码失效.");
        }else {

          var req = {
            method: 'POST',
            url: ipAddress + '/users/create',
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(postData)
          };

          $http(req).success(function (result) {
            if(result.errno){
              $('.validation_msg').html("注册失败, 请联系管理员.");
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
  };


  $scope.sendVerifyCode = function() {

    if ($('#register-form-phoneNumber').val().length == 11 && $('#register-form-password').val().length >= 8 && $('#register-form-username').val().length > 4 ) {

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
      $('.validation_msg').html("请输入正确的手机号码");
    } else if ($('#register-form-password').val().length < 8){
      $('.validation_msg').html("密码长度不能低于8位");
    } else if ($('#register-form-username').val().length < 4){
      $('.validation_msg').html("用户名长度太短");
    }
  }

}]);

buybsControllers.controller('RecoveryPwdCtrl', ['$scope', '$cookies', '$window','$http','$css', function($scope, $cookies, $window,$http, $css){

  dynamicallyCSS(mobileSize, '../css/account/register.css','../css/account/register.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.user = {
    phoneNumber: '',
    scCode: ''
  };

  $scope.goBack = function() {
    $window.history.back();
  };
  
  $scope.submit = function(){

      if($scope.user.phoneNumber.length != 11){
        $('.validation_msg').html("请输入正确的手机号");
        return;
      }

      if(!$scope.user.scCode){
      $('.validation_msg').html("验证码不能为空");
      return;
      }

      var req = {
        method: 'GET',
        url: ipAddress + "/api/checkCode?to=" + $scope.user.phoneNumber + "&scCode=" + $scope.user.scCode + "&secret=true",
        headers: {
          'Content-Type': 'application/json'
        }
      };

      $http(req).success(function (result) {
        if (result === "00") {
          alert("请输入正确验证码");
          $window.location.reload();
        } else if(result === '03'){
          alert("验证码失效.");
          $window.location.reload();
        }else {
          $window.location.href = "#/reset_pwd?u_phone_num=" + $scope.user.phoneNumber+"&secret=" + result;
        }
      }, function (error) {
        console.log(error);
      });

  };

  $scope.sendVerifyCode = function() {

    if ($('#register-form-phoneNumber').val().length == 11 ) {

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
    }
  }

}]);

buybsControllers.controller('ResetPwdCtrl', ['$scope', '$cookies', '$window', '$http', '$css', '$routeParams', function($scope, $cookies, $window, $http, $css, $routeParams){

  dynamicallyCSS(mobileSize, '../css/account/reset.css','../css/account/reset.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.user = {
    phoneNumber: $routeParams.u_phone_num,
    secret: $routeParams.secret,
    password: '',
    rePassword: ''
  };

  $scope.submit = function(){
    if($scope.user.password.length < 8){
      $(".reset-popup-form-invalid").css("display", "none");
      $(".reset-popup-pwd-invalid").css("display", "block");
      return;
    }

    if($scope.user.password != $scope.user.rePassword){
      $(".reset-popup-pwd-invalid").css("display", "none");
      $(".reset-popup-form-invalid").css("display", "block");
      return;
    }

    var req = {
      method: 'POST',
      url: ipAddress + '/users/updatePwd',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify($scope.user)
    };

    $http(req).success(function(result){
      if(result == '01') {
        alert("非法请求, 请稍后尝试");
      } else {
        $window.location.href = '#/reset_result';
      }
    }, function(error){
      console.log(error);
    });
  };


}]);

buybsControllers.controller('ResetResultCtrl', ['$scope', '$cookies', '$window', '$http', '$css', '$routeParams', function($scope, $cookies, $window, $http, $css, $routeParams){

  dynamicallyCSS(mobileSize, '../css/account/reset.css','../css/account/reset.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.back = 10;

  var resetResult = setInterval(function () {
    $('.pwd_result').text(" 密码修改完成, (" + $scope.back + "s) 跳转到登录页面.");
    $scope.back--;
    if ($scope.back == 0) {
      clearInterval(resetResult);
     $window.location.href = '#/login'
    }
  }, 1000);


}]);




// Controllers for account profile management


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

  $scope.bgColorChange = function (divkey) {
    $(".bgColorChange"+divkey).css("background-color",'rgba(239,239,239,0.96)');

  };

  $scope.bgColorRemove = function (divkey) {
    $(".bgColorChange" + divkey).css("background-color",'white');
  };
  
  $scope.isMobile = function (){
    if($(".view-container").width() < (mobileSize - 100)){
      return true;
    }
  };
  
  $http({method: 'GET', url: ipAddress + '/countries/getCountries'})
      .success(function(data){
        console.log('countries: ' + data);
        $scope.countries = data;
      }, function(error){
        $scope.error = error;
      });
  
  $http({method: 'GET', url: ipAddress + '/users/getUserById', params:{u_id:$cookies.get('u_id'),secret:$cookies.get('secret')}})
      .success(function(data){
        console.log('user: ' + data);
        $scope.user = data[0];
      }, function(error){
        $scope.error = error;
      });
  
  $http({method: 'GET', url: ipAddress + '/users/getUserDetail', params:{u_id: $routeParams.u_id,secret:$cookies.get('secret')}})
      .success(function(data){
        $scope.userProfile = data;
      }, function(error){
        $scope.error = error;
      });



  $scope.loadMore = function() {
    $scope.isbusy = true;
    console.log("loadmore= " + $scope.val);
    if($scope.val === 1 && allowScroll === true) {
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getFootstepsByUID',
        params: {
          u_id: $cookies.get('u_id'),
          index_start: $scope.footsteps.length,
          count: 5
        }
      }).success(function (data) {
        console.log("loaded = " + data.length);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }
          $scope.isbusy = false;
          displayPosition(500,50);
        } else {
          $scope.isbusy = true;
        }

      }, function (error) {
        $scope.error = error;
      });
    } else if($scope.val === 2 && allowScroll === true){
      $http({
        method: 'GET',
        url: ipAddress + '/footsteps/getStickFootstepsByUID',
        params: {
          u_id: $cookies.get('u_id'),
          index_start: $scope.footsteps.length,
          count: 5
        }
      }).success(function (data) {
        console.log("loaded = " + data.length);
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            $scope.footsteps.push(data[i]);
          }

          $scope.isbusy = false;
          displayPosition(300,50);
        } else {
          $scope.isbusy = true;
        }


      }, function (error) {
        $scope.error = error;
      });
    }

  };

  $scope.footsteps = [];
  $scope.val = 1;
  $scope.isbusy = false;
  allowScroll = true;
  $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsByUID', params:{u_id: $cookies.get("u_id"), index_start: 0, count: 12}})
      .success(function(data){
        $scope.footsteps = data;
        $('.follow-list').css("display",'none');
        $(".footstep-list").css("display", "block");
        displayPosition(500,50);
        $scope.results = null;
      }, function(error){
        $scope.error = error;
      });

  
  $scope.profileFootsteps = function(u_id) {
    $scope.footsteps = [];
    $scope.val = 1;
    $scope.isbusy = false;
    allowScroll = true;
    $http({method: 'GET', url: ipAddress + '/footsteps/getFootstepsByUID', params:{u_id: u_id, index_start: 0, count: 12}})
        .success(function(data){
          $scope.footsteps = data;
          $('.follow-list').css("display",'none');
          $(".footstep-list").css("display", "block");
          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });
    displayPosition(500,50);
  };
  
  $scope.profileSticks = function(u_id) {
    $scope.footsteps = [];
    $scope.val = 2;
    $scope.isbusy = false;
    allowScroll = true;
    $http({method: 'GET', url: ipAddress + '/footsteps/getStickFootstepsByUID', params:{u_id: u_id, index_start: 0, count: 12}})
        .success(function(data){
          $scope.footsteps = data;
          $('.follow-list').css("display",'none');
          $(".footstep-list").css("display", "block");
          $scope.results = null;
        }, function(error){
          $scope.error = error;
        });
    displayPosition(500,50);
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
      fs_smallImg: $scope.footstep.fs_smallImg,
      secret: $cookies.get('secret')
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
      if(result.errno){
        alert("创建失败, 请稍后再试.");
      } else {
        alert("恭喜, 创建成功.");
        $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
      }
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
        },
        error: function(res) {
          $('#myBar').text('上传失败!');
        }
      });
  }

}]);

buybsControllers.controller('ProfileEditController', ['$scope', '$cookies', '$window', '$http','$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/profile/edit.css','../css/profile/edit-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $scope.closeBtn = function() {
    $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
  };

  $http({method: 'GET', url: ipAddress + '/users/getUserById', params:{u_id:$cookies.get('u_id'),secret:$cookies.get('secret')}})
      .success(function(data){
        $scope.user = data[0];
      }, function(error){
        $scope.error = error;
      });

  $scope.updateSubmit = function() {
    var reqData = {
      u_name: $scope.user.u_name,
      u_avatar: $scope.user.u_avatar,
      u_link: $scope.user.u_link,
      u_slogan: $scope.user.u_slogan,
      u_id: $scope.user.u_id,
      secret: $cookies.get('secret')
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
      if(result.errno){
        alert("更新失败, 请稍后再试.");
      } else {
        $window.location.href = '#/profile?u_id=' + $cookies.get('u_id');
      }
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
        $scope.user.u_avatar = res;
      }
    });
  };

}]);





// Controllers for community.  


buybsControllers.controller('CommunityCtrl', ['$scope', '$cookies', '$window', '$http', '$css', '$sce', function($scope, $cookies, $window, $http, $css, $sce){

  dynamicallyCSS(mobileSize, '../css/community/community.css','../css/community/community-m.css', $css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $http({method: 'GET', url: ipAddress + '/topics/getTopics', params:{index_start: 0, count: 12, u_id: $cookies.get('u_id')}})
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
    // if($cookies.get('u_id') == undefined){
    //   $window.location.href = '#/login';
    // } else {
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
    // }
  };

  $scope.addLoginCheck = function() {
    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    } else {
      $window.location.href = "#/community/topics/addTopic";
    }
  };

  $scope.renderHtml = function(value) {
    return $sce.trustAsHtml(value);
  };

}]);

buybsControllers.controller('TopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams','$css','$sce', function($scope, $cookies, $window, $http, $routeParams, $css,$sce){

  dynamicallyCSS(mobileSize, '../css/community/community.css','../css/community/community-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  $http({method: 'GET', url: ipAddress + '/topics/getTopicsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.topic = data[0];
        $scope.checkUser = $scope.topic.u_id == $cookies.get('u_id')? true: false;
      },function(error){
        $scope.error = error;
      });

  $http({method: 'GET', url: ipAddress + '/topicComments/getCommentsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        console.log(data);
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

  $scope.renderHtml = function(value) {
    return $sce.trustAsHtml(value);
  };
  
  $scope.replay = {m_content: '从这里开始输入内容...'};

  $scope.likeBtn = function(tp_id,u_id){

    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }

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


  $scope.editBtn = function(tp_id) {

    $window.location.href = '#/community/topics/editTopic?tp_id=' + tp_id;
    $window.location.reload();
  };

  

  $scope.submit = function(){

    if($cookies.get('u_id') == undefined){
      $window.location.href = '#/login';
      return;
    }

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
      addEvent($http,$window,$cookies.get('u_id'),eComment,$scope.topic.u_id,eTopic,$scope.topic.tp_id, true);
    }, function(error){
      console.log(error);
    });
  };

  $scope.closeTopic = function() {
    $window.location.href = '#/community/index';
  };

  $scope.loginCheck = function(){
    if($cookies.get('u_id') == undefined){
      return true;
    }
  };
  

}]);

buybsControllers.controller('AddTopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams','$css', function($scope, $cookies, $window, $http, $routeParams, $css){

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
    if(CKEDITOR.instances.editor1.getData().length > 180){
      tp_subject = CKEDITOR.instances.editor1.getData().substr(0, 180);
    }else{
      tp_subject = CKEDITOR.instances.editor1.getData();
    }

    var replayData = {
      u_id: $cookies.get('u_id'),
      tp_about: $scope.topic.tp_about,
      tp_content: CKEDITOR.instances.editor1.getData(),
      tp_img: '',
      tp_title: $scope.topic.tp_title,
      tp_subject: tp_subject + '...',
      tp_type: $scope.topic.tp_type,
      secret: $cookies.get('secret')
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

    $http(req).success(function(result){
      alert("发布成功");
      $window.location.href= '#/community/index';
    }, function(error){
      console.log(error);
    });
  };

}]);

buybsControllers.controller('editTopicCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams','$css','$sce', function($scope, $cookies, $window, $http, $routeParams, $css, $sce){

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

  $scope.renderHtml = function(value) {
    return $sce.trustAsHtml(value);
  };
  
  $http({method: 'GET', url: ipAddress + '/topics/getTopicsByTPID', params:{tp_id: $routeParams.tp_id}})
      .success(function(data){
        $scope.result = data[0];
      },function(error){
        $scope.error = error;
      });

  $scope.submit = function(){

    var tp_subject = "";
    if(CKEDITOR.instances.editor1.getData().length > 180){
      tp_subject = CKEDITOR.instances.editor1.getData().substr(0, 180);
    }else{
      tp_subject = CKEDITOR.instances.editor1.getData();
    }

    var replayData = {
      tp_id: $scope.result.tp_id,
      tp_about: $scope.result.tp_about,
      tp_content: CKEDITOR.instances.editor1.getData(),
      tp_title: $scope.result.tp_title,
      tp_subject: tp_subject + "...",
      tp_type: $scope.result.tp_type,
      secret: $cookies.get('secret'),
      u_id: $cookies.get('u_id')
    };

    if($scope.result.tp_about == ''){
      alert('关于不能为空!');
      return;
    }

    var req = {
      method: 'POST',
      url: ipAddress + '/topics/update',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(replayData)
    };

    // console.log("topic comments replied : " + JSON.stringify(replayData));

    $http(req).success(function(result){
      if(result.errno) {
        alert("修改失败, 请稍后再试.");
      } else {
        alert("修改成功");
        $window.location.href= '#/community/index';
      }

    }, function(error){
      console.log(error);
    });
  };

}]);





// Controller for other features.


buybsControllers.controller('MessageController', ['$scope', '$cookies', '$window', '$http', '$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  if($cookies.get('u_id') == undefined){
    $window.location.href = '#/login';
    return;
  }

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

buybsControllers.controller('AboutController', ['$scope', '$cookies', '$window', '$http', '$css', function($scope, $cookies, $window, $http, $css){

  dynamicallyCSS(mobileSize,'../css/about/about.css','../css/about/about-m.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);


}]);

buybsControllers.controller('tuyouCtrl', ['$scope', '$cookies', '$window', '$http','$routeParams','$css', function($scope, $cookies, $window, $http, $routeParams,$css){

  dynamicallyCSS(mobileSize, '../css/tuyou/tuyou.css','../css/tuyou/tuyou.css',$css);
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
    $cookies.remove('secret');
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




buybsControllers.controller('WelcomeCtrl', ['$scope', '$cookies', '$window','$css', function($scope, $cookies, $window, $css){
  dynamicallyCSS(mobileSize,'../css/welcome/welcome.css','../css/welcome/welcome.css',$css);
  dynamicallyCSS(mobileSize,'../css/default.css', '../css/default-m.css',$css);

  if($(".view-container").width() < (mobileSize - 100)){

    $scope.items = [{
      src: 'http://o99spo2ev.bkt.clouddn.com/images/big/21/1473346832363.jpg',
      title: "分享图片, 交流经验, 寻找伙伴",
      content: "上传, 管理, 分享, 评论, 社区一体化, 这里是旅行爱好者的大本营",
      position: "-220px",
      padding: "30% 30% 10% 9%"
    },
      {
        src: 'http://o99spo2ev.bkt.clouddn.com/images/big/47/1473604143983.JPG',
        title: "分享",
        content: "你是否有这样的感受, 通过分享自己的旅行经验, 美食图片 . 美景图片 你遇到了很多志同道合的人, 有些是那么一瞬间, 有些则成为了你一生的朋友, 甚至你的另一伴.",
        position: "-220px",
        padding: "30% 30% 10% 9%"
      },
      {
        src: 'http://o99spo2ev.bkt.clouddn.com/images/big/21/1473346609808.jpg',
        title: "交流",
        content: "你是否有这样的感受, 通过交流, 你学到了很多,懂得了什么不必做,什么必须做, 交流让你的旅行变的更加顺利和精彩.",
        position: "-220px",
        padding: "30% 30% 10% 9%"
      },
      {
        src: 'http://o99spo2ev.bkt.clouddn.com/images/big/21/1473335616052.jpeg',
        title: "寻找伙伴",
        content: "你是否有这样的感受, 一个人的路很美, 很精彩, 很充实, 但是如果有个他或她会更好.",
        position: "-220px",
        padding: "30% 30% 10% 9%"
      }
    ];
  } else {
    $scope.items = [{
      src: 'http://o99spo2ev.bkt.clouddn.com/wel-header.jpg',
      title: "分享图片, 交流经验, 寻找伙伴",
      content: "上传, 管理, 分享, 评论, 社区一体化, 这里是旅行爱好者的大本营"
    },
      {
        src: 'http://o99spo2ev.bkt.clouddn.com/wel_image4.JPG',
        title: "分享",
        content: "你是否有这样的感受, 通过分享自己的旅行经验, 美食图片 . 美景图片 你遇到了很多志同道合的人, 有些是那么一瞬间, 有些则成为了你一生的朋友, 甚至你的另一伴."
      },
      {
        src: 'http://o99spo2ev.bkt.clouddn.com/wel_image3.JPG',
        title: "交流",
        content: "你是否有这样的感受, 通过交流, 你学到了很多,懂得了什么不必做,什么必须做, 交流让你的旅行变的更加顺利和精彩."
      },
      {
        src: 'http://o99spo2ev.bkt.clouddn.com/wel_image5.JPG',
        title: "寻找伙伴",
        content: "你是否有这样的感受, 一个人的路很美, 很精彩, 很充实, 但是如果有个他或她会更好."
      },
      {
        src: 'http://o99spo2ev.bkt.clouddn.com/wel_image2.JPG',
        title: "",
        content: ""
      }
    ];
  }

}]);











