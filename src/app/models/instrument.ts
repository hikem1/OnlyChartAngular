export interface InstrumentInterface{
    id: number;
    name: string;
    code: string;
    graph_link: string|null;
    link: string;
    exchange_place: string
}

export class Instrument implements InstrumentInterface{
    id: number;
    name: string;
    code: string;
    graph_link: string|null;
    link: string;
    exchange_place: string
    
    constructor(instrumentJson: InstrumentInterface){
        this.id = instrumentJson.id;
        this.name = instrumentJson.name;
        this.code = instrumentJson.code;
        this.graph_link = instrumentJson.graph_link;
        this.link = instrumentJson.link;
        this.exchange_place = instrumentJson.exchange_place;
    }
}