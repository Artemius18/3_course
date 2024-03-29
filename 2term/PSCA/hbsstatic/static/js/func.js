addContact=()=>{
    const nameContact=document.getElementsByName("name")[0].value;
    const phoneContact=document.getElementsByName("phone")[0].value;
    fetch('/add',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: nameContact, phone: phoneContact})
    }).then(response=>response.json()).then(()=>window.location.href='/')
}

updateContact=async ()=>{
    const id = document.querySelector('.form').getAttribute('data-key');
    const nameContact=document.getElementsByName("name")[0].value;
    const phoneContact=document.getElementsByName("phone")[0].value;
    await fetch(`/update/${id}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: nameContact, phone: phoneContact}),
    });
    window.location.href='/'
}

deleteContact=async ()=>{
    const id = document.querySelector('.form').getAttribute('data-key');
    await fetch(`/delete/${id}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    window.location.href='/'
}

checkTelephone=(number)=>{
    return new RegExp(/^\+[1-9]\d{9,11}$/g).test(number)
}