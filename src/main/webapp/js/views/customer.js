$(function () {
    var customerDialog, customerDatagrid, customerDialogForm, customerDatagridBtn,customerShareOrturnDialog
        ,customerShareOrturnDialogBtn, customerShareOrturnDialogForm;
    customerDialog = $("#customer_dialog");
    customerDatagrid = $("#customer_datagrid");
    customerDialogForm = $("#customer_dialog_form");
    customerDatagridBtn = $("#customer_datagrid_btn a");
    customerShareOrturnDialog = $("#customer_shareOrturn_dialog");
    customerShareOrturnDialogBtn = $("#customer_shareOrturn_dialog_bb")
    customerShareOrturnDialogForm = $("#customer_shareOrturn_dialog_form");


    customerDatagrid.datagrid({
        url: "customer_list",
        fit: true,
        rownumbers: true,
        fitColumns: true,
        singleSelect: true,
        pagination: true,
        pageList: [1, 5, 10, 20],
        toolbar: "#customer_datagrid_btn",
        onClickRow: function (rowIndex, rowData) {
        },
        columns: [[
            {field: "name", title: "姓名", width: 1, align: "center"},
            {field: "age", title: "年龄", width: 1, align: "center"},
            {field: "gender", title: "性别", width: 1, align: "center", formatter: genderFormatter},
            {field: "tel", title: "联系电话", width: 1, align: "center"},
            {field: "email", title: "邮箱", width: 1, align: "center"},
            {field: "qq", title: "QQ", width: 1, align: "center"},
            {field: "wechat", title: "微信", width: 1, align: "center"},
            {field: "job", title: "工资", width: 1, align: "center"},
            {field: "salarylevel", title: "收入水平", width: 1, align: "center"},
            {field: "customersource", title: "客户来源", width: 1, align: "center"},
            {field: "inputtime", title: "创建时间", width: 1, align: "center"},
            {field: "inputuser", title: "创建人", width: 1, align: "center", formatter: inputuserFormatter},
            {field: "inchargeuser", title: "负责人", width: 1, align: "center", formatter: inchargeuserFormatter}
        ]],

    });

    function genderFormatter(value, row, index) {
        if (value == '1') {
            return "男";
        } else if (value == '0') {
            return "女";
        }

    }

    function inputuserFormatter(value, row, index) {

        if (value) {
            return value.username;
        } else {
            return null;
        }

    }

    function inchargeuserFormatter(value, row, index) {
        if (value) {
            return value.username;
        } else {
            return null;
        }
    }


    customerDialog.dialog({
        width: 600,
        height: 300,
        resizable: true,
        buttons: "#customer_dialog_bb",
        closed: true

    });


    customerShareOrturnDialog.dialog({
        width: 400,
        height: 250,
        resizable: true,
        buttons: "#customer_shareOrturn_dialog_bb",
        closed: true
    });

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

        add: function add() {
            // 打开新增对话框
            customerDialog.dialog("open");
            // 设置标题为新增
            customerDialog.dialog("setTitle", "新增");
            // 清除表单的缓存数据
            $("#customer_dialog_form").form("clear");


        },
        edit: function () {
            // 返回选中的行对象
            var rowData = customerDatagrid.datagrid("getSelected");
            if (rowData) {
                // 打开编辑对话框
                customerDialog.dialog("open");
                // 打开编辑对话框
                customerDialog.dialog("setTitle", "编辑");
                // 清除表单的缓存数据
                customerDialogForm.form("clear");


                // 回显表单的数据
                customerDialogForm.form("load", rowData);

            } else {
                $.messager.alert("温馨提示", "请选中要编辑数据", "info");
            }
        },

        del: function () {
            // 返回选中的行对象
            var row = customerDatagrid.datagrid("getSelected");
            if (row) {
                $.messager.confirm("温馨提示", "你确定要删除这个员工的数据吗", function (yes) {
                    if (yes) {
                        // 发送请求去后台删除数据
                        $.get("/customer_delete?id=" + row.id, function (data) {
                            if (data.success) {
                                // 删除成功后,重新加载数据
                                customerDatagrid.datagrid("reload");
                            } else {
                                $.messager.alert("温馨提示", data.message, "warning");
                            }
                        });
                    }
                });

            } else {
                $.messager.alert("温馨提示", "请选中要删除的行!", "warning");
            }
        },
        /**
         * 刷新列表
         */
        refresh: function () {
            customerDatagrid.datagrid("reload");
        },
        /**
         * 高级查询:根据关键字,录入时间,员工状态查询
         */
        searchContent: function () {
            // 创建一个json空对象:存取要查询的条件
            var param = {};
            // 获取表单中所有的数据的数组 [Object { name="keyword",  value=""}, Object {                         name="beginDate",  value=""}, Object { name="endDate",  value=""}]
            var paramArr = $("#customer_searchForm").serializeArray();

            // 设置格式为 Object { keyword="",  beginDate="",  endDate=""}的json对象
            for (var i = 0; i < paramArr.length; i++) {
                param[paramArr[i].name] = paramArr[i].value;
            }
            // 根据查询的条件去重新查询后台,加载到前台中
            customerDatagrid.datagrid("load", param);

        },
        /**保存/更新操作:
         * id:null 保存
         * id:不为null 更新
         * */
        save: function () {
            var url = null;
            // 根据id,设置发送的是保存还是更新请求的地址
            var id = $("input[name=id]").val();
            console.log("id" + id);
            if (id) {
                url = "/customer_update"
            } else {
                url = "/customer_save"
            }

            // 表单的提交操作
            customerDialogForm.form("submit", {
                url: url,
                onSubmit: function () {
                    if (!customerDialogForm.form("validate")) {
                        return false;
                    }
                },
                // 传递选中角色的Id到后台中
                success: function (data) {
                    data = $.parseJSON(data)
                    if (data.success) {
                        $.messager.alert("温馨提示", data.message, "info");
                        customerDialog.dialog("close");
                        customerDatagrid.datagrid("reload");
                    } else {
                        $.messager.alert("温馨提示", data.message, "warning");
                    }
                }
            });

        },
        cancel: function () {
            customerDialog.dialog("close");
        },
        /*共享*/
        share: function () {
            // 返回选中的行对象
            var rowData = customerDatagrid.datagrid("getSelected");
            if (rowData) {
                // 打开编辑对话框
                customerShareOrturnDialog.dialog("setTitle", "共享");
                customerShareOrturnDialog.dialog("open");

                // 打开编辑对话框
                // 清除表单的缓存数据
                customerShareOrturnDialog.form("clear");
                // 回显负责人的名称
                if (rowData.inchargeuser) {
                    rowData['inchargeuser.name'] = rowData.inchargeuser.username;
                }
                // 回显负责人的Id,目的是为了控制自己共享给自己
                if (rowData.inchargeuser) {
                    rowData['inchargeuser.id'] = rowData.inchargeuser.id;
                }

                // 回显表单的数据
                customerShareOrturnDialogForm.form("load", rowData);

            } else {
                $.messager.alert("温馨提示", "请选中要共享的客户", "info");
            }


        },
        /*移交*/
        turnOver: function () {
            // 返回选中的行对象
            var rowData = customerDatagrid.datagrid("getSelected");
            console.log(rowData);
            if (rowData) {
                // 打开编辑对话框
                customerShareOrturnDialog.dialog("open");
                // 打开编辑对话框
                customerShareOrturnDialog.dialog("setTitle", "移交");
                // 清除表单的缓存数据
                customerShareOrturnDialog.form("clear");
                // 回显负责人的名称
                if (rowData.inchargeuser) {
                    rowData['inchargeuser.name'] = rowData.inchargeuser.username;
                }
                // 回显负责人的Id,目的是为了控制自己移交给自己
                if (rowData.inchargeuser) {
                    rowData['inchargeuser.id'] = rowData.inchargeuser.id;
                }

                // 回显表单的数据
                customerShareOrturnDialogForm.form("load", rowData);

            } else {
                $.messager.alert("温馨提示", "请选中要移交的客户", "info");
            }
        },

        shareSave: function () {

            customerShareOrturnDialogForm.form("submit", {
                url: "/customer_updateInCharge",
                // 传递选中角色的Id到后台中
                success: function (data) {
                    data = $.parseJSON(data)
                    if (data.success) {
                        $.messager.alert("温馨提示", data.message, "info");
                        customerShareOrturnDialog.dialog("close");
                        customerDatagrid.datagrid("reload");
                    } else {
                        $.messager.alert("温馨提示", data.message, "warning");
                        customerShareOrturnDialog.dialog("close");
                    }
                }
            });

        },
        shareCancel: function () {
            customerShareOrturnDialog.dialog("close");
        },

        moveToResource: function () {
            // 返回选中的行对象
            var rowData = customerDatagrid.datagrid("getSelected");
            if (rowData) {
                $.messager.confirm("温馨提示", "您确认要把客户移入资源池吗?", function (yes) {
                    if(yes) {
                        $.get("/customer_moveResourcepool?id=" + rowData.id, function (data) {
                            if (data.success) {
                                $.messager.alert("温馨提示", data.message, "info");
                                customerDatagrid.datagrid("reload");
                            } else {
                                $.messager.alert("温馨提示", data.message, "info");
                            }
                        });
                    }
                })
            } else {
                $.messager.alert("温馨提示", "请选中要移入资源池的客户", "info");
            }

        },
        lost: function () {
            // 返回选中的行对象
            var rowData = customerDatagrid.datagrid("getSelected");
            if (rowData) {
                $.messager.confirm("温馨提示", "您确认要把这个用户流失吗?", function (yes) {
                    $.get("/customer_lost?id=" + rowData.id, function (data) {
                        if (data.success) {
                            $.messager.alert("温馨提示", data.message, "info");
                            customerDatagrid.datagrid("reload");
                        } else {
                            $.messager.alert("温馨提示", data.message, "info");
                        }
                    });
                })
            } else {
                $.messager.alert("温馨提示", "请选中你要流失的客户", "info");
            }
        },

        export: function () {
            $.messager.confirm("温馨提示", "您确认要导出用户表吗?", function (yes) {
                window.location.href = "/customer_export";
            })
        }
    }

})





