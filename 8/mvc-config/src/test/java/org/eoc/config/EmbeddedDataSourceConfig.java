package org.eoc.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.embedded.*;

/**
 * The data source config that can be used in integration tests.
 */
@Configuration
@Profile("test")
public class EmbeddedDataSourceConfig implements DataSourceConfig {

    @Override
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.HSQL)
                .build();
    }
}
