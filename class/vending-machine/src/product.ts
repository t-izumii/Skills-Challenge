export default class Product {

    private id: string;
    private name: string;
    private price: number;

    constructor(id: string, name: string , price: number) {

        if ( typeof name !== 'string') {
            throw new Error('name は文字列である必要があります');
        }

        if (typeof price !== 'number') {
            throw new Error('price は数値である必要があります');
        }
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId() { return this.id }
    getName() { return this.name }
    getPrice() { return this.price }
}