module.exports=(sequelize,type)=>{
    const Libro=sequelize.define('Libros',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type:type.STRING,
            allownull:false
        },
        cantidad:{
            type:type.INTEGER,
            allownull:false
        }
    },{
        timestamps:true
    })
    return Libro;
}