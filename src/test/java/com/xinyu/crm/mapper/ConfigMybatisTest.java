package com.xinyu.crm.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.sql.DataSource;

/**
 * 测试spring集成MyBatis
 *
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-02 23:54
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring/applicationContext.xml")
public class ConfigMybatisTest {
    @Autowired
    private DataSource dataSource;

    @Test
    public void testMybatis() {
        System.out.println(dataSource);
    }
}
