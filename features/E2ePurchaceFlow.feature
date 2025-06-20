Feature: End-to-End Purchase Flow
  @e2ePurchase
  Scenario: Successful purchase of multiple items
    Given I navigate to the login page
    When I login with valid credentials
    Then I should be redirected to the inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I add "Sauce Labs Bolt T-Shirt" to the cart
    Then the cart icon should show "3" items
    When I click on the cart icon
    Then I should be redirected to the cart page
    And I should see "Sauce Labs Backpack" in the cart
    And I should see "Sauce Labs Bike Light" in the cart
    And I should see "Sauce Labs Bolt T-Shirt" in the cart
    When I click on the checkout button
    Then I should be redirected to the checkout information page
    When I enter first name "John", last name "Doe", and postal code "12345"
    And I click on the continue button
    Then I should be redirected to the checkout overview page
    And I should see "Sauce Labs Backpack" in the order summary
    And I should see "Sauce Labs Bike Light" in the order summary
    And I should see "Sauce Labs Bolt T-Shirt" in the order summary
    And the item total should be "$55.97"
    When I click on the finish button
    Then I should be redirected to the order confirmation page
    And I should see the "THANK YOU FOR YOUR ORDER" message
    And I should see the "Back Home" button