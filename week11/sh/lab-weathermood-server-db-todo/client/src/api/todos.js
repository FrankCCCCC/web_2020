import axios from 'axios';

// Develop server URL
const todoBaseUrl = 'http://weathermood-lab-chishen.us-east-1.elasticbeanstalk.com/api';

// Staging server URL
// const todoBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const todoBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function listTodos(unaccomplishedOnly = false, searchText = '', start) {    
    console.log(`${unaccomplishedOnly}`)
    let url = `${todoBaseUrl}/todos`;
    let query = [];
    
    if (searchText) {
        query.push(`searchText=${searchText}` );
    }
    if (start){
        query.push(`start=${start}`);
    }
    if (unaccomplishedOnly){
        query.push(`unaccomplishedOnly=${unaccomplishedOnly}`);
    }
    if (query.length)
        url += '?' + query.join('&');

    console.log(query);
    console.log(`Making GET request to: ${url}`);
    return axios.get(url).then(res => {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`)
        }
        return res.data
    });
}


export function createTodo(mood, text) {
    // let url = todoBaseUrl + '/todos';

    // console.log(`Making createTodo request to: ${url}`);

    // return axios.post(url, {mood, text}).then(function(res) {
    //     if (res.status !== 200)
    //         throw new Error('Unexpected response code: ${res.status}');
        
    //     return res.data;
    // });
    let url = `${todoBaseUrl}/todos`;
    console.log(`Making POST request to: ${url}`);

    return axios.post(url,{
            mood,
            text
    }).then(res=>{
        if(res.status!==200){
            throw new Error(`Unexpected response code: ${res.status}`)
        }
        return res.data;
    })

}

// export function accomplishTodo(id) {
//     // let url = todoBaseUrl + '/todos/' + id.toString(); 
//     // console.log(`Making accomplishTodo request to: ${url}`);

//     // return axios.post(url).then(function(res) {
//     //     if (res.status !== 200)
//     //         throw new Error(`Unexpected response code: ${res.status}`);

//     //     return res.data;
//     // });
//     let url = `${todoBaseUrl}/todos/${id}`
//     console.log(`Making accomplishTodo request to: ${url}`);
//     return axios.post(url).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }

export function accomplishTodo(id) {
    let url = `${todoBaseUrl}/todos/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
