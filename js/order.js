// ============================================
// =======================================
// Tabs for Order Online
// ===============================================
const tabsOrder = document.querySelectorAll('[data-tab-target-order]');

const tabs_orderContents = document.querySelectorAll('.order__tab-content');

tabsOrder.forEach((tabOrder) => {
  tabOrder.addEventListener('click', () => {
    const targetOrder = document.querySelector(tabOrder.dataset.tabTargetOrder);

    // Reset active class in tabs
    tabsOrder.forEach((tab) => {
      tab.classList.remove('active');
    });

    // Add active class to clicked tab
    tabOrder.classList.add('active');

    // Reset active class in tab-content
    tabs_orderContents.forEach((tab_content) => {
      tab_content.classList.remove('tab-active');
    });

    // Add active class to tab-content
    targetOrder.classList.add('tab-active');
  });
});

const selectItemTab = document.getElementById('select-item-tab');

const addOrderTab = document.getElementById('add-order-tab');

const checkoutTab = document.getElementById('checkout-tab');

// Select all checkboxes of menu items
const menuItems = document.querySelectorAll(
  '.collapsible__item input[type="checkbox"]'
);

const orderSelectItemButton = document.getElementById('order__select-item-btn');

const selectedItems = document.querySelector('.order__selected-items');

const orderErrorMessage = document.getElementById('order-error-message');

const orderProceedtoCheckout = document.getElementById('order__add-btn');

const orderListContainer = document.querySelector('.order-tab__body');

// Continue Order Button Checked
orderSelectItemButton.addEventListener('click', function () {
  ValidateOrder();
});

// Activate or disable second tab if user changes selection
menuItems.forEach((menuItem) =>
  menuItem.addEventListener('change', function () {
    ChangeMenuSelection();
  })
);

// Function: If item is selected, activate second tab
function ValidateOrder() {
  if (!MenuItemChecked()) {
    addOrderTab.disabled = true;
    checkoutTab.disabled = true;
    tabsOrder[0].classList.add('active');
    tabsOrder[1].classList.remove('active');
    tabs_orderContents[0].classList.add('tab-active');
    tabs_orderContents[1].classList.remove('tab-active');
    // add error message
    orderErrorMessage.innerHTML = 'Note: Please select at least one item';
  } else {
    addOrderTab.removeAttribute('disabled');
    tabsOrder[0].classList.remove('active');
    tabsOrder[1].classList.add('active');
    tabs_orderContents[0].classList.remove('tab-active');
    tabs_orderContents[1].classList.add('tab-active');
    orderErrorMessage.innerHTML = '';
  }
}

// Function: If selection is changed, check if at least an item is checked to activate second tab
function ChangeMenuSelection() {
  if (!MenuItemChecked()) {
    addOrderTab.disabled = true;
    checkoutTab.disabled = true;
    // add error message
    orderErrorMessage.innerHTML = 'Note: Please select at least one item';
  } else {
    addOrderTab.removeAttribute('disabled');
    orderErrorMessage.innerHTML = '';
  }
}

