package com.xinyu.crm.utils;

import com.xinyu.crm.pojo.Employee;

import javax.servlet.http.HttpServletRequest;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 15:05
 */
public class UserContext {
    public static final String USER_IN_SESSION = "USER_IN_SESSION";

    /**
     * 把用户请求保存到自己的线程中
     */
    private static final ThreadLocal<HttpServletRequest> threadLocal = new ThreadLocal<>();

    public static void set(HttpServletRequest httpServletRequest) {
        threadLocal.set(httpServletRequest);
    }

    public static HttpServletRequest get() {
        return threadLocal.get();
    }

    public static Employee getCurrentLoginEmployee() {
        return (Employee) get().getSession().getAttribute(USER_IN_SESSION);
    }
}
