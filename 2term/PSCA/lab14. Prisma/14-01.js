const express=require('express');

const PrismaFunctional=require('./functionality');

const prefix='/api'
const func=new PrismaFunctional();
const app=express();

app.use(express.json());
app.use(express.static('static'))

app.get("/",(req,res)=>{
    res.sendFile("static/index.html");
});

app.get(prefix+"/faculties",(req,res)=>func.getFaculties(res))
.get(prefix+"/subjects",(req,res)=>func.getSubjects(res))
.get(prefix+"/teachers",(req,res)=>func.getTeachers(res))
.get(prefix+"/pulpits",(req,res)=>func.getPulpits(res))
.get(prefix+"/auditoriums",(req,res)=>func.getAuditoriums(res))
.get(prefix+"/auditoriumtypes", (req,res)=>func.getAuditoriumTypes(res))
.get(prefix+"/faculties/:xyz/subjects",(req,res)=>func.getFacSubjPulp(res,req.params["xyz"]))
.get(prefix+"/auditoriumtypes/:xyz/auditoriums",(req,res)=>func.getAudTypesAud(res, req.params["xyz"]))
.get(prefix+"/auditoriumWithComp1",(req,res)=>func.getCompAud1(res))
.get(prefix+"/pulpitsWithoutTeachers",(req,res)=>func.getPulpitWithoutTeachers(res))
.get(prefix+"/pulpitsWithVladimir",(req,res)=>func.getPulpitVladimir(res))
.get(prefix+"/auditoriumsSameCount",(req,res)=>func.AuditoriumsSameCapacityAndType(res))
.get(prefix+"/transaction",(req,res)=>func.setCapacityAud(res))
.get(prefix+"/fluent/:xyz",(req,res)=>func.fluentApi(res,req.params["xyz"]))

app.post(prefix+"/faculties",(req,res)=>func.postFaculties(res, req.body))
.post(prefix+"/subjects",(req,res)=>func.postSubjects(res, req.body))
.post(prefix+"/teachers",(req,res)=>func.postTeachers(res, req.body))
.post(prefix+"/pulpits",(req,res)=>func.postPulpits(res, req.body))
.post(prefix+"/auditoriums",(req,res)=>func.postAuditoriums(res, req.body))
.post(prefix+"/auditoriumtypes",(req,res)=>func.postAuditoriumType(res, req.body))

app.put(prefix+"/faculties",(req,res)=>func.putFaculty(res, req.body))
.put(prefix+"/subjects",(req,res)=>func.putSubjects(res, req.body))
.put(prefix+"/teachers",(req,res)=>func.putTeachers(res, req.body))
.put(prefix+"/pulpits",(req,res)=>func.putPulpits(res, req.body))
.put(prefix+"/auditoriums",(req,res)=>func.putAuditoriums(res, req.body))
.put(prefix+"/auditoriumtypes",(req,res)=>func.putAuditoriumTypes(res, req.body))

app.delete(prefix+"/faculties/:xyz",(req,res)=>func.deleteFaculty(res, req.params["xyz"]))
.delete(prefix+"/subjects/:xyz",(req,res)=>func.deleteSubject(res, req.params["xyz"]))
.delete(prefix+"/teachers/:xyz",(req,res)=>func.deleteTeacher(res, req.params["xyz"]))
.delete(prefix+"/pulpits/:xyz",(req,res)=>func.deletePulpit(res, req.params["xyz"]))
.delete(prefix+"/auditoriums/:xyz",(req,res)=>func.deleteAuditorium(res, req.params["xyz"]))
.delete(prefix+"/auditoriumtypes/:xyz",(req,res)=>func.deleteAuditoriumType(res, req.params["xyz"]))

app.listen(3000,()=>console.log(`Server is running at localhost:3000/\n`));