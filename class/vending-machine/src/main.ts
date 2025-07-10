import Product from "./product";
import productSlot from "./productSlot";
import vendingMachineButton from './vendingMachineButton'

class VendingMachine {
  private buttons = new Map<string, vendingMachineButton>();

  addSlot(buttonId: string, productSlot: productSlot): void {
    const button = new vendingMachineButton(buttonId, productSlot);
    this.buttons.set(buttonId, button);
  }

  getButton(buttonId: string): vendingMachineButton | undefined {
    return this.buttons.get(buttonId);
  }

  getAllButtons(): Map<string, vendingMachineButton> {
    return this.buttons;
  }

  purchase(buttonId: string): boolean {
    const button = this.buttons.get(buttonId);
    if (!button) {
      console.error(`Button ${buttonId} not found`);
      return false;
    }

    button.press();
    button.purchase();

    return true;
  }

  restock(buttonId: string, amount: number): boolean {
    const button = this.buttons.get(buttonId);
    if (!button) {
      console.error(`Button ${buttonId} not found`);
      return false;
    }

    const product = button.getProduct();
    product.restock(amount);
    return true;
  }
}

interface ProductConfig {
  id: string;
  name: string;
  price: number;
  initialStock: number;
  buttonId: string;
}

const vendingMachine = new VendingMachine();
const app: HTMLElement | null = document.querySelector('#app')


const productConfigs: ProductConfig[] = [
  { id: '001', name: 'コーラ', price: 150, initialStock: 10, buttonId: 'A1' },
  { id: '002', name: 'ペプシ', price: 150, initialStock: 8, buttonId: 'A2' },
  { id: '003', name: 'オレンジジュース', price: 120, initialStock: 5, buttonId: 'B1' }
];

productConfigs.forEach(config => {
  const product: Product = new Product(config.id, config.name, config.price);
  const slot: productSlot = new productSlot(product, config.initialStock);
  vendingMachine.addSlot(config.buttonId, slot);

  const container: HTMLElement = document.createElement('div');
  const button: HTMLElement = document.createElement('button');
  button.classList.add('button');
  button.dataset.buttonId = config.buttonId;
  button.innerText = config.name;
  const restockButton: HTMLElement = document.createElement('button');
  restockButton.classList.add(`restock-button`);
  restockButton.dataset.buttonId = config.buttonId;
  restockButton.innerText = 'restock';

  container.appendChild(button);
  container.appendChild(restockButton);
  app?.appendChild(container);
});

function event() {
  const buttons: NodeListOf<Element> = document.querySelectorAll('.button');
  buttons.forEach((button)=>{
    button.addEventListener('click',()=>{
      const buttonId:string | undefined = (button as HTMLElement).dataset.buttonId;
      if (buttonId) {
        vendingMachine.purchase(buttonId);
      }
    })
  })

  const restockButtons: NodeListOf<Element> = document.querySelectorAll('.restock-button');
  restockButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
      const buttonId:string | undefined = (button as HTMLElement).dataset.buttonId;
      if (buttonId) {
        vendingMachine.restock(buttonId, 10);
      }
    })
  })
}
event();
