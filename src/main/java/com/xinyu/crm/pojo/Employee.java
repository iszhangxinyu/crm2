package com.xinyu.crm.pojo;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.util.Date;

@Data
@Alias("Employee")
public class Employee {
    private Long id;

    private String username;

    private String realname;

    private String password;

    private String tel;

    private String email;

    private Long deptId;

    private Date inputtime;

    private Boolean state;

    private Boolean admin;

}