module.exports=(sequelize,type)=>{
    const Usuario=sequelize.define('Usuarios',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type:type.STRING,
            allownull:false
        },
        apellidos:{
            type:type.STRING,
            allownull:false
        },
        email:{
            type:type.STRING,
            allownull:false
        },
        contra:{
            type:type.STRING,
            allownull:false
        }
    },{
        timestamps:true
    })
    return Usuario;
}