package com.xinyu.crm.pojo;

import javax.persistence.*;

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

    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 获取部门编号
     *
     * @return sn - 部门编号
     */
    public String getSn() {
        return sn;
    }

    /**
     * 设置部门编号
     *
     * @param sn 部门编号
     */
    public void setSn(String sn) {
        this.sn = sn;
    }

    /**
     * 获取部门名称
     *
     * @return name - 部门名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置部门名称
     *
     * @param name 部门名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取部门经理
     *
     * @return manager_id - 部门经理
     */
    public Long getManagerId() {
        return managerId;
    }

    /**
     * 设置部门经理
     *
     * @param managerId 部门经理
     */
    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    /**
     * 获取上级部门
     *
     * @return parent_id - 上级部门
     */
    public Long getParentId() {
        return parentId;
    }

    /**
     * 设置上级部门
     *
     * @param parentId 上级部门
     */
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取部门状态0正常 -1停用
     *
     * @return state - 部门状态0正常 -1停用
     */
    public Boolean getState() {
        return state;
    }

    /**
     * 设置部门状态0正常 -1停用
     *
     * @param state 部门状态0正常 -1停用
     */
    public void setState(Boolean state) {
        this.state = state;
    }
}