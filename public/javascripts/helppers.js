function add_todo(event)
{
    event.preventDefault();
    let user = document.getElementById("input-name").value
    let task = document.getElementById("input-task").value
    let data = {name: user, task: task};
    fetch('/todo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function create_delete_result(dat)
{
    let element = document.getElementById('delete-res');
    element.innerHTML = dat;
}

function delete_user(user_data, event)
{
    let user = user_data['user'];
    fetch('/user/' + user, {
        method: 'delete',
    })
        .then((res) => res.text())
        .then((dat) => create_delete_result(dat))
}

var cur_fun = null;

function create_delete_button(data)
{
    if (document.getElementById('delete-user') == null)
    {
        let button = document.createElement('button');
        button.id = 'delete-user';
        button.innerHTML = 'Delete user: ' + data['user'];
        cur_fun = delete_user.bind(null, data);
        button.addEventListener('click', cur_fun, true);
        document.body.appendChild(button);
    }
    else 
    {
        let button = document.getElementById('delete-user');
        button.innerHTML = 'Delete user: ' + data['user'];
        button.removeEventListener('click', cur_fun, true);
        cur_fun = delete_user.bind(null, data);
        button.addEventListener('click', cur_fun, true);
    }
}

function delete_todo(todo_data, event)
{
    fetch('/user', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo_data)
    })
}


function create_todos(data)
{
    let element = document.getElementById('todos')
    let user = data['user'];
    for (i in data['todos'])
    {
        let but = document.createElement('button')
        let todo = data['todos'][i];
        let todo_data = {user: user, todo: todo};
        but.innerHTML = todo;
        but.classList.add('delete-task')
        temp_fun = delete_todo.bind(null, todo_data);
        but.addEventListener('click', temp_fun, true);
        element.appendChild(but);
    }
}

function create_search_result(data)
{
    if (typeof data == "string")
    {
        let element = document.getElementById('search-res');
        element.innerHTML = data;
    }
    else 
    {
        let element = document.getElementById('search-res');
        element.innerHTML = JSON.stringify(data);
        create_delete_button(data);
        create_todos(data);
    }

}

function search_user(event)
{
    event.preventDefault();
    let user = document.getElementById("search-name").value
    fetch('/user/' + user)
        .then((res) => (res.headers.get('Content-Type').includes("json") ? res.json() : res.text()))
        .then((dat) => create_search_result(dat))
    
}



window.onload = function() {
    let todo_form = document.getElementById("form-todo");
    todo_form.addEventListener('submit', add_todo, true);
    let search_form = document.getElementById("form-search");
    search_form.addEventListener('submit', search_user, true);
}