module.exports=(sequelize,type)=>{
    const Loan=sequelize.define('Loans',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario:{
            type:type.INTEGER,
            allownull:false
        },
        id_libro:{
            type:type.INTEGER,
            allownull:false
        }
    },{
        timestamps:true
    })
    return Loan;
}