// Function to return boolean if a menu item is selected or not
function MenuItemChecked() {
  var checked = false;
  var menuItemsArray = [];
  var menuPricesArray = [];
  var menuFeaturesArray = [];
  for (let i = 0; i < menuItems.length; i++) {
    if (!menuItems[i].checked && !checked) {
      checked = false;
    } else if (menuItems[i].checked) {
      checked = true;
      console.log('value: ' + menuItems[i].value);
      menuItemsArray.push(menuItems[i]);
    }
  }
  console.log('checked value: ' + checked);

  selectedItems.innerHTML = '';
  for (let item = 0; item < menuItemsArray.length; item++) {
    // Create elements for selected items with their price
    var itemContainer = document.createElement('div');
    var itemName = document.createElement('p');
    var itemPrice = document.createElement('p');
    var priceTag = document.createElement('span');
    var quantityContainer = document.createElement('div');
    var quantitySelect = document.createElement('select');
    var quantityOption = document.createElement('option');
    var quantityIcon = document.createElement('i');

    selectedItems.appendChild(itemContainer);
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemPrice);
    itemContainer.appendChild(quantityContainer);
    quantityContainer.appendChild(quantitySelect);
    quantityContainer.appendChild(quantityIcon);

    // Create option elements from 1 to 10
    for (let qty = 1; qty < 11; qty++) {
      var quantityOption = document.createElement('option');
      quantitySelect.appendChild(quantityOption);
      quantityOption.setAttribute('value', qty);
      quantityOption.innerHTML = qty;
    }

    // Add classes, ids, and values
    // quantitySelect.id = 'order-quantity';
    itemContainer.classList.add('item-container');
    itemName.classList.add('item-name');
    quantityContainer.classList.add('quantity-container');
    quantitySelect.classList.add('order__input');
    quantitySelect.classList.add('order__quantity');
    quantityIcon.classList.add('quantity__icon');
    quantityIcon.classList.add('fas');
    quantityIcon.classList.add('fa-chevron-circle-down');

    // Display selected item in p element
    itemName.innerHTML = menuItemsArray[item].value;
    itemPrice.classList.add('price');

    // Add a random number for price
    itemPrice.innerHTML = Math.ceil(Math.random() * 20 + 10).toPrecision(4);
    menuPricesArray.push(itemPrice.innerHTML);

    itemPrice.appendChild(priceTag);
    priceTag.classList.add('price__tag');
    priceTag.innerHTML = '&#36;';

    var selectFeature = AddSelectionType(menuItemsArray[item], item);

    menuFeaturesArray.push(selectFeature);

    // Adding button to remove items
    var removeItemContainer = document.createElement('div');
    var removeItem = document.createElement('a');
    itemContainer.appendChild(removeItemContainer);
    removeItemContainer.appendChild(removeItem);

    // Classes
    removeItemContainer.classList.add('item__btn-container');
    removeItem.classList.add('item__btn');
    removeItem.classList.add('btn');
    removeItem.classList.add('btn--white');
    removeItem.innerHTML = 'Remove Item';

    // Add Divider between items
    var dividerItems = document.createElement('div');
    itemContainer.appendChild(dividerItems);
    dividerItems.classList.add('item__divider');
  }

  RemoveMenuItem(menuItemsArray);
  var TotalCheckoutCost = TotalOrderCost();

  // Add all items to Checkout Tab Content
  TotalOrder(
    menuItemsArray,
    menuPricesArray,
    menuFeaturesArray,
    TotalCheckoutCost
  );

  return checked;
}

// Function:Calculate Total Order Cost
function TotalOrderCost() {
  const ItemPrices = document.querySelectorAll('.price');

  const ItemQty = document.querySelectorAll('.order__quantity');

  // Sum up the prices of all selected items
  var Total = 0;
  for (let i = 0; i < ItemPrices.length; i++) {
    Total += parseFloat(ItemPrices[i].innerHTML) * ItemQty[i].value;
  }

  console.log('Total Selections = ' + ItemPrices.length);
  console.log('Total Quantity= ' + ItemQty.length);

  // Create elements to display Total Cost
  var orderCostContainer = document.createElement('div');
  var totalTitle = document.createElement('p');
  var totalCost = document.createElement('p');
  var totalTag = document.createElement('span');

  selectedItems.appendChild(orderCostContainer);
  orderCostContainer.appendChild(totalTitle);
  orderCostContainer.appendChild(totalCost);

  orderCostContainer.classList.add('order__cost-container');
  totalTitle.classList.add('order__total');
  totalTitle.innerHTML = 'Total: ';

  totalCost.classList.add('price--total');
  totalCost.innerHTML = Total.toFixed(2);
  totalCost.appendChild(totalTag);

  totalTag.classList.add('price__tag');
  totalTag.innerHTML = '&#36;';

  // Change quantity selection to update total
  ItemQty.forEach((quantity) =>
    quantity.addEventListener('change', function () {
      console.log('changed Total Price');
      var Total = 0;
      for (let i = 0; i < ItemPrices.length; i++) {
        Total += parseFloat(ItemPrices[i].innerHTML) * ItemQty[i].value;
      }
      totalCost.innerHTML = Total.toFixed(2);
      totalCost.appendChild(totalTag);
    })
  );

  return [Total, ItemQty];
}

