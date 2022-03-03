<%--
  Created by IntelliJ IDEA.
  User: z-xy
  Date: 2021/12/19
  Time: 13:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>CRM</title>
    <%@include file="/WEB-INF/views/common.jsp" %>
    <script type="text/javascript" src="/js/views/index.js"></script>
</head>
<body>
<div id="cc" class="easyui-layout" fit="true" style="width:600px;height:400px;">
    <div data-options="region:'north'"
         style="height:100px;background:url('../../img/banner-pic.gif') no-repeat;background-size:cover; ">
        <h1>CRM</h1>
        <p>当前用户：<font color="red">${current.realname} </font> <a href="/logout">登出</a></p>
    </div>
    <div data-options="region:'west'" style="width:165px;">
        <!-- 折叠面板+菜单 -->
        <div class="easyui-accordion" fit="true">
            <div title="菜单">
                <!-- 使用树组件来定义菜单 -->
                <ul id="menuTree"></ul>
            </div>
            <div title="帮助"></div>
            <div title="简介"></div>
        </div>
    </div>
    <div data-options="region:'center'" style="padding:5px;background:#eee;">
        <!-- 正文内容 -->
        <div id="myTabs" class="easyui-tabs" fit="true">
            <div title="欢迎页" closable="true">
                <center><h1>欢迎登陆系统</h1></center>
            </div>
        </div>
    </div>
    <div data-options="region:'south'"
         style="height:30px;background:url('../../img/banner-pic.gif') no-repeat;background-size:cover; ">
    </div>
</div>

</body>
</html>
