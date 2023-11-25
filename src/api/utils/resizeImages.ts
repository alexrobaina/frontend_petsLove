import Resizer from 'react-image-file-resizer'

interface Image {
  file: File
  isNew: boolean
}

export const resizeImages = async (images: Image[]): Promise<File[]> => {
  if (!Array.isArray(images) || images.length === 0) {
    return []
  }

  const resizedImages = await Promise.all(
    images.map(async (image) => {
      if (image.isNew && image.file.size > 1.5 * 1024 * 1024) {
        // Resize the image if it's greater than 1.5MB
        return new Promise<File>((resolve) => {
          Resizer.imageFileResizer(
            image.file,
            1024, // New width
            1024, // New height
            'JPEG', // Image format
            100, // Quality
            0, // Rotation
            (uri: string | Blob | File | ProgressEvent<FileReader>) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const byteString = atob(uri.split(',')[1])
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const mimeString = uri.split(',')[0].split(':')[1].split(';')[0]
              const ab = new ArrayBuffer(byteString.length)
              const ia = new Uint8Array(ab)
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
              }
              const blob = new Blob([ab], { type: mimeString })
              const file = new File([blob], 'resized.jpg', {
                type: mimeString,
              })
              resolve(file)
            },
            'base64', // Output type
          )
        })
      }
      return image.file
    }),
  )

  return resizedImages
}
