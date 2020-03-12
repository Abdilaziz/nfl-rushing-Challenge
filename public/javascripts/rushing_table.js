
let table_area = document.getElementById('table_area');

axios.get('/football/rushing?sort=Player')
.then((response) => {
    if(response.status === 200) {
        console.log(response);
        table_area.textContent = "RESPONSE: " + JSON.stringify(response.data);
    }
})
.catch((error)=>{
    table_area.textContent = "ERROR: " + JSON.stringify(error);
});

