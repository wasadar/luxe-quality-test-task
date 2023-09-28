Feature: User Login

  Scenario: User is located on the main page of saucedemo website
    Given User is located on the main page of saucedemo website
    When User clicks the "Login" button
    Then User should see the "Epic sadface: Username is required" error message
