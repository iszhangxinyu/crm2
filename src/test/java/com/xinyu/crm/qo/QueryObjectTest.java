package com.xinyu.crm.qo;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * @author xinyu
 * @version v1.0
 * @date created in 2022-03-03 17:20
 */
public class QueryObjectTest {

    @Test
    public void getPage() {
        QueryObject queryObject = new QueryObject();
        Integer page = queryObject.getPage();
        System.out.println(page);
    }
}