import React, { Component } from "react";

class ImgPicker extends Component {
  state = {
    images: [],
    menu: {},
    activeIndex: [],
    gallery: [],
    multi: false
  };
  // loadImgs = () => {
  //   fetch("http://localhost:4000/admin/imageLibrary", {
  //     method: "post"
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       let images = [];
  //       images.push(...response);
  //       this.setState({ images });
  //     });
  // };
  init = () => {
    fetch("http://localhost:4000/admin/imageLibrary", {
      method: "post"
    })
      .then(response => response.json())
      .then(response => {
        let images = [];
        images.push(...response);

        const gallery = [];
        this.props.gallery.forEach(image => {
          let index = images.findIndex(img => img._id === image.imageID);
          gallery.push({ index: index, caption: image.caption });
        });
        const multi = this.props.multi;
        let activeIndex = [];
        if (!multi && gallery.length > 0) {
          activeIndex.push(gallery[0].index);
        }
        this.setState({ images, gallery, multi, activeIndex });
      });
  };

  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.init();
    }
  }
  Images = () => {
    return this.state.images.map((image, index) => {
      let isActive = this.state.activeIndex.includes(index);
      let multi = this.state.multi;
      let isInGallery = this.state.gallery.find(image => image.index === index);
      if (!multi) {
        return (
          <div
            key={index}
            className={isActive ? "libImg active" : "libImg"}
            onClick={this.setActiveImg(index)}
          >
            <img
              src={"http://localhost:4000/admin/uploads/" + image.filename}
              alt={image.alt}
            />
          </div>
        );
      } else if (!isInGallery && multi) {
        return (
          <div
            key={index}
            className={isActive ? "libImg active" : "libImg"}
            onClick={this.setActiveImg(index)}
          >
            <img
              src={"http://localhost:4000/admin/uploads/" + image.filename}
              alt={image.alt}
            />
          </div>
        );
      }
      return null;
    });
  };

  setActiveImg = index => {
    return event => {
      let activeIndex = [...this.state.activeIndex];

      const i = activeIndex.indexOf(index);
      if (i > -1) {
        activeIndex.splice(i, 1);
      } else {
        if (!this.state.multi) activeIndex = [];
        activeIndex.push(index);
      }

      this.setState({ activeIndex });
    };
  };

  addImage = event => {
    let form = document.getElementById("addImage");
    const formData = new FormData(form);
    fetch("http://localhost:4000/admin/imageLibrary/create", {
      method: "post",
      body: formData
    })
      .then(response => {
        this.init();
      })

      .catch(err => console.log(err));
  };

  addToGallery = () => {
    let activeIndex = [];
    let gallery = [...this.state.gallery];
    this.state.activeIndex.forEach(index => {
      gallery.push({
        index: index,

        caption: ""
      });
    });
    this.setState({ gallery, activeIndex });
  };
  ChosenGallery = () => {
    return this.state.gallery.map((galleryImage, index) => {
      let image = this.state.images[galleryImage.index];
      return (
        <div key={index} className="galleryImg">
          <img
            src={"http://localhost:4000/admin/uploads/" + image.filename}
            alt={image.alt}
          />
          <input
            type="text"
            value={this.getValue("caption", index)}
            onChange={this.setValue("caption", index)}
          />

          <button type="text" onClick={this.removeFromGallery(index)}>
            Remove from gallery
          </button>
        </div>
      );
    });
  };
  removeFromGallery = index => {
    return () => {
      let gallery = this.state.gallery;

      gallery.splice(index, 1);

      this.setState({ gallery });
    };
  };
  getValue = (name, index) => {
    let gallery = this.state.gallery;
    return gallery[index][name];
  };

  setValue = (name, index) => {
    return event => {
      let gallery = [...this.state.gallery];
      gallery[index][name] = event.target.value;

      this.setState({ gallery });
    };
  };
  saveGallery = () => {
    let gallery = [];

    if (!this.state.multi) {
      let activeIndex = this.state.activeIndex;
      let image = this.state.images[activeIndex];
      if (image) gallery.push({ caption: image.caption, imageID: image._id });
    } else {
      this.state.gallery.forEach(image => {
        let imageID = this.state.images[image.index]._id;
        gallery.push({ caption: image.caption, imageID: imageID });
      });
    }
    this.props.saveGallery(gallery);
  };

  render() {
    return (
      <div id="libWrap">
        <form id="addImage">
          <input type="file" name="image" onChange={this.addImage} />
        </form>
        <div className="libImages">
          <this.Images />
        </div>
        {this.state.multi ? (
          <React.Fragment>
            <button onClick={this.addToGallery}>Add to gallery</button>
            <div className="chosenGallery">
              <this.ChosenGallery />
            </div>
            <button onClick={this.saveGallery}>Save Gallery</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button onClick={this.saveGallery}>Choose Image</button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ImgPicker;
