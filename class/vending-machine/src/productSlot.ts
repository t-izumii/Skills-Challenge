import Product from "./product";

export default class productSlot {
    private product:  Product;
    private stock: number;
    private maxStock: number;

    constructor( product: Product , stock: number ) {

        if (!(product instanceof Product)) {
            throw new Error('product はProductクラスのインスタンスである必要があります');
        }

        if ( typeof stock !== 'number') {
            throw new Error('product はnumberである必要があります');
        }

        this.product = product;
        this.stock = stock;
        this.maxStock = 20;
    }

    getProduct() { return this.product }
    getStock() { return this.stock}
    isEmpty(): boolean { return this.stock === 0; }

    purchase() {
        if (this.isEmpty()) {
            throw new Error('在庫がありません');
        }
        this.stock --;
        return this.product;
    }

    restock(amount: number) {
        this.stock = Math.min(this.maxStock, this.stock + amount);
        console.log(this.stock);
    }


}