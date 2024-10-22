export default class custom_event {
    id: number;
    title: string;
    description: string;
    datetime: Date;
    location: string;

    constructor(id: number, title: string, description: string, date: Date, location: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.datetime = date;
        this.location = location;
    }

    getDate() : string {
        return this.datetime.toISOString().split('T')[0];
    }
    getTime() : string {
        return this.datetime.toISOString().split('T')[1].split(':').slice(0, 2).join(':');
    }

    static fromJson(json: any): custom_event {
        return new custom_event(
            json.id,
            json.title,
            json.description,
            new Date(json.datetime),
            json.location
        );
    }
}

