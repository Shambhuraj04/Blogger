import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;
let fileDir = [];

const directoryPath = "./public/blogs";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/list", (req, res) => {
  // Read the contents of the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).send("Error reading directory");
    }

    // Create an array to store the file names
    const fileDir = [];

    // Push each file name into the array
    files.forEach((file) => {
      fileDir.push(file);
    });

    // Render the 'list.ejs' template and pass the array of files
    res.render("list.ejs", { files: fileDir });
  });
});

app.post("/submit", (req, res) => {
  let blogIn = req.body["blog"];
  let title = req.body["blog-title"];
  // res.render("blog.ejs", { blog: blogIn });

  fs.writeFile(`./public/blogs/${title}.txt`, blogIn, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to save blog content.");
    } else {
      console.log("File 'test.txt' written successfully.");
      res.status(200).redirect("/list");
    }
  });
});

app.delete("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