// Function: Add selection content if checkbox has a specific type
const meatItems = document.querySelectorAll('input[name="meat-type"]');

const sideItems = document.querySelectorAll('input[name="sides-type"]');

function AddSelectionType(selectedMenuItem, item) {
  // Menu Items to add sides item
  if (
    selectedMenuItem.getAttribute('name') == 'meat-type' ||
    selectedMenuItem.getAttribute('name') == 'seafood-type' ||
    selectedMenuItem.getAttribute('name') == 'veggie-type'
  ) {
    var selectTag = AddSelectTag(item);

    selectTag[0].innerHTML = 'Add Side';

    // Select Options for feature
    sideItems.forEach(function (sideItem) {
      var itemFeatureOption = document.createElement('option');
      selectTag[1].appendChild(itemFeatureOption);
      itemFeatureOption.setAttribute('value', sideItem.value);
      itemFeatureOption.innerHTML = sideItem.value;
    });
    return selectTag[1];
  }
  // Select Wine
  else if (selectedMenuItem.getAttribute('value') == 'Wines') {
    var selectTag = AddSelectTag(item);

    selectTag[0].innerHTML = 'Select Wine';

    var wines = [
      'Argentinian Red Wine',
      'Cabernet Sauvignon',
      'Merlot',
      'Chardonnay',
      'Tempranillo',
      'Syrah',
      'Garnacha',
      'Sauvignon Blanc',
    ];

    wines.forEach(function (wine) {
      var itemFeatureOption = document.createElement('option');
      selectTag[1].appendChild(itemFeatureOption);
      itemFeatureOption.setAttribute('value', wine);
      itemFeatureOption.innerHTML = wine;
    });
    return selectTag[1];
  }
  // Select Beer
  else if (selectedMenuItem.getAttribute('value') == 'Beer') {
    var selectTag = AddSelectTag(item);

    selectTag[0].innerHTML = 'Select Flavor';

    var beers = [
      'Bud Light',
      'Corona',
      'Budweiser',
      'Modelo',
      'Dos Equis',
      'Blue Moon',
      'Stella Artois',
      'Heineken',
      'Miller Lite',
    ];

    beers.forEach(function (beer) {
      var itemFeatureOption = document.createElement('option');
      selectTag[1].appendChild(itemFeatureOption);
      itemFeatureOption.setAttribute('value', beer);
      itemFeatureOption.innerHTML = beer;
    });
    return selectTag[1];
  }

  // Select Soda Flavor
  else if (selectedMenuItem.getAttribute('value') == 'Soda') {
    var selectTag = AddSelectTag(item);

    selectTag[0].innerHTML = 'Select Flavor';

    var sodas = ['Coke', 'Diet Coke', 'Orange Fanta', 'Sprite', 'Dr. Pepper'];

    sodas.forEach(function (soda) {
      var itemFeatureOption = document.createElement('option');
      selectTag[1].appendChild(itemFeatureOption);
      itemFeatureOption.setAttribute('value', soda);
      itemFeatureOption.innerHTML = soda;
    });
    return selectTag[1];
  } else {
    return 0;
  }
}

function AddSelectTag(item) {
  const ItemsContainer = document.querySelectorAll('.item-container');
  // Create div, title and select tag
  var itemFeatureContainer = document.createElement('div');
  var itemFeature = document.createElement('p');
  var itemFeatureSelectContainer = document.createElement('div');
  var itemFeatureSelect = document.createElement('select');
  var itemFeatureIcon = document.createElement('i');

  ItemsContainer[item].appendChild(itemFeatureContainer);
  itemFeatureContainer.appendChild(itemFeature);
  itemFeatureContainer.appendChild(itemFeatureSelectContainer);
  itemFeatureSelectContainer.appendChild(itemFeatureSelect);
  itemFeatureSelectContainer.appendChild(itemFeatureIcon);

  // Adding classes, ids, or values
  itemFeatureContainer.classList.add('order__feature');
  itemFeature.classList.add('feature__title');
  itemFeatureSelectContainer.classList.add('feature__container');
  itemFeatureSelect.classList.add('order__input');
  itemFeatureSelect.classList.add('order__feature-select');
  itemFeatureIcon.classList.add('feature__icon');
  itemFeatureIcon.classList.add('fas');
  itemFeatureIcon.classList.add('fa-chevron-circle-down');

  return [itemFeature, itemFeatureSelect];
}

