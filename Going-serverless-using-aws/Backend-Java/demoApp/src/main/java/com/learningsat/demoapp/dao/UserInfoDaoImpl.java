package com.learningsat.demoapp.dao;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.learningsat.demoapp.domain.UserInfo;
import com.learningsat.demoapp.manager.DynamoDBManager;

public class UserInfoDaoImpl {
  private static final DynamoDBMapper mapper = DynamoDBManager.getDBMapper();
  
  private static UserInfoDaoImpl instance;
  
  public static UserInfoDaoImpl instance() {
    if (instance == null)
      instance = new UserInfoDaoImpl(); 
    return instance;
  }
  
  public UserInfo saveOrUpdateSignUp(UserInfo userinfo) {    
    mapper.save(userinfo);     
    return userinfo;
  }
}
