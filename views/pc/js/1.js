/**
 * Created by 39253 on 2017/12/5.
 */
    let str = ``;
    $.ajax({
        url: '/info',
        type: 'get',
        success: function(data) {
            $.each(data,function(i,e){
                str+=`<li>
                    <span>姓名:${e.user}</span>
                    <span>年龄:${e.age}</span>
                    <span>性别:${e.sex}</span>
                    <span>密码:${e.password}</span>
                </li>`
            });
            $('.listIfo').append(str);
        }
    });
$('.addBtn').on('click',function (){
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
          console.log(1)
        }
    });
})