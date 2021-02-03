package com.learningsat.demoapp.model;

public class SignupResponse {
  private String message;
  
  private String userId;
  
  private String error;
  
  public String getMessage() {
    return this.message;
  }
  
  public void setMessage(String message) {
    this.message = message;
  }
  
  public String getUserId() {
    return this.userId;
  }
  
  public void setUserId(String userId) {
    this.userId = userId;
  }
  
  public String getError() {
    return this.error;
  }
  
  public void setError(String error) {
    this.error = error;
  }
}
