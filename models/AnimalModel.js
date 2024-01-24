import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Animal = db.define('animals', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
   
    image: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    status_adoption: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pengadopsi: {
        type: DataTypes.STRING,
    },
    mails: {
        type: DataTypes.STRING,
    }
    
}, {
    freezeTableName: true
});

export default Animal;
(async () => {
    try {
        await db.sync();
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();