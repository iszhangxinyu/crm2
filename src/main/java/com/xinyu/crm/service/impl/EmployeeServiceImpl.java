package com.xinyu.crm.service.impl;

import com.xinyu.crm.dao.EmployeeMapper;
import com.xinyu.crm.pojo.Employee;
import com.xinyu.crm.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 9:51
 */
@Service
public class EmployeeServiceImpl implements IEmployeeService {
    @Autowired
    private EmployeeMapper employeeDao;

    @Override
    public Employee queryByLogin(String username, String password) {
        return null;
    }
}
