const {Sequelize, Op, DataTypes}=require('sequelize');

const sequelize=new Sequelize('PAF','Admin','123',{
    host:'localhost',
    dialect:'mssql',
    define: { 
        timestamps: false 
    },
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    }
})

const AuditoriumType=sequelize.define(
    'AUDITORIUM_TYPE',
    {
        AUDITORIUM_TYPE:{
            type: DataTypes.CHAR(10),
            allowNull: false,
            primaryKey: true
        },
        AUDITORIUM_TYPENAME:{
            type: DataTypes.STRING(30)
        }
    },
    {
        sequelize,
        tableName: "AUDITORIUM_TYPE"
    }
);

const Auditorium=sequelize.define(
    'AUDITORIUM',
    {
        AUDITORIUM:{
            type: DataTypes.CHAR(20),
            allowNull: false,
            primaryKey: true
        },
        AUDITORIUM_CAPACITY:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        AUDITORIUM_NAME:{
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "AUDITORIUM",
        scopes:{
            capacityBetween10And60: {
                where: {
                    AUDITORIUM_CAPACITY: {
                        [Op.between]: [10, 60]
                    }
                }
            }
        }
    }
);

AuditoriumType.hasMany(
    Auditorium,
    {
        foreignKey:"AUDITORIUM_TYPE",
        sourceKey: "AUDITORIUM_TYPE"
    }
);

const Faculty=sequelize.define(
    "FACULTY",
    {
        FACULTY:{
            type: DataTypes.CHAR(10),
            allowNull: false,
            primaryKey: true
        },
        FACULTY_NAME:{
            type: DataTypes.STRING(50),
        }
    },
    {
        sequelize,
        tableName:"FACULTY",
        hooks: {
            beforeCreate: (faculty, options) => {
                console.log('Before creating: ', faculty.dataValues);
            },
            afterCreate: (faculty, options) => {
                console.log('After creating: ', faculty.dataValues);
            },
            // Хук beforeDestroy в Sequelize срабатывает перед удалением экземпляра модели из базы данных. Однако, важно отметить, что 
            // хук beforeDestroy срабатывает только при вызове метода destroy на экземпляре модели, а не на уровне класса.
            // В вашем случае, вы вызываете метод destroy на уровне класса Faculty, поэтому хук beforeDestroy не срабатывает. 
            // Если вы хотите, чтобы хук beforeDestroy срабатывал и в этом случае, вы должны использовать хук на уровне класса beforeBulkDestroy.
            beforeDestroy: (faculty, options) => {
                console.log('Before destroying: ', faculty.dataValues);
            }
        }
    }
);

const Pulpit=sequelize.define(
    "PULPIT",
    {
        PULPIT:{
            type: DataTypes.CHAR(20),
            allowNull: false,
            primaryKey: true
        },
        PULPIT_NAME:{
            type: DataTypes.STRING(100)
        }
    },
    {
        sequelize,
        tableName:"PULPIT"
    }
);

Faculty.hasMany(
    Pulpit,
    {
        foreignKey:'FACULTY',
        sourceKey:'FACULTY'
    }
)

const Subject=sequelize.define(
    "SUBJECT",
    {
        SUBJECT:{
            type: DataTypes.CHAR(20),
            allowNull: false,
            primaryKey: true
        },
        SUBJECT_NAME:{
            type: DataTypes.STRING(100)
        }
    },
    {
        sequelize,
        tableName:"SUBJECT"
    }
);

const Teacher=sequelize.define(
    "TEACHER",
    {
        TEACHER:{
            type: DataTypes.CHAR(20),
            allowNull: false,
            primaryKey: true
        },
        TEACHER_NAME:{
            type: DataTypes.STRING(100)
        }
    },
    {
        sequelize,
        tableName:"TEACHER"
    }
);

Pulpit.hasMany(
    Subject,
    {
        foreignKey:'PULPIT',
        sourceKey:'PULPIT'
    }
);

Pulpit.hasMany(Teacher, {
    foreignKey: 'PULPIT',
    sourceKey: 'PULPIT'
});

module.exports={Faculty, Pulpit, Teacher, Subject, AuditoriumType, Auditorium};