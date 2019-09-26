$(function () {
   

    layui.use('layer', function () {
        var layer = layui.layer;
      
        //登录
        $('#login_btn').click(()=>{
            var account = $("input[name=username]").val();
            var password = $("input[name=password]").val();

            if(account == "" || password == ""){
                layer.msg('请填写信息');
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