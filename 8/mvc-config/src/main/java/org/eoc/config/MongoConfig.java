package org.eoc.config;

import java.net.UnknownHostException;

import org.springframework.context.annotation.*;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.*;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import com.mongodb.Mongo;


@Configuration
class MongoConfig {

    @Bean
    public MongoDbFactory mongoDbFactory() throws UnknownHostException {
        return new SimpleMongoDbFactory(new Mongo(), "eoc");
    }

    @Bean
    public MongoTemplate mongoTemplate() throws UnknownHostException {
        MongoTemplate template = new MongoTemplate(mongoDbFactory(), mongoConverter());
        return template;
    }

    @Bean
    public MongoTypeMapper mongoTypeMapper() {
        return new DefaultMongoTypeMapper(null);
    }

    @Bean
    public MongoMappingContext mongoMappingContext() {
        return new MongoMappingContext();
    }

    @Bean
    public MappingMongoConverter mongoConverter() throws UnknownHostException {
        MappingMongoConverter converter = new MappingMongoConverter(mongoDbFactory(), mongoMappingContext());
        converter.setTypeMapper(mongoTypeMapper());
        return converter;
    }
}
