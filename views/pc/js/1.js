/**
 * Created by 39253 on 2017/12/5.
 */
    let str = ``;
    //初始化用户信息
    $.ajax({
        url: '/info',
        type: 'get',
        success: function(data) {
            $.each(data,function(i,e){
                str +=`<li>
                    <span>${e.user}</span>
                    <input disabled type="text" value=${e.age}>
                    <input disabled type="text" value=${e.sex}>
                    <input disabled type="text" value=${e.password}>
                    <span class="del">删除</span>
                    <span class="modify">修改</span>
                </li>`
            });
            $('.listIfo').append(str);
            //删除用户信息
            $('.del').on('click',function(){
                let user = $(this).parent().children().eq(0).html();
                $.ajax({
                    url: '/del',
                    type: 'get',
                    data:{
                        user:user
                    },
                    success: function(data) {
                        alert(data);
                        window.location.search='@';
                    }
                });
            })
            //修改用户信息
            let modifyOn = true;
             $('.modify').on('click',function(){
                 console.log(modifyOn)
                 if(modifyOn){
                     $(this).prevAll("input").attr('disabled',false);
                     $(this).html('确定修改');
                     modifyOn = false;
                 }else{
                     $(this).prevAll("input").attr('disabled',true);
                     $(this).html('修改');
                     modifyOn = true;
                     let user = $(this).parent().children().eq(0).html();
                     let age = $(this).parent().children().eq(1).val();
                     let sex = $(this).parent().children().eq(2).val();
                     let password = $(this).parent().children().eq(3).val();
                     $.ajax({
                         url: '/update',
                         type: 'get',
                         data:{
                             user:user,
                             age:age,
                             sex:sex,
                             password:password
                         },
                         success: function(data) {
                             alert(data);
                             window.location.search='@';
                         }
                     });
                 }
             })
        }
    });
//添加用户信息
$('.addBtn').on('click',function (){
    if($('.user').val()&&$('.age').val()&&$('.sex').val()&&$('.password').val()){
        $.ajax({
            url: '/add',
            type: 'get',
            data:{
                user:$('.user').val(),
                age:$('.age').val(),
                sex:$('.sex').val(),
                password:$('.password').val()
            },
            success: function(data) {
                alert(data);
                window.location.search='@'
            }
        });
    }else{
        alert('请填写完整信息')
    }
});
