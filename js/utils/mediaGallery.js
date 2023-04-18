export function changeMediaSrc(data) {
  const mediaGallery = document.querySelector(".media-gallery");
  data.media.forEach(function (media) {
    mediaGallery.innerHTML += `
    <img class="gallery-img" src="${media}" alt="" />
    `;
  });

  const galleryImages = document.querySelectorAll(".gallery-img");
  const mainImage = document.querySelector(".main-img");

  galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
      console.log(image.src);
      mainImage.src = image.src;
    });
  });
}
