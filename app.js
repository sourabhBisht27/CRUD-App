require("./database");
const Product = require("./models/Product");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT | 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res, next) => {
  return res.redirect("/products");
});
app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price"],
      raw: true,
    });
    if (products.length <= 0) {
      return res.render("pages/error", {
        title: "Error",
        showAdd: true,
        error: `No Products Found`,
      });
    }
    return res.render("pages/index", {
      title: "Products",
      products,
      showAdd: true,

 

    });
  } catch (error) {
    console.log(error);
    return res.render("pages/error", {
      title: "Error",
      error: "Some error occured while fetching products",
      showAdd: false,
    });
  }
});
app.get("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.redirect("/products");
  }
  try {
    const product = await Product.findByPk(id, { raw: true });
    return res.render("pages/edit", {
      title: `Edit Product ${product.name}`,
      product,
      showAdd: false
    });
  } catch (error) {
    return res.redirect("/products");
  }
});

app.get("/add", (req, res, next) => {
  return res.render("pages/add", {
    title: `Add Product`,
    showAdd: false,
  });
});
app.put("/edit", async (req, res, next) => {
  try {
    const { id, name, description, price } = req.body;
    console.log(req.body);
    if (!id) {
      return res.status(400).json({ status: false });
    }
    await Product.update({ name, description, price }, { where: { id } });


    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false, message: "Error" });
  }
});
app.post("/add", async (req, res, next) => {
  try {
    const product = await Product.create({ ...req.body });

    return res.status(200).json({ status: true, product });
  } catch (error) {
    return res.status(400).json({ status: false, message: "Error" });
  }
});
app.delete("/delete", async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ status: false });
  }
  try {
    if (!(await Product.findByPk(id))) {
      return res.status(400).json({ status: false });
    }
    await Product.destroy({ where: { id } });
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(400).json({ status: false });
  }
});
app.use("*", (req, res) => {
  return res.render("pages/error", {
    title: "Error",
    showAdd: false,
    error: `${req.originalUrl} doesn't exist on server`,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("The server is running at port");
});
