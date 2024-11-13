export interface InstrumentInterface{
    id: number;
    name: string;
    code: string;
    graph_link: string;
    link: string;
    exchange_place: string;
    active: boolean;
    favorite: boolean;
    selected: boolean;
    add_favorite_date: Date;
}

export class Instrument implements InstrumentInterface{
    id: number;
    name: string;
    code: string;
    graph_link: string;
    link: string;
    exchange_place: string
    active: boolean;
    favorite: boolean;
    selected: boolean;
    add_favorite_date: Date;

    constructor(instrumentJson: InstrumentInterface){
        this.id = Number(instrumentJson.id);
        this.name = instrumentJson.name;
        this.code = instrumentJson.code;
        this.graph_link = instrumentJson.graph_link;
        this.link = instrumentJson.link;
        this.exchange_place = instrumentJson.exchange_place;
        this.active = false;
        this.favorite = false;
        this.selected = false;
        this.add_favorite_date = new Date();
    }
}