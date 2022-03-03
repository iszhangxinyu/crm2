package com.xinyu.crm.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinyu.crm.mapper.EmployeeMapper;
import com.xinyu.crm.page.PageResult;
import com.xinyu.crm.pojo.Employee;
import com.xinyu.crm.qo.EmployeeQueryObject;
import com.xinyu.crm.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

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
    public Employee queryByLogin(Employee employee) {
        return employeeDao.selectOne(employee);
    }

    @Override
    public PageResult<Employee> listPage(EmployeeQueryObject qo) {
        PageHelper.startPage(qo.getPage(),qo.getRows());
        Example example = new Example(Employee.class);
        List<Employee> employees = employeeDao.selectByExample(example);
        PageInfo<Employee> pageInfo = new PageInfo<>(employees);
        return new PageResult<Employee>(pageInfo.getTotal(), pageInfo.getList());
    }
}
