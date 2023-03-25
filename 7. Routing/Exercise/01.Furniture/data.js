import * as api from './api.js';

const endpoints = {
    'catalog': '/data/catalog',
    'create': '/data/catalog',
    'ideaById': '/data/catalog/'

}

export async function getFurniture() {
    return api.get(endpoints.catalog)
}

export async function createFurniture(idea) {
    return api.post(endpoints.create, idea);
}

export async function getFurnitureById(id) {
    return api.get(endpoints.ideaById + id);
}

export async function editById(id) {
    return api.put(endpoints.ideaById + id);
}

export async function deleteById(id) {
    return api.del(endpoints.ideaById + id);
}