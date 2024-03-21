var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");

const Model_Pemilik = require('../model/model_pemilik');


router.get('/', async function(req, res, next){
    let rows = await Model_Pemilik.getAll();
    res.render ('pemilik/index',{
        data : rows
    })
})
 
router.get("/create", (req, res) => {
    res.render("pemilik/create");
  });
  
router.post("/store", async (req, res, next) => {
    try {
      const pemilikData = req.body;
      await Model_Pemilik.Store(pemilikData);
      req.flash("success", "Berhasil menyimpan data Pemilik");
      res.redirect("/pemilik");
    } catch (error) {
      console.log(error); 
      req.flash("error", "Gagal menyimpan data Pemilik");
      res.redirect("/pemilik");
    }
  });
  


  router.get("/edit/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      let rows = await Model_Pemilik.getId(id);
      res.render("pemilik/edit", {
        id: id,
        nama_pemilik: rows[0].nama_pemilik,
        alamat: rows[0].alamat,
        nomer_hp: rows[0].nomer_hp,
      });
    } catch (error) {
      next(error);
    }
  });
  

  router.post("/update/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const pemilikData = req.body;
      await Model_Pemilik.Update(id, pemilikData);
      req.flash("success", "Berhasil mengupdate data Pemilik");
      res.redirect("/pemilik");
    } catch (error) {
      req.flash("error", "Gagal menyimpan data Pemilik");
      res.redirect("/pemilik");
    }
  });
  


  router.get("/delete/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      await Model_Pemilik.Delete(id);
      req.flash("success", "Berhasil menghapus data Pemilik");
      res.redirect("/pemilik");
    } catch (error) {
      req.flash("error", "Gagal menghapus data Pemilik");
      res.redirect("/pemilik");
    }
  });
  


module.exports = router;