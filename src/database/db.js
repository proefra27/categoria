const mysql = require('promise-mysql');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'siveo'
});

const getConexion=()=>{
    return conexion;
}
module.exports ={ 
  getConexion
}