const express = require("express");
const validator = require("validator");
const app = express();

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/greetings/:username", (req, res) => {
  res.send(`<h1>Hello, ${req.params.username}!</h1>`);
});

app.get("/roll/:number", (req, res) => {
  const num = req.params.number;
  if (validator.isNumeric(num) !== true) {
    res.send(`<h1>You must specify a number.</h1>`);
  } else res.send(`<h1>You rolled a ${Math.floor(Math.random() * num)}!`);
});

app.get("/collectibles/:index", (req, res) => {
  const index = req.params.index;
  if (index < 0 || index > collectibles.length - 1) {
    res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
  } else {
    res.send(`<h1>So, you want the ${collectibles[index].name}?<h1>
    <h1>For $${collectibles[index].price} it can be yours!</h1>`);
  }
});

app.get("/hello", (req, res) => {
  res.send(
    `Hello there, ${req.query.name}! I hear you are a ${req.query.age} years old!`
  );
});

app.get("/shoes", (req, res) => {
  const minPrice = req.query["min-price"];
  const maxPrice = req.query["max-price"];
  const type = req.query.type;
  shoesArray = shoes;
  for (let i = 0; i < shoesArray.length; i++) {
    if (
      (shoesArray[i].price < minPrice && minPrice !== undefined) ||
      (shoesArray[i].price > maxPrice && maxPrice !== undefined) ||
      (shoesArray[i].type !== type && type !== undefined)
    ) {
      shoesArray = shoesArray.toSpliced(i, 1);
      i -= 1;
    }
  }
  for (i = 0; i < shoesArray.length; i++) {
    res.write(
      `${shoesArray[i].name} ${shoesArray[i].price} ${shoesArray[i].type}\n`
    );
  }
  res.end();
});
