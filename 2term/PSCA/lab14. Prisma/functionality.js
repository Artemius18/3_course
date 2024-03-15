const {PrismaClient}=require('@prisma/client');

const prisma=new PrismaClient();

class PrismaFunctional{
//=====================GET=======================//
    getTeachers=async res=>{
        try{
            res.json(await prisma.TEACHER.findMany());
        }
        catch(e){
            console.log(e.message);
        }
    }
    getAuditoriums=async res=>{
        try{
            res.json(await prisma.AUDITORIUM.findMany());
        }
        catch(e){
            console.log(e.message);
        }
    }
    getSubjects=async res=>{
        try{
            res.json(await prisma.SUBJECT.findMany());
        }
        catch(e){
            console.log(e.message);
        }
    }
    getFaculties=async res=>{
        try{
            res.json(await prisma.FACULTY.findMany());
        }
        catch(e){
            console.log(e.message);
        }
    }
    getPulpits=async res=>{
        try{
            res.json(await prisma.PULPIT.findMany());
        }
        catch(e){
            console.log(e.message);
        }
    }
    getAuditoriumTypes=async res=>{
        try{
            res.json(await prisma.AUDITORIUM_TYPE.findMany());
        }
        catch(e){
            console.log(e.message);
        }
    }
    getAudTypesAud=async (res,xyz)=>{
        res.json(await prisma.AUDITORIUM_TYPE.findMany({
            where: {
                AUDITORIUM_TYPE: xyz
            },
            select:{
                AUDITORIUM_TYPE: true,
                //don't even ask. Prisma generated it by itself
                AUDITORIUM_AUDITORIUM_AUDITORIUM_TYPEToAUDITORIUM_TYPE:
                {
                    select:{
                        AUDITORIUM: true
                    }
                }
            }
        }));
    }
    
    getFacSubjPulp=async(res,xyz)=>{
        res.json(await prisma.FACULTY.findMany({
            where:{
                FACULTY: xyz
            },
            select:{
                FACULTY: true,
                PULPIT_PULPIT_FACULTYToFACULTY:{
                    select:{
                        PULPIT: true,
                        SUBJECT_SUBJECT_PULPITToPULPIT:{
                            select:{
                                SUBJECT: true,
                                SUBJECT_NAME: true
                            }
                        }
                    }
                }
            }
        }))
    }
    
    getCompAud1=async res=>{
        res.json(await prisma.AUDITORIUM.findMany({
            where:{
                    AUDITORIUM_TYPE: "LB-C",
                    AUDITORIUM_NAME: {
                        endsWith: '-1'
                    }
            }
        }))
    }
    
    getPulpitVladimir=async res=>{
        res.json(await prisma.PULPIT.findMany({
            where:{
                TEACHER_TEACHER_PULPITToPULPIT:{
                    some:{
                        TEACHER_NAME:{
                            contains: 'Vladimir'
                        }
                    }
                }
            },
            select:{
                PULPIT: true,
                PULPIT_NAME: true,
                TEACHER_TEACHER_PULPITToPULPIT:{
                    select:{
                        TEACHER_NAME: true
                    }
                }
            }
        }))
    }
    
