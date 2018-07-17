const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _noticia;

const getAll = (req, res) => {
    _noticia.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'noticias', res));
};

const getById = (req, res) => {
    const id = req.params.id;

    if(id.toString().length!=24){
        res.status(400);
        res.json({err:"Identificador inválido"});
    }
    else{
    _noticia.find({_id:id})
        .sort({})
        .exec(handler.handleMany.bind(null, 'noticia', res));
    }
};

const deleteById = (req, res) => {
    
      const id = req.params.id;
    //const {id} = req.params;

    _noticia.remove({_id:id}, (err,data)=>{
        if(err){
            res.status(400);
            res.json({msg:"No se pudo realizar la operación, intente nuevamente"});
        }else{
            res.status(200);
            res.json({msg:"La noticia se eliminó correctamente"});
        }
    });

   
};

const createNoticia = (req, res) => {
    const noticia = req.body;
    
    _noticia.create(noticia)
    .then(
        (data) =>{
            res.status(200);
            res.json({msg:"Noticia creada correctamente",data:data});
        }
    )
    .catch(
        (err)=>{
            rest.status(400);
            rest.json({msg:"Algo va mal!!!",data:err});
        }
    )
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = {_id:id};
    
    _user.findOneAndUpdate(query, newData, (err,data)=>{
        if(err){
            res.status(400);
            res.json({msg:"No se pudo realizar la operación, intente nuevamente"});
        }else{
            res.status(200);
            res.json({msg:"La noticia se eliminó correctamente"});
        }
    });

};

const getByAutor = (req, res) => {
    const autor = req.params.autor;
    const titulo = req.params.titulo;

    //const {email,password} = req.params;

    _user.find({autor:autor,titulo:titulo})
        .sort({})
        .exec((error,doc)=>{
            if(error){
                res.status(200);
                res.json({Error:"Noticia Invalida"})
            }
            else{
                if(doc.length==0){
                    res.status(400);
                    res.json({Error:"No se econtro la noticia"})
                }
                else{
                    res.status(200);
                    res.json({Noticia:"Noticia Valida",doc})
                }
            }
        });
    
};

module.exports = (Noticia) => {
    _noticia = Noticia;
    return ({
        getAll,
        getById,
        getByAutor,
        deleteById,
        createNoticia,
        updateById
    });
}