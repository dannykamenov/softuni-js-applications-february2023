import * as api from './api.js';

const endpoints = {
    'dashboard': '/data/offers?sortBy=_createdOn%20desc',
    'create': '/data/offers',
    'offerById': '/data/offers/'

}

export async function getDashboard() {
    return api.get(endpoints.dashboard)
}

export async function createOffer(idea) {
    return api.post(endpoints.create, idea);
}

export async function getOfferById(id) {
    return api.get(endpoints.offerById + id);
}

export async function editOffer(id, offer) {
    return api.put(endpoints.offerById + id,offer);
}

export async function deleteOffer(id) {
    return api.del(endpoints.offerById + id);
}