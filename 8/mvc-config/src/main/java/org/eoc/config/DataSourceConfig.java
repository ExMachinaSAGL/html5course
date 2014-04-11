package org.eoc.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Configuration;

@Configuration
public interface DataSourceConfig {
    DataSource dataSource();
}