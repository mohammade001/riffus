import React, { HTMLAttributes } from 'react'

export default function ImageUploader() {
    return (
        <div>
            <label htmlFor="imageUpload">Choose an image:</label>
            <input type="file" id="imageUpload" name="image" accept="image/*"></input>
        </div>
    )
}
