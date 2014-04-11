package org.eoc.di.config;

import org.eoc.di.dao.impl.Daos;
import org.eoc.di.services.impl.Services;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = {Daos.class, Services.class})
public class ApplicationConfig {

}
