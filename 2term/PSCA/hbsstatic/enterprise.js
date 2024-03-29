const resp=require('./contacts.json')||[];
const fs=require('fs');


const getAllContacts=async (res)=>{
    try{
        await res.render('index', {
            contacts:resp
        });
    }
    catch(e){
        res.status(500).send(e);
    }
}
const addContactMethod=async(data)=>{
    var index=parseInt(Math.floor(Math.random()*100))
    while(resp.find(elem=>elem.id===parseInt(index))){
        index=parseInt(Math.floor(Math.random()*100));
    }
    try{
        resp.push({
            id: index,
            name: data.name,
            phone: data.phone
        });
        save();
        return resp
    }
    catch(e){
        console.log(e.message);
    }
}

const updateContactMethod=async(req) =>{
    try{
        const ident=req.params["id"];
        const cont=await resp.find(elem=>elem.id===parseInt(ident));
        if(cont){
            cont.name=req.body.name;
            cont.phone=req.body.phone;
        }
        save();
        return resp;
    }
    catch(e){
        console.log(e.message);
    }
}

const getForUpdate=async (req, res)=>{
    try{
        const ident=req.params["id"];
        const cont=resp.find(elem=>elem.id===parseInt(ident));
        await res.render('editItem',{
            contacts: resp,
            thisContact: cont
        })
    }
    catch(e){
        console.log(e.message);
    }
}

const deleteContactMethod=async(req)=>{
    try{
        const ident=req.params["id"];
        const index=await resp.findIndex(elem=>elem.id===parseInt(ident));
        if(index!==-1){
            resp.splice(index,1)
        }
        save();
        return resp
    }
    catch(e){
        console.log(e.message);
    }
}
const getForInsert=async (res)=>{
    try{
        await res.render('addItem', {
            contacts:resp
        });
    }
    catch(e){
        res.status(500).send(e);
    }
}


save=async()=>{
    try{
        await fs.promises.writeFile('contacts.json', JSON.stringify(resp, null, 4));
    }
    catch(e){
        console.log(e);
    }
}

module.exports={
    addContactMethod,
    getAllContacts,
    getForUpdate,
    updateContactMethod,
    deleteContactMethod,
    getForInsert
}