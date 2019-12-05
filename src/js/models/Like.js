export default class Like {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = {id, title, author, img};
    this.likes.push(like)

    // Peresist data to local storage
    this.peresistData();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);

    // Peresist data to local storage
    this.peresistData();

  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  peresistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if(storage) this.likes = storage;
  }
};
