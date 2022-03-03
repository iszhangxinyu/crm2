$(function () {
    var role_datagrid, role_dialog, role_dialog_form, role_searchForm, role_datagrid_bt, selfPermissions,
        allPermissions;
    role_datagrid = $("#role_datagrid");
    role_dialog = $("#role_dialog");
    role_dialog_form = $("#role_dialog_form");
    role_searchForm = $("#role_searchForm");
    role_datagrid_bt = $("#role_datagrid_bt a");
    selfPermissions = $("#selfPermissions");
    allPermissions = $("#allPermissions");
    role_datagrid.datagrid({
        url:"/role_list",
        fit: true,
        fitColumns: true,
        singleSelect: true,
        toolbar: "#role_datagrid_bt",
        columns: [[
            {field: 'sn', title: '角色编号', width: 1, align: 'center'},
            {field: 'name', title: '角色名称', width: 1, align: 'center'},
        ]],
        pagination: true,
        rownumbers: true,
        pageSize: 10,
        pageList: [1, 5, 10, 15]
    });

    // 功能对话窗
    role_dialog.dialog({
        closed: true,
        width: 600,
        height: 400,
        buttons: "#role_datagrid_bb"
    });

    // 用户权限列表
    selfPermissions.datagrid({
        title: "自身权限",
        width: 250,
        height: 250,
        columns: [[
            {field: 'name', title: '权限名称', width: 100, align: "center"}
        ]],
        fitColumns: true,
        rownumbers: true,
        singleSelect: true,
        onDblClickRow: function (rowIndex, rowData) {
            // 双击取消选中行
            selfPermissions.datagrid("deleteRow", rowIndex);
        }
    });
    // 系统权限列表
    allPermissions.datagrid({
        title: "所有权限",
        width: 250,
        height: 250,
        pagination: true,
        url: "/permission_list",
        rownumbers: true,
        singleSelect: true,
        fitColumns: true,
        //数据表头信息
        columns: [[
            {field: "name", title: "权限名称", width: 1, align: "center"}
        ]],
        onDblClickRow: function (rowIndex, rowData) {
            // 已经拥有的权限选中它，不再添加
            var selfRows = selfPermissions.datagrid("getRows"); // 先获取self的所有行
            var flag = false;
            for (var i = 0; i < selfRows.length; i++) {
                if (selfRows[i].id == rowData.id) {// 选中行id判断是否已经拥有
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                // 双击添加到self数据表格中
                selfPermissions.datagrid("appendRow", rowData);
            } else {
                // 选中
                selfPermissions.datagrid("selectRow", rowIndex);
            }
        }
    });

    // 权限列表使用简单模式的分页
    allPermissions.datagrid("getPager").pagination({
        showPageList: false,
        showRefresh: false,
        displayMsg: "",
    });
    selfPermissions.datagrid("getPager").pagination({
        showPageList: false,
        showRefresh: false,
        displayMsg: "",
    });

    $('#search_input').bind('keyup', function(event) {
        if (event.keyCode == "13") {
            alert("hello");
            //回车执行查询
            $('#a_search').click();
        }
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
            role_dialog.dialog("open");
            role_dialog.dialog("setTitle", "新增"),
            role_dialog_form.form("clear");
            // 清空self的数据
            selfPermissions.datagrid("loadData", {rows:[]});
        },
        edit: function () {
            let rowData = role_datagrid.datagrid("getSelected");
            if (rowData) {
                role_dialog.dialog("setTitle", "编辑");
                role_dialog.dialog("open");
                role_dialog_form.form("clear");
                // 回显角色信息和角色对应的权限
                role_dialog_form.form("load",rowData);
                selfPermissions.datagrid("options").url = "permission_queryByRid?id=" + rowData.id;
                selfPermissions.datagrid("load");
            } else {
                $.messager.alert("温馨提示", "请选择一条需要修改的数据", "warning");
            }
        },
        delete: function () {
            let rowData = role_datagrid.datagrid("getSelected");
            if (rowData) {
                $.messager.confirm("确定对话框", "确定要删除该角色吗?", function (y) {
                    if (y) {
                        var id = rowData.id;
                        $.get("/role_delete", {id: rowData.id}, function (data) {
                            if (data.success) {
                                $.messager.alert("温馨提示", data.message, "info");
                                role_datagrid.datagrid("reload");
                            } else {
                                $.messager.alert("温馨提示", data.message, "warning");
                            }
                        })
                    }
                })
            } else {
                $.messager.alert("温馨提示", "请选择要删除的角色", "warning");
            }
        },
        refresh: function () {
            role_datagrid.datagrid("reload");
        },
        save: function () {
            let url = null;
            let id = $("input[name='id']").val();
            if (id) {
                url = "/role_edit";
            } else {
                url = "/role_save";
            }
            // 获取到self的数据
            let  rows = selfPermissions.datagrid("getRows");
            role_dialog_form.form('submit', {
                url: url,
                onSubmit: function (param) {
                    //
                    for (var i = 0; i < rows.length; i++) {
                        param["permissionList[" + i + "].id"] = rows[i].id;
                    }
                },
                success: function (data) {
                    data = $.parseJSON(data);
                    if (data.success) {
                        $.messager.alert("温馨提示", data.message, "info");
                        role_dialog.dialog("close");
                        role_datagrid.datagrid("reload");
                    } else {
                        $.messager.alert("温馨提示", data.message, "warning");
                    }
                }
            })
        },
        cancel: function () {
            role_dialog.dialog("close");
        },
        search: function () {
            let array = role_searchForm.serializeArray();
            let param = {};
            $.each(array, function (i, field) {
                param[field.name] = field.value;
            })
            role_datagrid.datagrid("load", param);
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