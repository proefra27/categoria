const { createPool } = require('mysql2/promise');

const conexion = createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'siveo',
  port:process.env.MYSQLPORT,
  insecureAuth:true
});

const getConexion=()=>{
    return conexion;
}
module.exports ={ 
  getConexion
}