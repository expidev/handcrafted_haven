const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");

mongoose.connect("mongodb://localhost:27017/handcrafted", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isSeller: Boolean,
}));

const Product = mongoose.model("Product", new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  rating: Number,
  artisanId: mongoose.Types.ObjectId,
}));

const Review = mongoose.model("Review", new mongoose.Schema({
  productId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  rating: Number,
  comment: String,
}));

const Cart = mongoose.model("Cart", new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  items: [{ productId: mongoose.Types.ObjectId, quantity: Number }],
}));

function loadCSV(filePath) {
  return new Promise((resolve) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
}

async function importData() {
  console.log("Importing users...");
  const users = await loadCSV("./data/users.csv");
  await User.insertMany(
    users.map((u) => ({
        ...u,
        isSeller: u.isSeller === "True" || u.isSeller === true,
    }))
    );

  const allUsers = await User.find();

  console.log("Importing products...");
  const products = await loadCSV("./data/products.csv");

  const mappedProducts = products.map((p) => {
    const artisan = allUsers.find((u) => u.email === p.artisanEmail);
    return {
      ...p,
      price: parseFloat(p.price),
      rating: parseFloat(p.rating),
      artisanId: artisan ? artisan._id : null,
    };
  });

  await Product.insertMany(mappedProducts);

  const allProducts = await Product.find();

  console.log("Importing reviews...");
  const reviews = await loadCSV("./data/reviews.csv");

  const mappedReviews = reviews.map((r) => {
    const user = allUsers.find((u) => u.email === r.userEmail);
    const product = allProducts.find((p) => p.title === r.productTitle);
    return {
      productId: product?._id,
      userId: user?._id,
      rating: parseInt(r.rating),
      comment: r.comment,
    };
  });

  await Review.insertMany(mappedReviews);

  console.log("Importing carts...");
  const carts = await loadCSV("./data/cart.csv");

  const mappedCarts = carts.map((c) => {
    const user = allUsers.find((u) => u.email === c.userEmail);
    const itemsRaw = JSON.parse(c.items.replace(/'/g, '"'));
    const items = itemsRaw.map((item) => {
      const product = allProducts.find((p) => p.title === item.productTitle);
      return {
        productId: product?._id,
        quantity: parseInt(item.quantity),
      };
    });
    return {
      userId: user?._id,
      items,
    };
  });

  await Cart.insertMany(mappedCarts);

  console.log("All data imported successfully.");
  mongoose.disconnect();
}

importData().catch((err) => {
  console.error("Import failed:", err);
  mongoose.disconnect();
});
