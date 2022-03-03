package com.xinyu.crm.page;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @author xinyu
 * @version v1.0
 * @date created in 2022-03-03 16:40
 */
@Setter@Getter
public class PageResult<T> {
    private Long total;
    private List<T> rows;

    public PageResult(Long total, List<T> rows) {
        this.total = total;
        this.rows = rows;
    }
}
