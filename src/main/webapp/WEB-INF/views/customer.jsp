<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/9/14
  Time: 8:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="myfn" uri="http://www.crm.cn/java/crm" %>
<html>
<head>
    <title>正式客户管理 </title>
    <%@ include file="common.jsp" %>
    <script type="text/javascript" src="/js/views/customer.js"></script>
</head>
<body>
<table id="customer_datagrid"></table>
<div id="customer_datagrid_btn">
    <div>
        <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.CustomerController:save')}">
            <a class="easyui-linkbutton" iconCls="icon-add" plain="true" data-cmd="add">新增</a>
        </c:if>
        <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.CustomerController:update')}">

            <a class="easyui-linkbutton" iconCls="icon-edit" plain="true" data-cmd="edit">编辑</a>
        </c:if>
        <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.CustomerController:moveToResourcePool')}">
            <a class="easyui-linkbutton" iconCls="icon-remove" plain="true" data-cmd="moveToResource">移入资源池</a>
        </c:if>
        <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.CustomerController:updateInCharge')}">
            <a class="easyui-linkbutton" iconCls="icon-tip" plain="true" data-cmd="share">共享</a>
        </c:if>
        <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.CustomerController:ALL')}">
            <a class="easyui-linkbutton" iconCls="icon-tip" plain="true" data-cmd="turnOver">移交</a>
        </c:if>
        <c:if test="${myfn:checkPermission('cn.xy.crm.web.controller.CustomerController:customerLost')}">
            <a class="easyui-linkbutton" iconCls="icon-no" plain="true" data-cmd="lost">流失</a>
        </c:if>
        <a class="easyui-linkbutton" iconCls="icon-reload" plain="true" data-cmd="refresh">刷新</a>
        <a class="easyui-linkbutton" iconCls="icon-reload" plain="true" data-cmd="export">导出用户表</a>
    </div>
    <div>
        <form id="customer_searchForm">
            关键字：<input type="text" name="keyword" placeholder="姓名和手机号">
            状态：
            <select name="status">
                <option value="">全部</option>
                <option value="-2">流失</option>
                <option value="1">正式客户</option>
            </select>
            <a class="easyui-linkbutton" plain="true" iconCls="icon-search" data-cmd="searchContent">查询</a>
        </form>
    </div>
</div>
<div id="customer_dialog">
    <form id="customer_dialog_form" method="post">
        <input type="hidden" name="id"/>
        <table align="center">
            <tr>
                <td>用户名</td>
                <td><input class="easyui-validatebox" data-options="required:true,validType:'length[3,10]'"
                           name="name"/></td>
                <td>年龄</td>
                <td><input class="easyui-numberbox" required name="age"/></td>
            </tr>
            <tr>
                <td>性别</td>
                <td><select name="gender">
                    <option value="1">男</option>
                    <option value="0">女</option>
                </select></td>
                <td>电话</td>
                <td><input name="tel"/></td>

            </tr>
            <tr>
                <td>邮箱</td>
                <td><input name="email"/></td>
                <td>QQ</td>
                <td><input name="qq"/></td>
            </tr>
            <tr>
                <td>微信</td>
                <td><input name="wechat"/></td>
                <td>职业</td>
                <td><input class="easyui-combobox" name="job"
                           data-options="url: '/customer_query?sn=job',valueField:'name',textField:'name'"/>
                </td>
            </tr>
            <tr>
                <td>收入水平</td>
                <td><input class="easyui-combobox" name="salarylevel"
                           data-options="url:'/customer_query?sn=salaryLevel', valueField:'name',textField:'name'"/>
                </td>
                <td>客户来源</td>
                <td><input class="easyui-combobox" name="customersource"
                           data-options=" url:'/customer_query?sn=customerSource', valueField:'name',textField:'name'">
                </td>
            </tr>
        </table>
    </form>
    <div id="customer_dialog_bb">
        <a class="easyui-linkbutton" iconCls="icon-save" plain="true" data-cmd="save">保存</a>
        <a class="easyui-linkbutton" iconCls="icon-cancel" plain="true" data-cmd="cancel">取消</a>
    </div>
</div>

<!--共享和移交对话框-->
<div id="customer_shareOrturn_dialog">
    <form id="customer_shareOrturn_dialog_form" method="post">
        <input type="hidden" name="id"/>
        <input type="hidden" name="inchargeuser.id"/>
        <table align="center">
            <tr>
                <td>当前客户</td>
                <td><input name="name" disabled/></td>
            </tr>
            <tr>
                <td>当前客户负责人</td>
                <td><input name="inchargeuser.name" disabled/></td>
            </tr>
            <tr>
                <td>移交给</td>
                <td><input class="easyui-combobox" name="inchargeId"
                           data-options="url:'/selectByPotential',valueField:'id',textField:'username'"></td>
            </tr>
            <tr>
                <td>移交原因</td>
                <td><textarea name="reason">

                </textarea></td>
            </tr>
        </table>
    </form>
    <div id="customer_shareOrturn_dialog_bb">
        <a class="easyui-linkbutton" iconCls="icon-save" plain="true" data-cmd="shareSave">保存</a>
        <a class="easyui-linkbutton" iconCls="icon-cancel" plain="true" data-cmd="shareCancel">取消</a>
    </div>

</div>

</body>
</html>
