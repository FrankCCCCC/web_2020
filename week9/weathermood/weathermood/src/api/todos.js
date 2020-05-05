import axios from 'axios';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import '@babel/polyfill';

const todoKey = 'todos';

const postBaseUrl = 'http://weathermood-server-dev.us-east-1.elasticbeanstalk.com/api';



export function listTodos(unaccomplishedOnly = false, searchText = '') {
    let url = `${postBaseUrl}/todos `;
    if (searchText)
        url += `?searchText=${searchText}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return _listTodos(unaccomplishedOnly, searchText);
    });
}

// export function listTodos(unaccomplishedOnly = false, searchText = '') {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(_listTodos(unaccomplishedOnly, searchText));
//         }, 500);
//     });
// }

//TODO
function _listTodos(unaccomplishedOnly = false, searchText = '') {
    let url = `${postBaseUrl}/todos`;
    if (searchText)
        url += `?searchText=${searchText}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        
        todos = res.data;   
        
        if (unaccomplishedOnly) {
            todos = todos.filter(t => {
                return !t.doneTs;
            });
        }
        
        if (searchText) {
            todos = todos.filter(t => {
                return t.text.toLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
            })
        }
        return todos;
    });
};

export function createTodo(mood, text) {
    let url = `${postBaseUrl}/todos`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return _createTodo;
    });
}


// export function createTodo(mood, text) {
//     return new Promise((resolve, reject) => {
//         resolve(_createTodo(mood, text));
//     });
// }

//TODO
function _createTodo(mood, text) {
    let url = `${postBaseUrl}/posts`;

    console.log(`Making POST request to: ${url}`);

    const newTodo = {
        id: uuid(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        doneTs: null
    };
    const todos = [
        newTodo,
        ..._listTodos()
    ];
    return axios.post(url, {
        todos
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });

}

export function accomplishTodo(id) {
    let url = `${postBaseUrl}/todos/${id}/accomplishTodo`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return _accomplishTodo;
    });
}
// export function accomplishTodo(id) {
//     return new Promise((resolve, reject) => {
//         _accomplishTodo(id);
//         resolve();
//     });
// }

//TODO
function _accomplishTodo(id) {
    let todos = _listTodos();
    for(let t of todos) {
        if(t.id === id) {
            t.doneTs = moment().unix();
            break;
        }
    }

    return axios.post(url, {
        id
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
    });

    //localStorage.setItem(todoKey, JSON.stringify(todos));
}

// // Simulated server-side code
// function _listTodos(unaccomplishedOnly = false, searchText = '') {
//     let todoString = localStorage.getItem(todoKey);
//     let todos = todoString ? JSON.parse(todoString) : [];

//     if (unaccomplishedOnly) {
//         todos = todos.filter(t => {
//             return !t.doneTs;
//         });
//     }
//     if (searchText) {
//         todos = todos.filter(t => {
//             return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
//         });
//     }
//     return todos;
// };

// export function createTodo(mood, text) {
//     return new Promise((resolve, reject) => {
//         resolve(_createTodo(mood, text));
//     });
// }

// // Simulated server-side code
// function _createTodo(mood, text) {
//     const newTodo = {
//         id: uuid(),
//         mood: mood,
//         text: text,
//         ts: moment().unix(),
//         doneTs: null
//     };
//     const todos = [
//         newTodo,
//         ..._listTodos()
//     ];
//     localStorage.setItem(todoKey, JSON.stringify(todos));

//     return newTodo;
// }

// export function accomplishTodo(id) {
//     return new Promise((resolve, reject) => {
//         _accomplishTodo(id);
//         resolve();
//     });
// }

// // Simulated server-side code
// function _accomplishTodo(id) {
//     let todos = _listTodos();
//     for(let t of todos) {
//         if(t.id === id) {
//             t.doneTs = moment().unix();
//             break;
//         }
//     }
//     localStorage.setItem(todoKey, JSON.stringify(todos));
// }
