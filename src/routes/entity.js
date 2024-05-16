import express from "express";
// import {
//   createEntity,
//   getEntity,
//   getAllEntities,
//   updateEntity,
//   deleteEntity,
// } from "../controllers/entity";

import * as db from '../connectors/db.js';

const router = express.Router();

// // API Check
router.use("/healthcheck", (req, res) => {
  res.send(`APIs are running smoothly`);
});

router.get('/setup', async (req, res) => {
    try {
        await db.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
        res.status(200).send({ message: "Successfully created table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {
    const { name, location } = req.body
    try {
        await db.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, location])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.get('/:id', async (req, res, next) => {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])
    res.send(result.rows[0])
  })
  



// // make it post later on
// router.post("/create", createForm);

// // save form
// router.post("/:id", saveResponse);

// // get form
// router.get("/:form_id", getForm);

// // get all forms
// router.get("/all/data", getAllForms);

// router.get("/add/sheets", addValuesToSpreadSheet);

export default router;
