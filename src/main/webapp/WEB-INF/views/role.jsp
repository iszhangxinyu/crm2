<%--
  Created by IntelliJ IDEA.
  User: z-xy
  Date: 2021/12/19
  Time: 15:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="myfn" uri="http://www.crm.cn/java/crm" %>
<html>
<head>
    <title>角色列表</title>
    <%@include file="common.jsp" %>
    <script type="text/javascript" src="/js/views/role.js"></script>
</head>
<body>
<%--数据表格--%>
<table id="role_datagrid"></table>
<div id="role_datagrid_bt">
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.RoleController:save')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:'true'" data-cmd="add">新增</a>
    </c:if>
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.RoleController:edit')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:'true'" data-cmd="edit">编辑</a>
    </c:if>
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.RoleController:delete')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:'true'" data-cmd="delete">删除</a>
    </c:if>
    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:'true'" data-cmd="refresh">刷新</a>
    <br/>
    <div>
        <form id="role_searchForm" method="post">
            关键字：<input id="search_input" type="text" name="keyword" placeholder="输入角色编号或名称"/>
            <a id="a_search" href="#" class="easyui-linkbutton" data-cmd="search"
               data-options="iconCls:'icon-search', plain:true">搜索
            </a>
            <input type="text" style="display: none"/>
        </form>
    </div>
</div>
<div id="role_dialog" class="easyui-dialog">
    <form id="role_dialog_form" method="post">
        <input name="id" type="hidden"/>
        <table style="margin-top: 20px" align="center">
            <tr>
                <td>角色编号：<input type="text" name="sn"/></td>
                <td>角色名称：<input type="text" name="name"/></td>
            </tr>
            <tr>
                <td>
                    <table id="selfPermissions"></table>
                </td>
                <td>
                    <table id="allPermissions"></table>
                </td>
            </tr>
        </table>
    </form>
</div>
<div id="role_datagrid_bb">
    <a href="#" class="easyui-linkbutton" data-cmd="save" data-options="iconCls:'icon-save'">保存</a>
    <a href="#" class="easyui-linkbutton" data-cmd="cancel" data-options="iconCls:'icon-cancel'">取消</a>
</div>
</body>
</html>
