import type productSlot from "./productSlot";

export default class vendingMachineButton {
    private buttonId :string;
    private productSlot : productSlot;
    private isPressed: boolean;

    constructor( buttonId: string, productSlot: productSlot ) {

        this.buttonId = buttonId;
        this.productSlot = productSlot;
        this.isPressed = false;
    }

    getProduct() { return this.productSlot }

    press() {
        this.isPressed = true

        return {
            buttonId: this.buttonId,
            product: this.productSlot,
            canPurchase : this.productSlot.isEmpty()
        }
    }

    purchase(){
        if (!this.isPressed) throw new Error('ボタンが押されていない');

        const product = this.productSlot.purchase();

        this.isPressed = false;
        return product
    }
}