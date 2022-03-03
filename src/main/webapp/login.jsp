<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>CRM</title>
    <link rel="stylesheet" href="/css/style.css">
    <%@include file="WEB-INF/views/common.jsp" %>
    <script type="text/javascript">
        // 监控回车
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                submitForm();
            }
        }
        function submitForm() {
            $.ajax({
                type: "POST",
                url: "/login",
                data: $("form").serialize(),
                dataType: "json",
                success: function (data) {
                    if (data.success) {
                        window.location.href = "/index";
                    } else {
                        $.messager.alert("温馨提示", data.message, "warning");
                    }
                }
            });
        }

        function resetForm() {
            // $("form")[0].reset();
            $("form").form("clear");
        }
    </script>
</head>
<body>
<section class="container">
    <div class="login">
        <h1>用户登录</h1>
        <form method="post">
            <p>
                <input type="text" name="username" value="admin" placeholder="账号">
            </p>
            <p>
                <input type="password" name="password" value="admin" placeholder="密码">
            </p>
            <p class="submit">
                <input onclick="submitForm()" type="button" value="登录">
                <input onclick="resetForm()" type="button" value="重置">
            </p>
        </form>
    </div>
</section>
<div style="text-align: center;" class="login-help">
    <p>Copyright ©2015 xmg</p>
</div>
</body>
</html>