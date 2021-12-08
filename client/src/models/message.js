export default class Message {
  constructor(description, image, author, titre) {
    this.titre = titre;
    this.author = author;
    this.description = description;
    this.file = image;
  }
}
