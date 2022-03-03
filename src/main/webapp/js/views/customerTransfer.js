$(function () {
    var customerTransferDialog, customerTransferDatagrid, customerTransferDialogForm, customerTransferDatagridBtn, transferCcustomerCombogrid, transferInchargeCombogrid;
    customerTransferDialog = $("#customerTransfer_dialog");
    customerTransferDatagrid = $("#customerTransfer_datagrid");
    customerTransferDialogForm = $("#customerTransfer_dialog_form");
    customerTransferDatagridBtn = $("#customerTransfer_datagrid_btn a");
    customerTransferOrturnDialog = $("#customerTransfer_shareOrturn_dialog");
    customerTransferOrturnDialogBtn = $("#customerTransfer_shareOrturn_dialog_bb")
    customerTransferOrturnDialogForm = $("#customerTransfer_shareOrturn_dialog_form");
    transferCustomerCombogrid = $("#transfer_customer_combogrid");
    transferInchargeCombogrid = $("#transfer_incharge_combogrid");

    // 显示客户名称的名称
    function customerFormatter(value, record, index) {
        if (value) {
            return value.name;

        } else {
            return null;
        }
    }

    // 显示原市场专员名称
    function oldsellerFormatter(value, record, index) {
        if (value) {
            return value.username;

        } else {
            return value;
        }
    }

    // 显示新市场专员名称
    function newsellerFormatter(value, record, index) {
        if (value) {
            return value.username;

        } else {
            return value;
        }
    }

    // 显示操作人名称的名称
    function transuserFormatter(value, record, index) {
        if (value) {
            return value.username;

        } else {
            return null;
        }
    }

    customerTransferDatagrid.datagrid({
        url: "/customerTransfer_list",
        fit: true,
        fitColumns: true,
        singleSelect: true,
        pagination: true,
        pageList: [1, 5, 10, 20],
        toolbar: "#customerTransfer_datagrid_btn",
        columns: [[
            {field: "customer", title: "客户名称", width: 1, align: "center", formatter: customerFormatter},
            {field: "transtime", title: "移交时间", width: 1, align: "center"},
            {field: "oldseller", title: "原市场专员", width: 1, align: "center", formatter: oldsellerFormatter},
            {field: "newseller", title: "新市场专员", width: 1, align: "center", formatter: newsellerFormatter},
            {field: "transreason", title: "移交原因", width: 1, align: "center"},
            {field: "transuser", title: "操作人员", width: 1, align: "center", formatter: transuserFormatter},

        ]],

    });

    customerTransferDialog.dialog({
        width: 300,
        height: 300,
        buttons: "#customerTransfer_dialog_bb",
        closed: true

    });

    customerTransferOrturnDialog.dialog({
        width: 400,
        height: 250,
        resizable: true,
        buttons: "#customerTransfer_shareOrturn_dialog_bb",
        closed: true
    });


    transferCustomerCombogrid.combogrid({
        panelWidth: 400,
        idField: 'id',
        textField: 'name',
        url: '/customer_list',
        method: 'get',
        columns: [[
            {field: "name", title: "客户名称", width: 80},
            {field: "age", title: "年龄", width: 80},
            {field: "gender", title: "性别", width: 80},
            {field: "tel", title: "电话", width: 80},
            {field: "job", title: "职业", width: 120},
            {field: "salarylevel", title: "收入水平", width: 80},
        ]]
    })

    transferInchargeCombogrid.combogrid({
        panelWidth: 400,
        idField: 'id',
        textField: 'username',
        url: '/incharge_list',
        method: 'get',
        columns: [[
            {field: "username", title: "用户名", width: 80},
            {field: "realname", title: "真实姓名", width: 80},
            {field: "email", title: "邮箱", width: 120},
            {field: "tel", title: "电话", width: 80}
        ]]
    })


    // 获取按钮的点击事件
    $("a").on("click", function () {

        var cmd = $(this).data("cmd");
        console.log(cmd);
        console.log(cmdObj[cmd])
        if (cmd) {
            cmdObj[cmd]();
        }
    });


    var cmdObj = {
            save: function () {
                // 表单的提交操作
                customerTransferOrturnDialogForm.form("submit", {
                    url: "/customerTransfer_save",
                    success: function (data) {
                        data = $.parseJSON(data)
                        if (data.success) {
                            $.messager.alert("温馨提示", data.message, "info");
                            customerTransferOrturnDialog.dialog("close");
                            customerTransferDatagrid.datagrid("reload");
                        } else {
                            $.messager.alert("温馨提示", data.message, "warning");
                        }
                    }
                });

            },
            turnOver: function () {
                // 打开新增对话框
                customerTransferOrturnDialog.dialog("open");
                // 设置标题为新增
                customerTransferOrturnDialog.dialog("setTitle", "新增");
                // 清除表单的缓存数据
                customerTransferOrturnDialogForm.form("clear");


            },

            cancel: function () {
                customerTransferOrturnDialog.dialog("close");
            },
            refresh: function () {
                customerTransferDatagrid.datagrid("reload");
            }

        }
        ;

});




