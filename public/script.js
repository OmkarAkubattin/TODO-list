let updatebtn = document.querySelector('.addbutton');
let editbtn = document.querySelector('.container');
let h1 = document.querySelector('h1');
let arr = 'DOIT.';
let index = 0;

setInterval(() => {
    if (index < arr.length) {
        h1.innerText += arr[index];
        index++;
    }
}, 200);

editbtn.addEventListener('click', (event) => {
    if (event.target.className === "deletebutton editbutton"){
        updatebtn.innerText = 'Update Task';
        let id = event.target.name;
        console.log(event)
        let name = event.target.previousElementSibling.children[1];
        let task = document.querySelector("input");
        task.value = name.innerText;
        document.querySelector('form').action = `/${id}/${task.value}/edit?_method=PUT`;
        task.addEventListener('change', () =>{
            document.querySelector('form').action = `/${id}/${task.value}/edit?_method=PUT`;
        });
    }
});