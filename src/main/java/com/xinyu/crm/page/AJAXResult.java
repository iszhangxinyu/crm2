package com.xinyu.crm.page;

import lombok.Getter;
import lombok.Setter;

/**
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 9:10
 */
@Setter@Getter
public class AJAXResult {
    private boolean success;
    private String message;

    public AJAXResult(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AJAXResult(String message) {
        this.message = message;
    }
}
