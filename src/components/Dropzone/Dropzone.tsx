import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './Dropzone.css'

interface Props {
  onFileSelected: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileSelected }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    setSelectedFileUrl(URL.createObjectURL(file))
    onFileSelected(file)
  }, [onFileSelected])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      { selectedFileUrl
          ? <img src={selectedFileUrl} alt="Imagem do estabelecimento" />
          : (
              <p>
                <FiUpload />
                Imagem do estabelecimento
              </p>
          )
      }
    </div>
  )
}

export default Dropzone
