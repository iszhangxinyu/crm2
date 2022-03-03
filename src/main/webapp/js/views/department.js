$(function () {
    var department_datagrid = $("#department_datagrid"), // 数据表格
        department_dialog = $("#department_dialog"), // 编辑窗
        department_dialog_form = $("#department_dialog_form"), // 数据编辑表单
        department_searchForm = $("#department_searchForm"),  // 查询表单
        manager_combogrid = $("#manager_combogrid"), // 部门经理栏
        dept_combotree = $("#dept_combotree"), // 部门栏
        department_datagrid_bt = $("#department_datagrid_bt a"); // 数据表格上方的功能按钮
    // 部门数据表格
    department_datagrid.datagrid({
        url: "/department_list",
        fit: true,
        fitColumns: true,
        singleSelect: true,
        toolbar: "#department_datagrid_bt",
        onClickRow: function(rowIndex, rowData) {
            // 将离职的员工的按钮设置为不可选择，需要引入base.js,覆盖easyui.js的包
            if(rowData.state) {
                department_datagrid_bt.eq(1).linkbutton("enable");
                department_datagrid_bt.eq(2).linkbutton("enable");
            } else {
                department_datagrid_bt.eq(1).linkbutton("disable");
                department_datagrid_bt.eq(2).linkbutton("disable");
            }
        },
        columns: [[
            {field: 'sn', title: '部门编号', width: 1, align: 'center'},
            {field: 'name', title: '部门名称', width: 1, align: 'center'},
            {field: 'manager', title: '部门经理', width: 1, align: 'center', formatter:managerFormatter},
            {field: 'parent', title: '上级部门', width: 1, align: 'center', formatter:parentFormatter},
            {field: 'state', title: '部门状态', width: 1, align: 'center', formatter: stateFormatter}
        ]],
        pagination: true,
        rownumbers: true,
        pageSize: 10,
        pageList: [1, 5, 10, 15]
    });

    // 打开的对话窗口
    department_dialog.dialog({
        closed: true,
        width: 300,
        height: 300,
        buttons: "#department_datagrid_bb"
    });

    // 加载部门经理列表
    manager_combogrid.combogrid({
        url:"/manager_list",
        fitColumns: true,
        width:180,
        idField:"id", // 绑定到该select的id
        textField:"username", // 显示在select中的字段
        columns:[[
            {field: "username", title: "用户名", width: 80},
            {field: "realname", title: "真实姓名", width: 80},
            {field: "dept", title: "部门", width: 80, formatter: parentFormatter},
        ]]
    });

    // 加载部门树
    dept_combotree.combotree({
        url:'/department_tree',
        method:'get',
        required:true
    });

    // 监听所有的功能方法
    $("a").on("click", function () {
        var fun = $(this).data("cmd");
        if (fun) {
            operator[fun]();
        }
    })

    var operator = {
        // 新增
        add: function () {
            department_dialog.dialog("open");
            department_dialog.dialog("setTitle", "新增");
                department_dialog_form.form("clear");
        },
        // 编辑
        edit: function () {
            let rowData = department_datagrid.datagrid("getSelected");
            if (rowData) {
                department_dialog.dialog("setTitle", "编辑");
                department_dialog.dialog("open");
                department_dialog_form.form("clear");
                // 回显选中行数据
                if(rowData.manager) {
                    rowData['manager.id'] = rowData.manager.id;
                }
                if(rowData.parent) {
                    rowData["parent.id"] = rowData.parent.id;
                }
                department_dialog_form.form("load", rowData);
            } else {
                $.messager.alert("温馨提示", "请选择要修改的部门", "warning");
            }
        },
        delete: function () {
            let rowData = department_datagrid.datagrid("getSelected");
            if (rowData && rowData.state) {
                $.messager.confirm("确定对话框", "确认要停用该部门吗?", function (y) {
                    if (y) {
                        var id = rowData.id;
                        $.get("/department_delete", {id: rowData.id}, function (data) {
                            if (data.success) {
                                $.messager.alert("温馨提示", data.message, "info");
                                department_datagrid.datagrid("reload");
                            } else {
                                $.messager.alert("温馨提示", data.message, "warning");
                            }
                        })
                    }
                })
            } else {
                $.messager.alert("温馨提示", "请选择要停用的部门", "warning");
            }
        },
        refresh: function () {
            department_datagrid.datagrid("reload");
        },
        save: function () {
            let url;
            let id = $("input[name='id']").val();
            if (id) {
                // 修改
                url = "/department_edit";
            } else {
                // 添加
                url = "/department_add";
            }
            department_dialog_form.form('submit', {
                url: url,
                onSubmit: function (param) {
                    // 表单验证
                    var isValid = $(this).form('validate');
                    if (!isValid) {
                        $.messager.progress('close');	// 如果表单是无效的则隐藏进度条
                        return isValid;	// 返回false终止表单提交
                    }
                },
                success: function (data) {
                    console.log(data);
                    data = $.parseJSON(data);
                    if (data.success) {
                        $.messager.alert("温馨提示", data.message, "info");
                        department_dialog.dialog("close");
                        department_datagrid.datagrid("reload");
                    } else {
                        $.messager.alert("温馨提示", data.message, "warning");
                    }
                }
            })
        },
        cancel: function () {
            department_dialog.dialog("close");
        },
        search: function () {
            let array = department_searchForm.serializeArray();
            let param = {};
            $.each(array, function (i, field) {
                param[field.name] = field.value;
            })
            department_datagrid.datagrid("load", param);
        }
    }
});

function parentFormatter(value, row, index) {
    return value ? value.name : value;
}

function stateFormatter(value, row, index) {
    return value ? "<font color='green'>正常</font>" : "<font color='red'>停用</font>";
}

function managerFormatter(value, row, index) {
    console.log(value);
    return value ? value.username : "";
}