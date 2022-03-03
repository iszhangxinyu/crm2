package com.xinyu.crm.qo;

import lombok.Getter;
import lombok.Setter;

/**
 * @author xinyu
 * @version v1.0
 * @date created in 2022-03-03 16:42
 */
@Setter
@Getter
public class QueryObject {
    private Integer page;
    private Integer rows;

    public Integer getPage() {
        return page == null ? 1 : page;
    }

    public Integer getRows() {
        return rows == null ? 5 : rows;
    }
}
