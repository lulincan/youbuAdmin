$(function () {
   

    layui.use('layer', function () {
        var layer = layui.layer;
        var service_code = null;
        var global = this;
        //服务器获得的验证码
        global.getCode = ()=>{
            $.get('/getCode', null, (data)=>{
                global.service_code = data.data.code;
                //设置验证码
                $('#code_input').text(global.service_code);
            })
        };
        global.getCode();
      
        //登录
        $('#login_btn').click(()=>{
            var account = $("input[name=username]").val();
            var password = $("input[name=password]").val();
            var code = $("input[name=code]").val();

            if(account == "" || password == "" || code == ""){
                layer.msg('请填写信息');
                return;
            }

            if(code != global.service_code){
                layer.msg('验证码错误');
                $("input[name=code]").val('');
                global.getCode();
                return; 
            }

            $.post('/login', {
                account: account,
                password : password
            }, (data)=>{
                layer.msg(data.data.msg);
            })
        })

    })
})