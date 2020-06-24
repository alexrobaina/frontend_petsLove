import { action, observable, runInAction } from 'mobx'
import imageCompression from 'browser-image-compression'
import ImageService from 'services/ImageService/ImageService'

class ImageStore {
  constructor() {
    this.imageService = new ImageService()
  }

  @observable image = []
  @observable imageId = ''
  @observable isError = false
  @observable isLoading = false
  @observable imageResize = []
  @observable newPreviewsImage = []
  @observable requestSuccess = false

  @action
  async saveImage(save: function) {
    try {
      this.isLoading = true
      const response = await this.imageService.addImage(this.imageResize)

      runInAction(() => {
        console.log(response)
        this.isLoading = false
        this.imageId = response._id
        save(this.imageId)
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        console.log(e)
      })
    }
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
    this.imageResize.push(image)
  }

  @action
  setImage(value) {
    this.image = value
    this.resize()
  }
}

export default ImageStore
