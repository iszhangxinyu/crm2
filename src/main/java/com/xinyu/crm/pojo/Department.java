package com.xinyu.crm.pojo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(generator = "JDBC")
    private Long id;

    /**
     * 部门编号
     */
    private String sn;

    /**
     * 部门名称
     */
    private String name;

    /**
     * 部门经理
     */
    @Column(name = "manager_id")
    private Long managerId;

    /**
     * 上级部门
     */
    @Column(name = "parent_id")
    private Long parentId;

    /**
     * 部门状态0正常 -1停用
     */
    private Boolean state;

}