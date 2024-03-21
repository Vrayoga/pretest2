var express = require('express');
var router = express.Router();
const Model_kapal = require('../model/model_kapal.js');
const Model_pemilik = require('../model/model_pemilik.js');
const Model_dpi = require('../model/model_dpi.js');
const Model_Alat = require('../model/model_alat.js');

router.get('/',async function(req,res,next){
    let rows = await Model_kapal.getAll();
    res.render('kapal/index',{
        data:rows
    });
})

router.get('/create', async function(req, res, next){
    let rows = await Model_pemilik.getAll();
    let rows2 = await Model_dpi.getAll();
    let rows3 = await Model_Alat.getAll();
    res.render('kapal/create',{
        nama_kapal: '',
        id_pemilik: '',
        id_dpi: '',
        id_alat: '',
        data_pemilik:rows,
        data_dpi:rows2,
        data_alat:rows3,
    });
});

router.post('/store',async function(req,res,next){
    try{
        let {nama_kapal,id_pemilik,id_dpi,id_alat} = req.body;
        let Data ={
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat,
        }
        await Model_kapal.Store(Data);
        req.flash('succes','Berhasil menyimpan data yeay');
        res.redirect('/kapal')
    }catch{
        req.flash('error','gagal menyimpan data');
        res.redirect('/kapal')
    }
})
 


router.post('/update/(:id)',async function(req,res,next){
    try{
        let id = req.params.id;
        let {nama_kapal,id_pemilik,id_dpi,id_alat} = req.body;
        let Data = {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat,
        }
        await Model_kapal.Update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/kapal')
    }catch{
        req.flash('error','gagal menyimapan data');
        res.redirect('/kapal')
    }
})


router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    await Model_kapal.Delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/kapal')
})

module.exports = router;