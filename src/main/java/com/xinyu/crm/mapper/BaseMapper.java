package com.xinyu.crm.mapper;

import tk.mybatis.mapper.annotation.RegisterMapper;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.ids.DeleteByIdsMapper;
import tk.mybatis.mapper.common.special.InsertListMapper;

/**
 * 对Mapper进行抽取基本的操作功能
 *
 * @author zhangxinyu
 * @version v1.0
 * @date created in 2022-03-03 14:24
 */
@RegisterMapper
public interface BaseMapper<T> extends Mapper<T>, InsertListMapper<T>, DeleteByIdsMapper<T> {
}
