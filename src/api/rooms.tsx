import axios from 'axios';

export interface RoomData {
    id: string;
    title: string;
}

export class RoomApi {
    api = axios.create({
        baseURL: 'http://localhost:8888',
        timeout: 1000
    });
    
    async loadOne(id: string) {
        return this.api.get<RoomData>('/rooms/'+id);
    }
    async load() {
        return this.api.get<RoomData[]>('/rooms');
    }
    
    async remove(id: string) {
        return this.api.delete('/rooms/'+id);
    }
    
    async create(title: string) {
        return this.api.post('/rooms', {
            title: title
        });
    }

    async update(id: string, title: string) {
        return this.api.put('/rooms/'+id, {
            title: title
        });
    }
}

export default new RoomApi();