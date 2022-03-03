package com.xinyu.crm.interceptor;

import com.xinyu.crm.pojo.Employee;
import com.xinyu.crm.utils.UserContext;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 15:59
 */
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Employee employee = UserContext.getCurrentLoginEmployee();
        if (employee == null) {
            response.sendRedirect("/login.jsp");
            return false;
        }
        UserContext.set(request);
        return true;
    }
}
