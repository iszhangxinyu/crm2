package com.xinyu.crm.service;

import com.xinyu.crm.page.PageResult;
import com.xinyu.crm.pojo.Employee;
import com.xinyu.crm.qo.EmployeeQueryObject;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 9:50
 */
public interface IEmployeeService {
    Employee queryByLogin(Employee employee);

    PageResult<Employee> listPage(EmployeeQueryObject qo);
}
