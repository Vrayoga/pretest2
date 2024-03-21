const connection = require('../config/database');

class Model_kapal{

    static async getAll() {
        return new Promise((resolve,reject) => {
            connection.query(`SELECT id_identitas_kapal, nama_kapal, pemilik.nama_pemilik, dpi.nama_dpi, alat_tangkap.nama_alat FROM kapal JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik JOIN dpi ON kapal.id_dpi = dpi.id_dpi JOIN alat_tangkap ON kapal.id_alat = alat_tangkap.id_alat`, (err,rows) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static async Store(Data) {
        return new Promise((resolve,reject) => {
            connection.query('insert into kapal set ?',Data,function (err,result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
    static async getId(id) {
        return new Promise((resolve,reject) => {
            connection.query('select *from kapal where id_identitas_kapal = ?' ,id, (err,rows) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static async Update(id, Data) {
        return new Promise((resolve,reject) => {
            connection.query('update kapal set ? where id_identitas_kapal ='+id,Data,function (err,result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
    static async Delete(id) {
        return new Promise((resolve,reject) => {
            connection.query('delete from kapal where id_identitas_kapal ='+id,function (err,result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }


}



module.exports = Model_kapal;