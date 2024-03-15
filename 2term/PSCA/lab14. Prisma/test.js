const {PrismaClient}=require('@prisma/client');

const prisma=new PrismaClient();

postFaculties=async (data)=>{
    const {FACULTY, FACULTY_NAME, PULPIT_PULPIT_FACULTYToFACULTY}=data;
    return JSON.stringify(await prisma.FACULTY.create(
        {
            data:{
                FACULTY,
                FACULTY_NAME,
                PULPIT_PULPIT_FACULTYToFACULTY: {
                    createMany: {
                        data: PULPIT_PULPIT_FACULTYToFACULTY.map(mapData=>(
                            {
                                PULPIT: mapData.PULPIT,
                                PULPIT_NAME: mapData.PULPIT_NAME
                            }
                        ))
                    }
                }
            },
            include: {
                PULPIT_PULPIT_FACULTYToFACULTY: true
            }
        }
    ),null,2);
}

postPulpits=async data=>{
    const {PULPIT, PULPIT_NAME, FACULTY, FACULTY_NAME}=data;
    return JSON.stringify(await prisma.PULPIT.create(
        {
            data:{
                PULPIT,
                PULPIT_NAME,
                FACULTY_PULPIT_FACULTYToFACULTY:{
                    connectOrCreate:{
                        where:{
                            FACULTY
                        },
                        create: {
                            FACULTY,
                            FACULTY_NAME
                        }
                    }
                }
            },
            select:{
                PULPIT: true,
                PULPIT_NAME: true,
                FACULTY: true
            }
        }
    ))
}

postSubjects=async data=>{
    const{SUBJECT,SUBJECT_NAME,PULPIT}=data;
    return JSON.stringify(await prisma.SUBJECT.create({
        data:{
            SUBJECT,
            SUBJECT_NAME,
            PULPIT
        }
    }));
}


putTeachers=async data=>{
    const{TEACHER,TEACHER_NAME,GENDER,PULPIT}=data
    return JSON.stringify(await prisma.TEACHER.update({
        where:{
            TEACHER,
        },
        data:{
            TEACHER_NAME, GENDER, PULPIT
        }
    }));
}




fluentApi=async ()=>{
    return JSON.stringify(await prisma.PULPIT.findUnique({
        where:{
            PULPIT: 'ITD'
        }
    }).SUBJECT_SUBJECT_PULPITToPULPIT());
}

AuditoriumsSameCapacityAndType=async()=>{
    return JSON.stringify(await prisma.aUDITORIUM.groupBy({
        by:
            ["AUDITORIUM_TYPE", "AUDITORIUM_CAPACITY"]
        ,
        _count: {
            AUDITORIUM: true
        },
        having:{
            AUDITORIUM:{
                _count:{
                    gt: 0
                }
            }
        }
    }))
}
/*const fac={
    "FACULTY": 'MIL',
    "FACULTY_NAME":'Military',
    "PULPIT_PULPIT_FACULTYToFACULTY":[
        {
            "PULPIT": "MOT",
            "PULPIT_NAME":"Motorized Skirmishes"
        },
        {
            //yeah yeah i'm study here...
            "PULPIT": "REA",
            "PULPIT_NAME":"Rear support"
        }
    ]
}

postFaculties(fac).then(res=>console.log(res));*/

/*const pul={
    "PULPIT":"MS",
    "PULPIT_NAME":"Mobile systems",
    "FACULTY":"IT",
    "FACULTY_NAME":"Information technologies"
}*/

const pulp={
    "PULPIT":"WD",
    "PULPIT_NAME":"Web Design",
    "FACULTY":"IT",
    "FACULTY_NAME":"Information technologies"
}

const teacher={
    "TEACHER":"YYY",
    "TEACHER_NAME":"Yuya Yukoyama",
    "GENDER":"m",
    "PULPIT":"CIA&P"
}

//putTeachers(teacher).then(res=>console.log(res));

//setCapacityAud().then(res=>console.log(res));

//fluentApi().then(res=>console.log(res))

//AuditoriumsSameCapacityAndType().then(res=>console.log(res));


postPulpits(pulp).then(res=>console.log(res));