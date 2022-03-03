package com.xinyu.crm.pojo;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Alias("Employee")
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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