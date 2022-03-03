package com.xinyu.crm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 0:17
 */
@Controller
public class IndexController {

    @GetMapping("index")
    public String index() {
        return null;
    }
}
