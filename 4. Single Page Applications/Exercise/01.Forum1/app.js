import {createPost, getPosts, openPost} from './commands.js'


const main = document.querySelector('main');
const createUrl = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentUrl = 'http://localhost:3030/jsonstore/collections/myboard/comments';

getPosts();


document.addEventListener('submit', createPost);
document.addEventListener('click', openPost);


export {main, createUrl, commentUrl}
