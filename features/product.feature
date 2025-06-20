@product_feature @regression
Feature: Product Page Feature

  @smoke @product_details @sanity
  Scenario Outline: Verify product details for different products
    Given I navigate to the login page
    When I login with valid credentials
    Then I should be redirected to the inventory page
    And I should see the product "<product_name>"
    When I click on the product "<product_name>"
    Then I should see the product details for "<product_name>"
    Then the product image should be visible
    And the product description should be "<description>"
    And the product price should be "<price>"

    Examples:
      | product_name            | description                                                                                                                                                     | price  |
      | Sauce Labs Backpack     | carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.                          | $29.99 |
      | Sauce Labs Bike Light   | A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. | $9.99  |
      | Sauce Labs Bolt T-Shirt | Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.                 | $15.99 |
