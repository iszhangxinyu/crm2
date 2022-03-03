package com.xinyu.crm.controller;

import com.xinyu.crm.page.AJAXResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 8:34
 */
@Controller
public class EmployeeController {

    @GetMapping("login")
    public AJAXResult login(String username, String password) {
        return null;
    }
}
