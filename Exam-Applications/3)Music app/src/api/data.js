import {del, get, post, put} from './api.js';

export async function getAllCards(){
    return await get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createCard(data){
    return post('/data/albums', data);
}

export async function getCardDetaild(id){
    return get('/data/albums/' + id);
}

export async function deleteCard(id){
    return del('/data/albums/'+id);
}

export async function editCard(id, data){
    return put('/data/albums/'+id, data)
}

export async function search(input){
    return get(`/data/albums?where=name%20LIKE%20%22${input}%22`);
}