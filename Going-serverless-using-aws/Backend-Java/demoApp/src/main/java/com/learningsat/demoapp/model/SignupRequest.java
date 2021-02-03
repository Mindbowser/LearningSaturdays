package com.learningsat.demoapp.model;

public class SignupRequest {
  private String userId;
  
  private String firstName;
  
  private String lastName;
  
  private String dob;
  
  private String email;
  
  public String getUserId() {
    return this.userId;
  }
  
  public void setUserId(String userId) {
    this.userId = userId;
  }
  
  public String getFirstName() {
    return this.firstName;
  }
  
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }
  
  public String getLastName() {
    return this.lastName;
  }
  
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  
  public String getDob() {
    return this.dob;
  }
  
  public void setDob(String dob) {
    this.dob = dob;
  }
  
  public String getEmail() {
    return this.email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
}
