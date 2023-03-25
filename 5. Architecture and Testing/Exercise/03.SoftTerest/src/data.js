import * as api from './api.js';

const endpoints = {
    'ideas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'create': '/data/ideas',
    'ideaById': '/data/ideas/'

}

export async function getIdeas() {
    return api.get(endpoints.ideas)
}

export async function createIdea(idea) {
    return api.post(endpoints.create, idea);
}

export async function getIdeaById(id) {
    return api.get(endpoints.ideaById + id);
}

export async function deleteById(id) {
    return api.del(endpoints.ideaById + id);
}