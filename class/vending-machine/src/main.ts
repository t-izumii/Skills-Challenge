import Product from "./product";
import productSlot from "./productSlot";
import vendingMachineButton from './vendingMachineButton'

const cola = new Product('001','コーラ',150);
console.log(cola.getId());
console.log(cola.getName());
console.log(cola.getPrice())


const coloSlot = new productSlot(cola, 10);
console.log(coloSlot.getProduct());
console.log(coloSlot.getStock());

const A1 = new vendingMachineButton('A1', coloSlot);
(window as any).A1 = A1;


const buttonA1 = document.querySelector('#A1');
buttonA1?.addEventListener('click', function(){
    A1.press();
    A1.purchase();

    console.log(coloSlot.getProduct());
    console.log(coloSlot.getStock());
})

const buttonA1restock = document.querySelector('#A1restock');
buttonA1restock?.addEventListener('click', function(){
  const product =  A1.getProduct();

  product.restock(5);
  console.log(coloSlot.getProduct());
  console.log(coloSlot.getStock());
})
