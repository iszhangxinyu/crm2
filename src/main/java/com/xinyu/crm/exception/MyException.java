package com.xinyu.crm.exception;

import lombok.Getter;
import lombok.Setter;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 7:28
 */
@Setter
@Getter
public class MyException extends Exception {

    private String message;

    public MyException() {
        super();
    }

    public MyException(String message) {
        this.message = message;
    }

}
