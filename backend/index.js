import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool(process.env.DATABASE_URL);
db.end();

app.get("/", (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/", (req, res) => {
  if (req.body.username) {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(409).json("Username and/or email is already taken!");

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
  } else {
    const q =
      "SELECT * FROM users WHERE email = ? AND password = ? AND blocked = 0";

    db.query(q, [req.body.email, req.body.password], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) {
        return res.status(400).json("Wrong username/password or blocked user");
      }

      const q = "UPDATE users SET lastLogin = ? WHERE email = ?";
      db.query(q, [req.body.lastLogin, req.body.email], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    });
  }
});

app.put("/:id", (req, res) => {
  const usersId = req.params.id;
  const ids = usersId.split(",");
  const q = "UPDATE users SET blocked= ? WHERE id IN (?)";
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

app.listen(8800, () => {});