// Remove Item Event
function RemoveMenuItem(selectedMenuArray) {
  const removeButtons = document.querySelectorAll('.item__btn');
  removeButtons.forEach((removebtn, index) =>
    removebtn.addEventListener('click', function () {
      console.log(removebtn);
      console.log('Removed Item: ' + selectedMenuArray[index].value);

      selectedMenuArray[index].checked = false;

      MenuItemChecked();
      ValidateOrder();
    })
  );
}

//Clicked to Proceed to checkout
orderProceedtoCheckout.addEventListener('click', function () {
  ActivateCheckoutTab();
});

function ActivateCheckoutTab() {
  checkoutTab.removeAttribute('disabled');
  tabsOrder[1].classList.remove('active');
  tabsOrder[2].classList.add('active');
  tabs_orderContents[1].classList.remove('tab-active');
  tabs_orderContents[2].classList.add('tab-active');
}

// =================================
// Checkout Tab

function TotalOrder(
  totalOrderArray,
  totalOrderPricesArray,
  totalOrderFeaturesArray,
  totalOrderCheckoutCost
) {
  orderListContainer.innerHTML = '';

  totalOrderArray.forEach(function (item, index) {
    var totalOrderItem = document.createElement('div');
    var totalOrderItemName = document.createElement('p');
    var totalOrderItemPrice = document.createElement('p');

    orderListContainer.appendChild(totalOrderItem);
    totalOrderItem.appendChild(totalOrderItemName);
    totalOrderItem.appendChild(totalOrderItemPrice);

    if (totalOrderFeaturesArray[index] != 0) {
      var totalOrderFeature = document.createElement('li');
      totalOrderItem.appendChild(totalOrderFeature);
      totalOrderFeature.classList.add('order__checkout-feature');
      totalOrderFeature.innerHTML = totalOrderFeaturesArray[index].value;
    }

    // Add classes, values, etc
    totalOrderItem.classList.add('order__item');
    totalOrderItemName.classList.add('order__item-name');
    totalOrderItemPrice.classList.add('order__item-price');

    // Add content to tags
    totalOrderItemName.innerHTML = item.value;
    totalOrderItemPrice.innerHTML = totalOrderPricesArray[index];

    var totalOrderPriceTag = document.createElement('span');
    totalOrderItemPrice.appendChild(totalOrderPriceTag);
    totalOrderPriceTag.classList.add('order__item-tag');
    totalOrderPriceTag.innerHTML = '&#36;';
  });

  // Add Total Cost
  var checkoutTotalContainer = document.createElement('div');
  var checkoutTotalTitle = document.createElement('p');
  var checkoutTotalPrice = document.createElement('p');

  orderListContainer.appendChild(checkoutTotalContainer);
  checkoutTotalContainer.appendChild(checkoutTotalTitle);
  checkoutTotalContainer.appendChild(checkoutTotalPrice);

  checkoutTotalContainer.classList.add('order__checkout-container');
  checkoutTotalTitle.classList.add('order__checkout-title');
  checkoutTotalPrice.classList.add('order__checkout-price');

  checkoutTotalTitle.innerHTML = 'Total: ';

  checkoutTotalPrice.innerHTML = totalOrderCheckoutCost[0].toFixed(2);

  var checkoutTotalTag = document.createElement('span');
  checkoutTotalPrice.appendChild(checkoutTotalTag);
  checkoutTotalTag.classList.add('order__checkout-price-tag');
  checkoutTotalTag.innerHTML = '&#36;';

  totalOrderCheckoutCost[1].forEach(function (quantity, position) {
    quantity.addEventListener('change', function () {
      // Delete additonal items added if quantity is changed
      const itemstoDelete = document.querySelectorAll(
        '.item__added--' + position
      );
      for (let item = 0; item < itemstoDelete.length; item++) {
        itemstoDelete[item].remove();
      }

      // Index to add additional items
      var indextoAddItems = 0;

      for (let index = 0; index < position; index++) {
        indextoAddItems += parseInt(totalOrderCheckoutCost[1][index].value);
      }

      // Add item elements based on quantity specified
      for (let iteration = 0; iteration < quantity.value - 1; iteration++) {
        var totalOrderItem = document.createElement('div');
        var totalOrderItemName = document.createElement('p');
        var totalOrderItemPrice = document.createElement('p');

        orderListContainer.insertBefore(
          totalOrderItem,
          orderListContainer.childNodes[indextoAddItems + 1]
        );
        totalOrderItem.appendChild(totalOrderItemName);
        totalOrderItem.appendChild(totalOrderItemPrice);

        if (totalOrderFeaturesArray[position] != 0) {
          var totalOrderFeature = document.createElement('li');
          totalOrderItem.appendChild(totalOrderFeature);
          totalOrderFeature.classList.add('order__checkout-feature');
          totalOrderFeature.innerHTML = totalOrderFeaturesArray[position].value;
        }

        // Add classes, values, etc
        totalOrderItem.classList.add('order__item');
        totalOrderItem.classList.add('item__added--' + position);
        totalOrderItemName.classList.add('order__item-name');
        totalOrderItemPrice.classList.add('order__item-price');

        // // Add content to tags
        totalOrderItemName.innerHTML = totalOrderArray[position].value;
        totalOrderItemPrice.innerHTML = totalOrderPricesArray[position];

        // Add tag $ for price
        var totalOrderPriceTag = document.createElement('span');
        totalOrderItemPrice.appendChild(totalOrderPriceTag);
        totalOrderPriceTag.classList.add('order__item-tag');
        totalOrderPriceTag.innerHTML = '&#36;';
      }

      var prices = document.querySelectorAll('.order__item-price');

      var TotalOrderPrice = 0;
      for (let i = 0; i < prices.length; i++) {
        TotalOrderPrice += parseFloat(prices[i].innerHTML);
      }

      checkoutTotalPrice.innerHTML = TotalOrderPrice.toFixed(2);
      var checkoutTotalTag = document.createElement('span');
      checkoutTotalPrice.appendChild(checkoutTotalTag);
      checkoutTotalTag.classList.add('order__checkout-price-tag');
      checkoutTotalTag.innerHTML = '&#36;';
    });
  });

  // Update checkout content based on change in selection
  var featureSelectItems = document.querySelectorAll('.order__feature-select');

  var orderItems = document.querySelectorAll('.order__item');

  featureSelectItems.forEach(function (featureSelect, position) {
    featureSelect.addEventListener('change', function () {
      console.log('Quantity: ' + totalOrderCheckoutCost[1][position]);

      var ItemsContainer = document.querySelectorAll('.item-container');

      var checkoutFeatureItems = document.querySelectorAll(
        '.order__checkout-feature'
      );

      console.log(
        'Number of items with selection: ' + checkoutFeatureItems.length
      );

      // Position for loop item to skip items with no extra selection
      console.log('Position Selected: ' + position);
      var positionItem = position;

      var count = 0;
      var pos = 0;
      while (count <= position) {
        while (ItemsContainer[pos].childElementCount == 5) {
          positionItem += 1;
          pos++;
        }
        while (ItemsContainer[pos].childElementCount == 6) {
          count++;
          if (count > position) {
            break;
          }
          pos++;
        }
      }

      console.log('POSITION ITEM FOR LOOP: ' + positionItem);

      // Index to change the correct item
      var indextoChangeValue = 0;

      for (let index = 0; index < positionItem; index++) {
        if (ItemsContainer[index].childElementCount == 6) {
          indextoChangeValue += parseInt(
            totalOrderCheckoutCost[1][index].value
          );
        }
      }
      console.log('Index of checkout items: ' + indextoChangeValue);

      for (
        let iteration = 0;
        iteration < totalOrderCheckoutCost[1][positionItem].value;
        iteration++
      ) {
        checkoutFeatureItems[indextoChangeValue].innerHTML =
          featureSelect.value;
        indextoChangeValue++;
      }
    });
  });
}
