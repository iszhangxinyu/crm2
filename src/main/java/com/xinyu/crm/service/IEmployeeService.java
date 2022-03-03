package com.xinyu.crm.service;

import com.xinyu.crm.pojo.Employee;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 9:50
 */
public interface IEmployeeService {
    Employee queryByLogin(String username, String password);
}