    getPulpitWithoutTeachers=async res=>{
        res.json(await prisma.PULPIT.findMany({
            where:{
                TEACHER_TEACHER_PULPITToPULPIT:{
                    none:{}
                }
            }
        }));
    }
    AuditoriumsSameCapacityAndType=async res=>{
        return res.status(201).json(await prisma.AUDITORIUM.groupBy({
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
//=====================POST=======================//
    postFaculties=async (res,data)=>{
        const {FACULTY, FACULTY_NAME, PULPIT_PULPIT_FACULTYToFACULTY}=data;
        res.status(201).json(await res.FACULTY.create(
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
        ))
    }
    postPulpits=async(res, data)=>{
        const {PULPIT, PULPIT_NAME, FACULTY, FACULTY_NAME}=data;
        return res.status(201).json(await prisma.PULPIT.create(
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
    postSubjects=async (res,data)=>{
        const{SUBJECT,SUBJECT_NAME,PULPIT}=data;
        return res.status(201).json(await prisma.SUBJECT.create({
            data:{
                SUBJECT,
                SUBJECT_NAME,
                PULPIT
            }
        }));
    }
    postTeachers=async(res,data)=>{
        const{TEACHER,TEACHER_NAME,GENDER,PULPIT}=data
        return res.status(201).json(await prisma.TEACHER.create({
            data:{
                TEACHER,
                TEACHER_NAME,
                GENDER,
                PULPIT
            }
        }));
    }
    postAuditorium=async(res,data)=>{
        const{AUDITORIUM,AUDITORIUM_TYPE,AUDITORIUM_CAPACITY,AUDITORIUM_NAME}=data
        return res.status(201).json(await prisma.AUDITORIUM.create({
            data:{
                AUDITORIUM,
                AUDITORIUM_TYPE,
                AUDITORIUM_CAPACITY,
                AUDITORIUM_NAME
            }
        }))
    }
    postAuditoriumType=async(res,data)=>{
        const{AUDITORIUM_TYPE,AUDITORIUM_TYPENAME}=data
        return res.status(201).json(await prisma.AUDITORIUM_TYPE.create({
            data:{
                AUDITORIUM_TYPE,
                AUDITORIUM_TYPENAME
            }
        }))
    }
    //=========================PUT==================================
    putTeachers=async(res,data)=>{
        const{TEACHER,TEACHER_NAME,GENDER,PULPIT}=data
        return res.status(201).json(await prisma.TEACHER.update({
            where:{
                TEACHER,
            },
            data:{
                TEACHER_NAME, GENDER, PULPIT
            }
        }),null,2);
    }
    putFaculty=async(res,data)=>{
        const{FACULTY,FACULTY_NAME}=data;
        return res.status(201).json(await prisma.FACULTY.update({
            where:{
                FACULTY
            },
            data:{
                FACULTY_NAME
            }
        }),null,2);
    }
    putSubjects=async(res,data)=>{
        const{SUBJECT, SUBJECT_NAME, PULPIT}=data;
        return res.status(201).json(await prisma.SUBJECT.update({
            where:{
                SUBJECT
            },
            data:{
                SUBJECT_NAME,
                PULPIT
            }
        }),null,2)
    }
    putPulpits=async(res,data)=>{
        const{PULPIT,PULPIT_NAME,FACULTY}=data;
        return res.status(201).json(await prisma.PULPIT.update({
            where:{
                PULPIT
            },
            data:{
                PULPIT_NAME,
                FACULTY
            }
        }), null, 2)
    }
    putAuditoriums=async(res,data)=>{
        const{AUDITORIUM,AUDITORIUM_TYPE,AUDITORIUM_CAPACITY,AUDITORIUM_NAME}=data
        return res.status(201).json(await prisma.AUDITORIUM.update({
            where:{
                AUDITORIUM
            },
            data:{
                AUDITORIUM_TYPE,
                AUDITORIUM_CAPACITY,
                AUDITORIUM_NAME
            }
        }))
    }
    putAuditoriumTypes=async(res,data)=>{
        const{AUDITORIUM_TYPE,AUDITORIUM_TYPENAME}=data
        return res.status(201).json(await prisma.AUDITORIUM_TYPE.update({
            where:{
                AUDITORIUM_TYPE
            },
            data:{
                AUDITORIUM_TYPENAME
            }
        }))
    }
//===============================DELETE======================================
    deleteAuditoriumType=async(res,xyz)=>{
        return res.status(201).json(await prisma.AUDITORIUM_TYPE.delete({
            where:{
                AUDITORIUM_TYPE: xyz
            }
        }))
    }
    deleteAuditorium=async(res,xyz)=>{
        return res.status(201).json(await prisma.AUDITORIUM.delete({
            where:{
                AUDITORIUM: xyz
            }
        }))
    }
    deleteSubject=async(res,xyz)=>{
        return res.status(201).json(await prisma.SUBJECT.delete({
            where:{
                SUBJECT: xyz
            }
        }))
    }
    deleteTeacher=async(res,xyz)=>{
        return res.status(201).json(await prisma.TEACHER.delete({
            where:{
                TEACHER: xyz
            }
        }))
    }
    deletePulpit=async(res,xyz)=>{
        return res.status(201).json(await prisma.PULPIT.delete({
            where:{
                PULPIT: xyz
            }
        }))
    }
    deleteFaculty=async(res,xyz)=>{
        return res.status(201).json(await prisma.FACULTY.delete({
            where:{
                FACULTY: xyz
            }
        }))
    }
//=================TRANSACTION=======================
    setCapacityAud=async ()=>{
        await prisma.$transaction(async prisma=>{
            await prisma.aUDITORIUM.updateMany({
                data:{
                    AUDITORIUM_CAPACITY: {
                        increment: 100
                    }
                }
            })
            throw new Error('Transaction rollbacked!');
        });
    }
//=================FLUENT API========================
    fluentApi=async (res, xyz)=>{
        return res.status(201).json(await prisma.PULPIT.findUnique({
            where:{
                PULPIT: xyz
            }
        }).SUBJECT_SUBJECT_PULPITToPULPIT());
    }
}

module.exports=PrismaFunctional;