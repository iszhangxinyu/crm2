$(function () {
    var employee_datagrid = $("#employee_datagrid"),
        employee_dialog = $("#employee_dialog"),
        employee_dialog_form = $("#employee_dialog_form"),
        employee_searchForm = $("#employee_searchForm"),
        employee_datagrid_bt = $("#employee_datagrid_bt a");

    employee_datagrid.datagrid({
        url: "/employee_list",
        fit: true,
        fitColumns: true,
        singleSelect: true,
        toolbar: "#employee_datagrid_bt",
        onClickRow: function(rowIndex, rowData) {
                // 将离职的员工的按钮设置为不可选择，需要引入base.js,覆盖easyui.js的包
                if(rowData.state) {
                    employee_datagrid_bt.eq(1).linkbutton("enable");
                    employee_datagrid_bt.eq(2).linkbutton("enable");
                } else {
                    employee_datagrid_bt.eq(1).linkbutton("disable");
                    employee_datagrid_bt.eq(2).linkbutton("disable");
                }
        },
        columns: [[
            {field: 'username', title: '员工账号', width: 1, align: 'center'},
            {field: 'realname', title: '真实姓名', width: 1, align: 'center'},
            {field: 'tel', title: '电话', width: 1, align: 'center'},
            {field: 'email', title: '邮箱', width: 1, align: 'center'},
            {field: 'dept', title: '部门', width: 1, align: 'center', formatter: deptFormatter},
            {field: 'inputtime', title: '入职时间', width: 1, align: 'center'},
            {field: 'state', title: '员工去留', width: 1, align: 'center', formatter: stateFormatter},
            {field: 'admin', title: '超级管理员', width: 1, align: 'center', formatter: adminFormatter}
        ]],
        pagination: true,
        rownumbers: true,
        pageSize: 10,
        pageList: [1, 5, 10, 15]
    });

    employee_dialog.dialog({
        closed: true,
        width: 280,
        height: 300,
        buttons: "#employee_datagrid_bb"
    });

    // 监听调用方法
    $("a").on("click", function () {
        var fun = $(this).data("cmd");
        if (fun) {
            operator[fun]();
        }
    })

    var operator = {
        add: function () {
            employee_dialog.dialog("open");
            employee_dialog.dialog("setTitle", "新增"),
                employee_dialog_form.form("clear");
        },
        edit: function () {
            let rowData = employee_datagrid.datagrid("getSelected");
            let roles = $("#role").combobox("getValues");
            if (rowData) {
                employee_dialog.dialog("setTitle", "编辑");
                employee_dialog.dialog("open");
                employee_dialog_form.form("clear");
                if (rowData.dept) {
                    // load回显数据基于name相同规则，rowData中没有部门的name属性，加上
                    rowData["dept.id"] = rowData.dept.id;
                }
                // 同步加载数据,异步的问题在于页面会渲染数据，此时结果还未返回，null
                var html = $.ajax({
                    url: "employee_queryRoleIdsByEmpId",
                    data:"id=" + rowData.id,
                    async: false
                }).responseText;
                // 回显员工角色信息
                if(rowData.roleList) {
                    $("#role").combobox("setValues", $.parseJSON(html));
                }
                employee_dialog_form.form("load", rowData);

            } else {
                $.messager.alert("温馨提示", "请选择一条需要修改的数据", "warning");
            }
        },
        delete: function () {
            let rowData = employee_datagrid.datagrid("getSelected");
            if (rowData && rowData.state) {
                $.messager.confirm("确定对话框", "确定要离职该员工吗?", function (y) {
                    if (y) {
                        var id = rowData.id;
                        $.get("/employee_delete", {id: rowData.id}, function (data) {
                            if (data.success) {
                                $.messager.alert("温馨提示", data.message, "info");
                                employee_datagrid.datagrid("reload");
                            } else {
                                $.messager.alert("温馨提示", data.message, "warning");
                            }
                        })
                    }
                })
            } else {
                $.messager.alert("温馨提示", "请选择尚未离职的员工", "warning");
            }
        },
        refresh: function () {
            employee_datagrid.datagrid("reload");
        },
        save: function () {
            let url = null;
            let id = $("input[name='id']").val();
            if (id) {
                // 修改
                url = "/employee_edit";
            } else {
                // 添加
                url = "/employee_save";
            }
            employee_dialog_form.form('submit', {
                url: url,
                onSubmit: function (param) {
                    // 表单验证
                    var isValid = $(this).form('validate');
                    if (!isValid) {
                        $.messager.progress('close');	// 如果表单是无效的则隐藏进度条
                        return isValid;	// 返回false终止表单提交
                    }
                    // 获取当前员工的所有角色id，作为参数传递给后台
                    var roles = $("#role").combobox("getValues");
                    for(var i  = 0 ; i < roles.length; i++) {
                        param["roleList[" + i + "].id"] = roles[i];
                    }
                    console.log(param);
                },
                success: function (data) {
                    console.log(data);
                    data = $.parseJSON(data);
                    if (data.success) {
                        $.messager.alert("温馨提示", data.message, "info");
                        employee_dialog.dialog("close");
                        employee_datagrid.form("reload");
                    } else {
                        $.messager.alert("温馨提示", data.message, "warning");
                    }
                }
            })
        },
        cancel: function () {
            employee_dialog.dialog("close");
        },
        search: function () {
            let array = employee_searchForm.serializeArray();
            let param = {};
            $.each(array, function (i, field) {
                param[field.name] = field.value;
            })
            employee_datagrid.datagrid("load", param);
        }
    }
});

function deptFormatter(value, row, index) {
    return value ? value.name : value;
}

function stateFormatter(value, row, index) {
    return value ? "<font color='green'>在职</font>" : "<font color='red'>离职</font>";
}

function adminFormatter(value, row, index) {
    return value ? "管理员" : "普通职员";
}