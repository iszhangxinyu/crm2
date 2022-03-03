package com.xinyu.crm.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 7:43
 */
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        httpServletResponse.addHeader("Content-Type","application/json;charset=UTF-8");
        try {
            new ObjectMapper().writeValue(httpServletResponse.getWriter(), e.getMessage());
            httpServletResponse.getWriter().flush();
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }
        return null;
    }
}
