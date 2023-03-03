const express = require("express");
const superhero_model= require("../models/superhero.model");
const routes = express.Router()

/* Crear nuevo registro mongoose method: save()
 http://localhost:5000 */

routes.post("/",(req,res) => {
    const new_superhero = superhero_model(req.body);
    new_superhero
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

/* listar todos los registros de la bd */
routes.get("/",(req, res)=>{
    superhero_model
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}));
});

/* Consultar un usuario de forma especifica por http: get
    mongoose method: findById({_id:?})*/
routes.get("/:superheroId",(req,res)=>{
    const {superheroId} = req.params;
    superhero_model
    .findById({_id: superheroId})
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}));
});

/* Modificar uno de los superheroes existintes http: put
    mongoose method: updateOne */

routes.put("/:superheroId",(req,res)=>{
    const {superheroId} = req.params.superheroId;
    const query = {_id: superheroId};
    const update = {$set:req.body};
    superhero_model
        .updateOne(query, update)
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

/* Eliminar uno de los supereroes existentes
http DELEETE
mongoose method: Delete */

routes.delete("/:superheroId",(req,res)=>{
    const {superheroId} = req.params;
    superhero_model
        .deleteOne({_id: superheroId})
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

/* Eliminar todas las coincidencias realizando la busqueda por una 
propiedad especifica
http DELEETE
mongoose method: Delete */

routes.delete("/",(req,res)=>{
    const query= {superhero: {$regex:"Batman"}};
    superhero_model
        .deleteMany(query)
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});
    

/* Consultar por una propiedad los registros que sean diferentes
http: GET
mongoose method:distinct */

routes.get("/superpowers-list/:property",(req,res)=>{
    const property= req.params.property;
    superhero_model
        .distinct(property)
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});
/* Consultar por una propiedad los ultomos 5 registros que sean diferentes
http: GET
mongoose method:distinct & slice con paramertro linmit*/

routes.get("/:property/:limit",(req,res)=>{
    const property= req.params.property;
    const limit= parseInt(req.params.limit);
    superhero_model
        .distinct(property)
        .then((data) => res.json(data.slice(0,limit)))
        .catch((err) => res.json({message: err}));
});
module.exports= routes;
