import Card from './card'
import data from './datas'
import './style.css';

interface SiteData {
  id: number;
  title: string;
  episode: string;
  imgPath: string;
}

interface PositionData {
  top: number;
  left: number;
  width: number;
  height: number;
}


const app: HTMLElement | null = document.querySelector('#app');
const grid: HTMLElement = document.createElement('div')
grid.classList.add('grid');
app?.appendChild(grid);


data.forEach((data:SiteData) => {
  const container : HTMLElement = document.createElement('div');
  container.classList.add('card-container');
  const card : HTMLElement = new Card(data).createCard();
  container.appendChild(card);
  grid.appendChild(container);
});

function pos() {
  const cardContainers: NodeListOf<Element>  = document.querySelectorAll('.card-container');

  cardContainers.forEach((cardContainer) => {
    const card: HTMLElement | null = cardContainer.querySelector('.card');

    if (card) {
      const rect: DOMRect = cardContainer.getBoundingClientRect();
      const position: PositionData = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
      card.style.top = `${position.top}px`;
      card.style.left = `${position.left}px`;
      card.style.width = `${position.width}px`;
      card.style.height = `${position.height}px`;
    }
  });

  requestAnimationFrame(pos);
}

function clickCard() {
  const cards: NodeListOf<Element> = document.querySelectorAll('.card');
  cards.forEach((card:Element)=>{
    card.addEventListener('click',()=>{
      cards.forEach((card:Element)=>{
        card.classList.remove('active');
      })
      card.classList.add('active');
    })
  })
}

function reset() {
  const cards: NodeListOf<Element> = document.querySelectorAll('.card');
  cards.forEach((card:Element) => {
    card.classList.remove('active');
  });
}

document.addEventListener('click', (event: MouseEvent) => {
  const clickedElement: HTMLElement  = event.target as HTMLElement;
  const isCard: Element | null = clickedElement.closest('.card');
  if (!isCard) {
    reset();
  }
});


window.addEventListener('DOMContentLoaded', (): void => {
  pos();
  clickCard();
});


