var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Assigment',function (req , res,next ){
  Anh.find({},function (err,data){
    res.render('Assigment',{title : 'Assigment', data : data});
  })
})
var dbb = "mongodb+srv://tranthengoc:02072002Ngoc@cluster0.nkn24.mongodb.net/DuLieuData?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.connect(dbb).catch(error => {
  console.log("lỗi xảy ra " + error)
})
var AnhSchema = new mongoose.Schema({
  Anh:'string' ,
  noiDung : 'string',
  ngayThang : 'string',
  linkAnh : 'string'
});
var Anh = mongoose.model('anhne' , AnhSchema);
router.post('/ThemAnh' , function (req , res){

  var anh = req.body.Anh;
  var noiDung = req.body.noiDung;
  var ngayThang = req.body.ngayThang;
  var linkAnh = req.body.linkAnh;


  const anhne = new Anh({
     Anh : anh,
    noiDung: noiDung,
    ngayThang: ngayThang,
     linkAnh: linkAnh
  });
  anhne.save(function (error){
    var mess;
    if(error == null){
      mess = "Thêm thành công"
    }else {
      mess = error
    }
  })

  console.log(anh + noiDung + ngayThang + linkAnh);

  res.render('Assigment');
});
router.get('/DanhSach' , function (req , res, next){
  Anh.find({},function (err , data){
    res.render('DanhSach',{data : data});
  });

});
router.post('/Delete',function (req , res ){
    let ObejectID = require('mongodb').ObjectId;
    var id = req.body.id;
    Anh.deleteOne({_id :  ObejectID(id)}, function (err){
      if(err){
        console.log("lỗi ");
      }else {
        console.log("Xóa thành công")
      }
    })
})
router.get('/Update', function (req , res, next){
  Anh.find({},function (err, data){
    res.render('Update',{title : "Update" , data : data});
  });



});
router.post('/Update' , function (req , res ){
  let ObejectID = require('mongodb').ObjectId;
  var id = req.body.id;
  var anh = req.body.Anh;
  var noiDung = req.body.noiDung;
  var ngayThang = req.body.ngayThang;
  var linkAnh = req.body.linkAnh;

  Anh.updateOne({_id : ObejectID(id)}, {Anh: anh, noiDung : noiDung, ngayThang: ngayThang , linkAnh : linkAnh}, function (err){
    if(err) throw err;
    console.log('Sua thanh cong');
  })
})


module.exports = router;
