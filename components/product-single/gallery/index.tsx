type GalleryProductType = {
  images?: string[];
  videos?: string; //[];
};

const Gallery = ({ images, videos }: GalleryProductType) => {
  const fetchImage = images ? images[0] : "";
  // const fetchvideo = videos ? videos[0] : "";

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images?.map((image) => (
          <div key={image} className="product-gallery__thumb">
            <img src={image} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        {videos ? (
          <iframe
            allowFullScreen="allowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            width="100%"
            height="100%"
            src={videos}
            class="b-uploaded"
            frameborder="0"
          ></iframe>
        ) : (
          <img src={fetchImage} alt="" />
        )}
      </div>
    </section>
  );
};

export default Gallery;
