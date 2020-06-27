import { action, observable } from 'mobx'
import ImageService from 'services/ImageService/ImageService'
import imageCompression from 'browser-image-compression'

class InputUploadImageStore {
  constructor() {
    this.imageService = new ImageService()
  }

  @observable image = []
  @observable isError = false
  @observable imageResized = []
  @observable isLoading = false
  @observable previewImage = []
  @observable newPreviewsImage = []
  @observable requestSuccess = false

  // this function is only for remove old image
  @action
  removePreviosImage(image) {
    this.imagePreview = this.previewImage.filter(preview => {
      return preview !== image
    })

    this.previewImage = this.imagePreview
  }

  // this function is only for remove new images
  @action
  removeNewPreviewsImage(image) {
    const imageTemporal = this.newPreviewsImage.filter(preview => {
      return preview.preview !== image.preview
    })

    const imageResizedfiltered = this.imageResized.filter(imageResized => {
      return imageResized.name !== image.imageName.name
    })

    this.setNewImageResized(imageResizedfiltered)
    this.setNewsPreviewsImage(imageTemporal)
  }

  // This function set new imageResized for send to service
  @action
  setNewImageResized(image) {
    this.imageResized = imageResizedfiltered
  }

  // This function set new image
  @action
  setNewsPreviewsImage(image) {
    this.newPreviewsImage = image
  }

  // This function set image from entity
  @action
  setPreviewsImage(image) {
    this.previewImage = image
  }

  @action
  resize() {
    if (this.image.length > 0) {
      Object.values(this.image).forEach(image => {
        this.compressImage(image)
      })
    }

    return true
  }

  @action
  async compressImage(event) {
    this.isLoading = true
    // console.log('originalFile instanceof Blob', event instanceof Blob) // true
    // console.log(`originalFile size ${event.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(event, options)
      this.isLoading = false
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

      await this.setImageResize(compressedFile) // write your own logic
    } catch (error) {
      this.isLoading = false
      console.log(error)
    }
  }

  // ============================================
  // END resize images.
  // ============================================

  @action
  setImageResize(image) {
    this.imageResized.push(image)
  }

  @action
  setImage(value) {
    this.image = value
    this.resize()
  }

  get getImage() {
    return {
      imageResized: this.imageResized,
      previewImage: this.previewImage,
    }
  }
}

export default InputUploadImageStore
