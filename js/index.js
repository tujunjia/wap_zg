$(function(){
    /*头部微博显示与隐藏*/
    $(".offcn_header_wb").hover(function(){
        $(".top_wb_con").show();
        $(".top_wb_con").css('zIndex',99);
    },function(){
        $(".top_wb_con").hide();
    })
    $(".offcn_header_wx").hover(function(){
        $(".top_wx_con").show();
        $(".top_wx_con").css('zIndex',99);
    },function(){
        $(".top_wx_con").hide();
    })
	//增加wow方法
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (callback) {
                    callback();
                }
            });
            return this;
        }
    });
    // 切换
    $('.m3_btn li').each(function (index) {
        $(this).mouseenter(function () {
            $('.m3_btn li').removeClass('m3_btn_on').eq(index).addClass('m3_btn_on');
            $('.m3_show').hide().eq(index).fadeIn();
        })
    })

    $('.m4_btn li').each(function (index) {
        $(this).mouseenter(function () {
            $('.m4_btn li').removeClass('m4_btn_on').eq(index).addClass('m4_btn_on');
            $('.m4_show').hide().eq(index).fadeIn();
        })
    })
})


//倒计时函数
function runcount(t) {
    document.getElementById('daojishi').innerHTML = t + 'S';
    t--;
    setTimeout(function () {
        runcount(t)
    }, 1000)
    $('#getyzm').hide()
}

$('.gb').on('click', function () {
    $('.tc,.mask').hide();
})


//提交按钮绑定的事件
$('#submit').click(function () {
    var info = {};
    info.name = $('#name').val()
    info.xuex = $('#xuex').val()
    info.tel = $('#tel').val()
    info.yzm = $('#yzm').val()
    if (info.tel == '') { //验证手机号是否为空
        alert('请填写手机号');
        return false;
    }
    var reg = /^0?1[3465789]\d{9}$/; //手机号正则
    if (!reg.test(info.tel)) { //验证手机号是否正确
        alert('请填写正确的手机号！');
        return false;
    }
    $.ajax({
        url: "http://gs.offcn.com/index.php?m=formguide&c=forms&a=show&formid=225&action=jsonp&siteid=1&verify=true",
        data: { info },
        dataType: "jsonp",
        type: "GET",
        success: function (json) {
            if (json.status == 1) {
                $('.mask').show()
                $('.tc').show();        //弹框
                $('#getyzm').css('display', 'inline-block')
                $('#daojishi').css('display', 'none')
            } else if (json.status == -1) {
                alert("请勿重复提交")
            }
        }
    })
});

//获取验证码绑定的事件
$("#getyzm").click(function () {
    var phoneval = $("#tel").val();
    $.ajax({
        url: 'http://gs.offcn.com/index.php?m=formguide&c=forms&a=send_sms&formid=225&siteid=1',
        type: 'GET',
        dataType: 'jsonp',
        data: { phone: phoneval },
        success: function (json) {
            if (json.status == 1) {
                $('#daojishi').css('display', 'inline-block')
                $('#getyzm').css('display', 'none')
                runcount(60)
                alert('发送成功')
            } else {
                alert(json.msg);
            }
        }
    })
})


