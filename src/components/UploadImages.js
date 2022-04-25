import React ,{useState,useEffect} from 'react'
import PhotoContainer from "./PhotoContainer";


export default function UploadImage(){
    const [images,setImage] = useState([]);
    const [imageURLs,setImageURLs] = useState([]);


   useEffect(() => {
       if (images.length < 1) return;
       const newImageUrls = [];
       images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
       setImageURLs(newImageUrls);
   } ,[images]);




    function onImageChange(e) {
        setImage([...e.target.files]);

    }
    return(
        <>
        <input type="file" multiple accept="image/*" onChange={onImageChange}/>
        { imageURLs.map(imageSrc => <img src={imageSrc}/>)}
        </>
    );
}