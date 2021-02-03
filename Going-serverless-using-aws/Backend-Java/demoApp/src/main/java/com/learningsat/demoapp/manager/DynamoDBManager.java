package com.learningsat.demoapp.manager;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;

public class DynamoDBManager {
  private static DynamoDBManager instance;
  
  private DynamoDBMapper dbMapper;
  
  private DynamoDBMapperConfig dbMapperConfig;
  
  private DynamoDBManager() {
    AmazonDynamoDB client = (AmazonDynamoDB)((AmazonDynamoDBClientBuilder)AmazonDynamoDBClientBuilder.standard().withRegion(Regions.US_EAST_2)).build();
    if (System.getenv("TABLE_NAME") != null) {      
      this.dbMapperConfig = (new DynamoDBMapperConfig.Builder())
        .withTableNameOverride(DynamoDBMapperConfig.TableNameOverride.withTableNameReplacement(System.getenv("TABLE_NAME")))
        .build();
      this.dbMapper = new DynamoDBMapper(client, this.dbMapperConfig);      
    } 
  }
  
  public static DynamoDBManager instance() {
    if (instance == null)
      instance = new DynamoDBManager(); 
    return instance;
  }
  
  public static DynamoDBMapper getDBMapper() {
    return (instance()).dbMapper;
  }
}
