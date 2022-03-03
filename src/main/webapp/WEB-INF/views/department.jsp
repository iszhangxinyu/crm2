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
    <script type="text/javascript" src="/js/views/department.js"></script>
</head>
<body>
<%--数据表格--%>
<table id="department_datagrid"></table>
<div id="department_datagrid_bt">
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.departmentController:save')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:'true'" data-cmd="add">新增</a>
    </c:if>
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.departmentController:update')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain:'true'" data-cmd="edit">编辑</a>
    </c:if>
    <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.departmentController:delete')}">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:'true'" data-cmd="delete">停用
        </a>
    </c:if>
    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:'true'" data-cmd="refresh">刷新</a>
    <br/>
    <div>
        <form id="department_searchForm" method="post">
            关键字：<input type="text" name="keyword" placeholder="输入部门名称或编号"/>
            状态：<select name="state">
            <option value="">全部</option>
            <option value="1">正常</option>
            <option value="0">停用</option>
        </select>
            <a href="#" class="easyui-linkbutton" data-cmd="search" data-options="iconCls:'icon-search', plain:true">搜索
            </a></form>
    </div>
</div>
<%--操作窗口--%>
<div id="department_dialog" class="easyui-dialog">
    <form id="department_dialog_form" method="post">
        <table align="center" style="margin-top:30px">
            <%-- 编辑的行才有id--%>
            <input type="hidden" name="id"/>
            <input type="hidden" name="state"/>
            <tr>
                <td><label for="dept_sn">部门编号</label></td>
                <td><input id="dept_sn" class="easyui-validatebox" type="text" name="sn"
                           data-options="required:true"/>
                </td>
            </tr>
            <tr>
                <td><label for="dept_name">部门名称</label></td>
                <td><input id="dept_name" class="easyui-validatebox" type="text" name="name"
                           data-options="required:true"/>
                </td>
            </tr>
            <tr>
                <td><label for="manager_combogrid">部门经理</label></td>
                <td>
                    <select style="width:250px" id="manager_combogrid" name="manager.id"></select>
                </td>
            </tr>
            <tr>
                <td><label for="dept_combotree">上级部门</label></td>
                <td>
                    <select id="dept_combotree" name="parent.id" style="width: 180px" ></select>
                </td>
            </tr>
        </table>
    </form>
</div>
<div id="department_datagrid_bb">
    <a href="#" class="easyui-linkbutton" data-cmd="save" data-options="iconCls:'icon-save'">保存</a>
    <a href="#" class="easyui-linkbutton" data-cmd="cancel" data-options="iconCls:'icon-cancel'">取消</a>
</div>
</body>
</html>
