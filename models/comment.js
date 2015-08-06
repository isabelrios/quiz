//Definicion del modelo de Comment con validación

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Comment', 
		{ texto: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falata Comentario"}}
		  },
		  publicado: {
		  	type: DataTypes.BOOLEAN,
		  	defaultValue: false
		  }

		//},

		//{ tableName: 'Comment'});
		}
	);
}