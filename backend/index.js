import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "herbivore88",
  database: "login_db",
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/", (req, res) => {
  const q =
    "INSERT INTO users (`id`,`username`,`email`,`password`,`lastLogin`,`registeredAt`,`blocked`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.lastLogin,
    req.body.registeredAt,
    req.body.blocked,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/:id", (req, res) => {
  const usersId = req.params.id;
  const ids = usersId.split(",");
  const q = "UPDATE users SET `blocked`= ? WHERE id IN (?)";
  const value = [req.body.blocked];

  db.query(q, [value, ids], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/:id", (req, res) => {
  const usersId = req.params.id;
  const ids = usersId.split(",");
  const q = "DELETE FROM users WHERE id IN (?)";

  db.query(q, [ids], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("this is backend speaking!");
});
