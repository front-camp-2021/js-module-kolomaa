//import Card from "../../module-2/card";

export default class CardsList {
  element;
  constructor ({data = [], Component = {}}) {
    this.data = data;
    this.Component = Component;

    this.render();
  }

  render() {
    const cardList = document.createElement("section");
    cardList.classList.add("cards");
    this.element = cardList;
    this.insertCards(this.element);
    
  }

  insertCards(section) {
    this.data.forEach((el) => {
      let card = new this.Component(el);
      section.append(card.element);
    })
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }

  update(newData){
    this.data = newData;
    this.element.innerHTML = "";
    this.insertCards(this.element);
  }
}
