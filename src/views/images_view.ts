import Image from '../models/Image';

export default {
  render(image: Image) {
    return { 
      id: image.id,
      // MOBILE
      // url: `http://192.168.25.9:3333/uploads/${image.path}`

      // WEB
      url: `http://localhost:3333/uploads/${image.path}`
    };
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  },
};
