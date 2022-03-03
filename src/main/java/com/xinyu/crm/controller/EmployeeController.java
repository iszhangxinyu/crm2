package com.xinyu.crm.controller;

import com.xinyu.crm.page.AJAXResult;
import com.xinyu.crm.page.PageResult;
import com.xinyu.crm.pojo.Employee;
import com.xinyu.crm.qo.EmployeeQueryObject;
import com.xinyu.crm.service.IEmployeeService;
import com.xinyu.crm.utils.UserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @author xinyu
 */
@Controller
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;

    @GetMapping("employee")
    public String index() {
        return "employee";
    }

    @RequestMapping("login")
    @ResponseBody
    public AJAXResult login(Employee employee, HttpServletRequest request) {
        UserContext.set(request);
        AJAXResult result = null;
        Employee employee1 = employeeService.queryByLogin(employee);
        if (employee1 != null) {
            UserContext.get().getSession().setAttribute(UserContext.USER_IN_SESSION, employee);
            // 权限
            // 菜单
            result = new AJAXResult(true, "登录成功");
        } else {
            result = new AJAXResult("输入的用户信息有误");
        }
        return result;
    }

    @PostMapping("employee_list")
    @ResponseBody
    public PageResult<Employee> list(EmployeeQueryObject qo) {
        return employeeService.listPage(qo);
    }



}
