@login_feature @regression
Feature: Login Feature

  @smoke @positive
  Scenario: Successful login
    Given I navigate to the login page
    When I login with valid credentials
    Then I should be redirected to the inventory page
  
  @negative
  Scenario Outline: Login with invalid credentials
    Given I navigate to the login page
    When I attempt to login with "<username>" and "<password>"
    Then I should see a login error message with text "Epic sadface: <error_message>"

    Examples:
      | username         | password         | error_message                                               |
      | invalid_user     | correct_password | Username and password do not match any user in this service |
      | correct_username | wrong_password   | Username and password do not match any user in this service |
      | locked_out_user  | correct_password | Sorry, this user has been locked out.                       |
      |                  |                  | Username is required                                        |
      |                  | correct_password | Username is required                                        |
      | correct_username |                  | Password is required                                        |
