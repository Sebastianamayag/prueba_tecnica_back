const Sequelize=require('sequelize');
//import de los modelos
const User_Model=require('../models/usersModel');
const Book_Model=require('../models/bookModel');
const Loan_Model=require('../models/loansModel');
//configuracion de la url de la bd
const DBURL ='mysql://root:@localhost:3306/prueba';
//pasar los parametros de configuracion a sequelize
const sequelize=new Sequelize(DBURL);
//creando la tablas tablas
const Usuario=User_Model(sequelize,Sequelize);
const Book=Book_Model(sequelize,Sequelize);
const Loan=Loan_Model(sequelize,Sequelize);
//sincronizando squelize
sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })
module.exports={
    Usuario,
    Book,
    Loan
}
