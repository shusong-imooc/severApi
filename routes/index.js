var express = require('express');
var router = express.Router();
const db=require('../utils/dbmysql')

/* GET home page. */
router.get('/', function(req, res, next) {
  let sql=`select * from humanbook where id=?`
  let id='366294be-e6e1-11e7-adb6-00ff446e1c08'
  db.query(sql,[id]).then(rows=>{
    console.log(rows);
    res.json({success:true,data:rows})
  })
});

module.exports = router;
