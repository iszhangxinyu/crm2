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
    <title>客户移交记录</title>
    <%@ include file="common.jsp" %>
    <script type="text/javascript" src="/js/views/customerTransfer.js"></script>
</head>
<body>
<table id="customerTransfer_datagrid"></table>
<div id="customerTransfer_datagrid_btn">
    <div>
        <a class="easyui-linkbutton" iconCls="icon-add" plain="true" data-cmd="turnOver">客户移交</a>
        <a class="easyui-linkbutton" iconCls="icon-reload" plain="true" data-cmd="refresh">刷新</a>
    </div>
</div>

<!--共享和移交对话框-->
<div id="customerTransfer_shareOrturn_dialog">
    <form id="customerTransfer_shareOrturn_dialog_form" method="post">
        <table align="center">
            <tr>
                <td>客户选择</td>
                <td><select name="customerId" id="transfer_customer_combogrid" style="width: 150px;"></select></td>
            </tr>
            <tr>
                <td>新市场专员</td>
                <td><select name="inchargeuserId" id="transfer_incharge_combogrid" style="width: 150px;"></select></td>
            </tr>
            <tr>
                <td>移交原因</td>
                <td><textarea name="reason">

                </textarea></td>
            </tr>
        </table>
    </form>
    <div id="customerTransfer_shareOrturn_dialog_bb">
        <a class="easyui-linkbutton" iconCls="icon-save" plain="true" data-cmd="save">保存</a>
        <a class="easyui-linkbutton" iconCls="icon-cancel" plain="true" data-cmd="cancel">取消</a>
    </div>

</div>

</body>
</html>
