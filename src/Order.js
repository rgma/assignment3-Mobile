let currentState = welcoming;
let onOrderCompleteCallback = null;

export function setOnOrderComplete(callback) {
  onOrderCompleteCallback = callback;
}

let order = {
  item: "",
  size: "",
  topping: "",
  upsell: ""
};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
}

function welcoming() {
  let aReturn = [];
  currentState = chooseItem;

  aReturn.push("Welcome to The Boba Bar! What would you like?");
  aReturn.push("1. Bubble Tea");
  aReturn.push("2. Fruit Smoothie");

  return aReturn;
}

function chooseItem(sInput) {
  let aReturn = [];

  if (sInput == "1") {
    order.item = "Bubble Tea";
    currentState = chooseSize;
    aReturn.push("Great! Boba it is!");
    aReturn.push("Choose a size: Small or Large");
  } else if (sInput == "2") {
    order.item = "Fruit Smoothie";
    currentState = chooseSize;
    aReturn.push("Great! Fruit Smoothie it is!");
    aReturn.push("Choose a size: Small or Large");
  } else {
    aReturn.push("Please type 1 or 2");
  }

  return aReturn;
}

function chooseSize(sInput) {
  let aReturn = [];

  order.size = sInput;
  currentState = chooseTopping;

  if (order.item == "Bubble Tea") {
    aReturn.push("Pick a topping: Pearls or Jelly");
  } else {
    aReturn.push("Pick a fruit!");
    aReturn.push("Strawberry or Mango");
  }

  return aReturn;
}

function chooseTopping(sInput) {
  let aReturn = [];

  order.topping = sInput;
  currentState = upsell;

  aReturn.push("Would you like to add a cookie? (y/n)");

  return aReturn;
}

function upsell(sInput) {
  let aReturn = [];

  if (sInput == "y") {
    order.upsell = "Cookie";
  } else {
    order.upsell = "No Cookie";
  }

  // 🔥 CALL LOYALTY CALLBACK
  if (onOrderCompleteCallback) {
    onOrderCompleteCallback();
  }

  currentState = welcoming;

  aReturn.push("Order Confirmed!");
  aReturn.push(`${order.size} ${order.item} with ${order.topping}`);
  aReturn.push(`Extra: ${order.upsell}`);
  aReturn.push("Your order will be ready soon!");

  return aReturn;
}