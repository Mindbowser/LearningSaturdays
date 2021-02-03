package com.learningsat.demoapp.function;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.learningsat.demoapp.dao.UserInfoDaoImpl;
import com.learningsat.demoapp.domain.UserInfo;
import com.learningsat.demoapp.model.SignupRequest;
import com.learningsat.demoapp.model.SignupResponse;

public class SignupFunctions implements RequestHandler<SignupRequest, SignupResponse> {
  private static final UserInfoDaoImpl userInfoDao = UserInfoDaoImpl.instance();
  
  public SignupResponse handleRequest(SignupRequest signupRequest, Context context) {
    SignupResponse response = new SignupResponse();
    System.out.println("SignupRequest::" + signupRequest.getFirstName());
    try {
      if (signupRequest == null)
        throw new IllegalArgumentException("Cannot save null object in Signup"); 
      UserInfo userinfo = new UserInfo();
      userinfo.setFirstName(signupRequest.getFirstName());
      userinfo.setLastName(signupRequest.getLastName());
      userinfo.setDob(signupRequest.getDob());
      userinfo.setEmail(signupRequest.getEmail());
      userinfo.setMetadata("signupdata");
      UserInfo userInfoSaved = userInfoDao.saveOrUpdateSignUp(userinfo);
      response.setUserId(userInfoSaved.getUserId());
      response.setMessage("User Info Saved");
    } catch (Exception e) {
      throw new RuntimeException("Internal Server Error");
    } 
    return response;
  }
}
