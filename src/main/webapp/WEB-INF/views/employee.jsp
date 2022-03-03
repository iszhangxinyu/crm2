<%--
  Created by IntelliJ IDEA.
  User: z-xy
  Date: 2021/12/19
  Time: 15:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--自定义标签--%>
<%@ taglib prefix="myfn" uri="http://www.crm.cn/java/crm" %>
<html>
<head>
    <title>员工列表</title>
    <%@include file="common.jsp" %>
    <script type="text/javascript" src="/js/views/employee.js"></script>
</head>
<body>
<%--数据表格--%>
<table id="employee_datagrid"></table>
<div id="employee_datagrid_bt">
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.EmployeeController:save')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:'true'" data-cmd="add">新增</a>
    </c:if>
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.EmployeeController:update')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:'true'" data-cmd="edit">编辑</a>
    </c:if>
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.EmployeeController:delete')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:'true'" data-cmd="delete">离职</a>
    </c:if>
    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:'true'" data-cmd="refresh">刷新</a>
    <br/>
    <div>
        <form id="employee_searchForm" method="post">
            关键字：<input type="text" name="keyword" placeholder="输入账户名或真实姓名"/>
            开始日期：<input name="beginDate" type="text" class="easyui-datebox">
            结束日期：<input name="endDate" type="text" class="easyui-datebox">
            状态：<select name="state">
            <option value="">全部</option>
            <option value="1">正常</option>
            <option value="0">离职</option>
        </select>
            <a href="#" class="easyui-linkbutton" data-cmd="search" data-options="iconCls:'icon-search', plain:true">搜索
            </a></form>
    </div>
</div>
<div id="employee_dialog" class="easyui-dialog">
    <form id="employee_dialog_form" method="post">
        <table align="center" style="margin-top:30px">
            <input type="hidden" name="id"/>
            <tr>
                <td><label for="username">账号</label></td>
                <td><input id="username" class="easyui-validatebox" type="text" name="username"
                           data-options="required:true"/>
                </td>
            </tr>
            <tr>
                <td><label for="realname">真实姓名</label></td>
                <td><input id="realname" class="easyui-validatebox" type="text" name="realname"
                           data-options="required:true"/>
                </td>
            </tr>
            <tr>
                <td><label for="tel">电话</label></td>
                <td><input id="tel" class="easyui-validatebox" type="text" name="tel"
                           data-options="required:true"/>
                </td>
            </tr>
            <tr>
                <td><label for="email">邮箱</label></td>
                <td><input id="email" class="easyui-validatebox" type="text" name="email"
                           data-options="required:true"/>
                </td>
            </tr>
            <tr>
                <td><label for="dept">部门</label></td>
                <td><input id="dept" class="easyui-combobox easyui-validatebox" type="text" name="dept.id"
                           data-options="url:'/dept_queryDeptForEmp',valueField:'id',textField:'name'"/>
                </td>
            </tr>
            <tr>
                <td><label for="role">角色</label></td>
                <td><input id="role" class="easyui-combobox" type="text"
                           data-options="multiple:true, url:'/role_queryRoleForEmp',valueField:'id', textField:'name'"/></td>
            </tr>
        </table>
    </form>
</div>
<div id="employee_datagrid_bb">
    <a href="#" class="easyui-linkbutton" data-cmd="save" data-options="iconCls:'icon-save'">保存</a>
    <a href="#" class="easyui-linkbutton" data-cmd="cancel" data-options="iconCls:'icon-cancel'">取消</a>
</div>
</body>
</html>
