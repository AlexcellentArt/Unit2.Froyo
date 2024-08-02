const order = {
  vanilla: 0,
  chocolate: 0,
  coffee: 0,
  strawberry: 0,
};

const prices = {
  vanilla: 5,
  chocolate: 6,
  coffee: 7,
  strawberry: 6,
};
const inStock = {
  vanilla: 50,
  chocolate: 63,
  coffee: 72,
  strawberry: 36,
};

// This would be a better format, but I gotta stick to the rubric, so the above format it is.
function Item(name, price, stock, image) {
  this.name = name;
  this.price = price;
  this.stock = stock;
  this.image = image;
}
let wares = [];
let totalPrice = 0;
let testInput = "vanilla,vanilla,vanilla,strawberry,coffee,coffee";

const parseOrder = (str) => {
  let orderArr = str.split(",");
  //console.log(orderArr);
  // function to count order
  for (i = 0; i < orderArr.length; i++) {
    let item = orderArr[i];
    //console.log(item);
    if (item in order) {
      order[item] += 1;
    }
  }
  return order;
};

const calculatePrice = (order) => {
  //clear visual children of order first
  document.getElementById("recipt").innerHTML = "";
  let newPrice = 0;
  for (const key in order) {
    let amount = order[key];
    // adding visually
    if (amount > 0) {
      addToOrder(key, amount);
    }
    while (amount > 0) {
      let oldPrice = newPrice;
      newPrice += prices[key];
      console.log(
        `Added ${key} to order price, raising it from ${oldPrice} to ${newPrice}`
      );
      amount -= 1;
    }
    document.getElementById("total").textContent = "Total: $" + newPrice;
  }
  return newPrice;
};

const processPrompt = (input) => {
    // first clean order
    for (key in order){
        order[key] = 0;
    }
  let newOrder = parseOrder(input);
  //Now calc price
  totalPrice = calculatePrice(newOrder);
  console.table(newOrder);
  console.log(totalPrice);
};
const processButton = (key, amount) => {
  //console.log(key);
  order[key] += amount;
  // prevent negatives
  if (order[key] < 0) {
    order[key] = 0;
  }
  //Now calc price
  totalPrice = calculatePrice(order);
  //console.log(totalPrice);
};

const addToOrder = (name, qty) => {
  const text = `${name} x ${qty}`;
  const obj = document.createElement("p");
  obj.appendChild(document.createTextNode(text));
  const element = document.getElementById("recipt");
  element.appendChild(obj);
};
const cloneObjHTML = (templateID) => {
  let item = document.getElementById(templateID).content;
  //console.log(item);
  return item.cloneNode(true);
};

const populate_items = (items, to) => {
  //   let dest = document.getElementById(to);
  dest = document.getElementById("items");
  //console.log("DESTINATION:");
  //console.log(dest);
  for (item in items) {
    console.table(`item to populate: ${items[item]}`);
    let assembled = assembleItemHTML(items[item]);
    //console.log("ASSEMBLED");
    //console.log(assembled);
    dest.appendChild(assembled);
  }
};
const assembleItemHTML = (data) => {
  //console.log(data);
  let temp = cloneObjHTML("item_template");
  //console.log(temp.childNodes[1]);
  //Fillout img
  //console.log(temp.childNodes[1].querySelector(".img").querySelector("img"));
  temp.childNodes[1].querySelector(".img").querySelector("img").src =
    data["image"];
  //console.log(temp.childNodes[1].childNodes[1].childNodes[0]);
  let h2s = temp.childNodes[1].querySelectorAll("h2");
  //console.log(h2s);
  //Fillout h2s
  h2s[0].textContent = data.name;
  h2s[1].textContent = "$" + data.price;
  h2s[2].textContent = "stock: " + data.stock;
  //Make button event listeners and set them to run -1 or +1 to the data.name, which is an order object key as well.
  let buttons = temp.childNodes[1].querySelector(".button");
  buttons.childNodes[0].addEventListener("click", (event) => {
    processButton(data.name, 1);
  });
  buttons.childNodes[1].addEventListener("click", (event) => {
    processButton(data.name, -1);
  });
  return temp;
};
const assembleItems = (data) => {
  for (i in data) {
    wares.push(new Item(data[i][0], data[i][1], data[i][2], data[i][3]));
  }
  //console.log(wares);
};
assembleItems([
  [
    "vanilla",
    5,
    50,
    "https://m.media-amazon.com/images/I/61NeYXb+wSL._AC_UF894,1000_QL80_.jpg",
  ],
  [
    "chocolate",
    6,
    63,
    "https://chocolatecoveredkatie.com/wp-content/uploads/2023/04/Chocolate-Frozen-Yogurt-Recipe-jpg.webp",
  ],
  [
    "coffee",
    7,
    72,
    "https://cooknourishbliss.com/wp-content/uploads/2013/04/Coffee-frozen-yogurt-with-mocha-ripple-web-1.jpg",
  ],
  [
    "strawberry",
    6,
    36,
    "https://images.squarespace-cdn.com/content/v1/5a5924598a02c7d4888aa208/1665437054138-7N5DSFPI14I860K4JVAF/Froyo+Earth+Google+Image+7+of+9.jpg",
  ],
]);
populate_items(wares, "items");
// make button able to call prompt
document.getElementById("promptButton").addEventListener("click", (event) => {
  const res = prompt("Input Froyo Order Here: ", "");
  processPrompt(res, 1);
});

// finally the rubric mandated prompt
let currentOrder = processPrompt(prompt("Input Froyo Order Here: ", ""));
//commented out all non-prompt related console.logs, but left in the UI related ones so you could see remnants of my cleaned up testing process. Hope you're having a good day / night!