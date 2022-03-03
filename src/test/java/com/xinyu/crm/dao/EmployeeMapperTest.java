package com.xinyu.crm.dao;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinyu.crm.pojo.Employee;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 11:26
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext.xml")
public class EmployeeMapperTest {

    @Autowired
    private EmployeeMapper employeeMapper;

    /**
     * 批量新增，需要在扫描器中配置，然后继承该接口
     * 属性为null也会插入
     *
     * insert into table () values (), (), ()
     */
    @Test
    public void insertList() {
        ArrayList<Employee> employees = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Employee employee = new Employee();
            employee.setRealname("zs" + i);
            employee.setPassword("00000000");
            employees.add(employee);
        }
        int i = employeeMapper.insertList(employees);
    }

    /**
     * 批量删除
     *DELETE FROM employee where id in (37,38,39)
     */
    @Test
    public void deleteByIds() {
        Long[]  ids = {37L,38L,39L};
        String s1 = StringUtils.join(ids, ",");
        employeeMapper.deleteByIds(s1);
    }

    @Test
    public void deleteByPrimaryKey() {
        employeeMapper.deleteByPrimaryKey(29L);
    }

    @Test
    public void delete() {
        // 条件删除
        Employee employee = new Employee();
        employee.setPassword("412");
        employeeMapper.delete(employee);
    }

    @Test
    public void insert() {
        // 无论字段是否有值，都会插入
        Employee employee = new Employee();
        employeeMapper.insert(employee);
    }

    @Test
    public void insertSelective() {
        // 根据字段是否为null选择插入，为null不插入，会将自增的主键返回到对象中
        Employee employee = new Employee();
        employee.setRealname("dada");
        employee.setInputtime(null);
        employee.setPassword("23414");
        int i = employeeMapper.insertSelective(employee);
        System.out.println(employee);
        System.out.println(i);


    }

    @Test
    public void selectAll() {
        List<Employee> employees = employeeMapper.selectAll();
        System.out.println(employees);
    }

    @Test
    public void selectByPrimaryKey() {
        // 主键查询，也可以直接输入主键
        Employee employee = new Employee();
        employee.setId(1L);
        Employee employee1 = employeeMapper.selectByPrimaryKey(employee);
//        System.out.println(employee1);
    }

    @Test
    public void selectCount() {
        // SELECT COUNT(id) FROM employee WHERE password = ? AND state = ?
        Employee employee = new Employee();
        employee.setPassword("000000");
        employee.setState(true);
        int i = employeeMapper.selectCount(employee);
        System.out.println(i);
    }

    @Test
    public void select() {
        // 根据条件查询列表
        Employee employee = new Employee();
        employee.setPassword("000000");
        employee.setState(true);
        List<Employee> select = employeeMapper.select(employee);
    }

    @Test
    public void selectOne() {

    }

    @Test
    public void updateByPrimaryKey() {
        // 只根据主键修改所有，无论是否有值
        Employee employee = new Employee();
        employee.setPassword("000000");
        employeeMapper.updateByPrimaryKey(employee);
    }

    @Test
    public void updateByPrimaryKeySelective() {
        // 根据主键有条件的修改，为null的不会set
        Employee employee = new Employee();
        employee.setPassword("000000");
        employeeMapper.updateByPrimaryKeySelective(employee);
    }

    @Test
    public void deleteByExample() {
    }

    @Test
    public void selectByExample() {
        // 分页对象，只对紧接着的查询语句生效
        PageHelper.startPage(1,2);
        // 查询条件构造对象
        Example example = new Example(Employee.class);
        // 条件对象
        Example.Criteria criteria = example.createCriteria();
        // 根据条件查询
        criteria.andEqualTo("password", "000000");
        // id倒序
        example.orderBy("id").desc();

        // 开始查询
        List<Employee> employees = employeeMapper.selectByExample(example);

        // 转换为分页信息
        PageInfo<Employee> pageInfo = new PageInfo<>(employees);
        System.out.println("分页信息：总数量" + pageInfo.getTotal());
        System.out.println("分页信息：总页数" + pageInfo.getPages());
        System.out.println("分页信息：页码" + pageInfo.getPageNum());
        System.out.println("分页信息：页面size" + pageInfo.getPageSize());

        System.out.println(pageInfo.getList());

    }

    @Test
    public void selectCountByExample() {
    }

    @Test
    public void updateByExample() {
    }

    @Test
    public void updateByExampleSelective() {
    }

    @Test
    public void selectByExampleAndRowBounds() {
    }

    @Test
    public void selectByRowBounds() {
    }
}