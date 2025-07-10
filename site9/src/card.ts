
interface SiteData {
    id: number;
    title: string;
    episode: string;
    imgPath: string;
}

class Card {

    private id: number;
    private title: string;
    private episode: string;
    private imgPath: string;

    constructor(data: SiteData) {

        if (!data) {
            throw new Error('Site data is required');
        }

        this.id = data.id;
        this.title = data.title
        this.episode = data.episode
        this.imgPath = data.imgPath
    }

    getId(): number {
        return this.id;
    }

    createTitle(): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add('title');
        container.innerHTML = this.title;
        return container;
    }

    createEpisode(): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add('episode');
        container.innerHTML = this.episode;
        return container;
    }

    createImg(): HTMLImageElement {
        const img = document.createElement('img');
        img.src = this.imgPath;
        return img;
    }

    createThumb(): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add('front')
        container.appendChild(this.createImg())

        return container
    }

    createHTMLElement(): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add('back');
        container.appendChild(this.createTitle());
        container.appendChild(this.createEpisode());
        return container
    }

    createCard() {document.createElement('div');
        const card = document.createElement('div');
        card.classList.add('card');
        const front = this.createThumb();
        const back = this.createHTMLElement();

        card.appendChild(front);
        card.appendChild(back);
        return card;
    }

}

export default Card;