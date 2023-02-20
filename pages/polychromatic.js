import axios from 'axios';
import { useEffect, useState} from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import NASA_API_KEY from '.env'

export default function Polychromatic() {
       const [image, setImage] = useState([]);
       const [images, setImages] = useState([]);
       const [time, setTime] = useState('loading');
       const [date, setDate] = useState('');
       const [coords, setCoords] = useState({});
       const [isHovered, setIsHovered] = useState(false);


       const api_key = NASA_API_KEY
       const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${api_key}`
       
       const getPolychromaticData = async () => {
              const res = await axios.get(url);
              const data = await res.data;
              console.log(data);
              
              const caption = data[0].caption;
              const date = data[0].date.split(' ')[0];
              const date_formatted = date.replaceAll('-', '/');

              let times = [];
              let images = [];
              for(let i=0; i<data.length; i++){
                     let time = data[i].date.split(' ')[1];
                     let coords = data[i].centroid_coordinates;
                     let imageGrabbed = data[i].image;
                     let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imageGrabbed}.png`
              
                     times.push(time);
                     images.push({
                            image: image, 
                            time: time, 
                            coords: coords,
                     })
              }
              setDate(date);
              setImages(images);
              setTime(times[0])
              setImage(images[0].image);
              setCoords([images[0].coords.lat, images[0].coords.lon]);
              console.log(image);
       }
  useEffect(()=>{
       getPolychromaticData()
     }, [])

  return (
    <>
    <NavBar/>
    <main 
    className = 'row main'>
       <div 
       className = 'choices'>
              {/* <div className='row'> */}
                     {images.map((e, i) => {
                            return(
                                   <>
                                   <div 
                                   className = 'col select' 
                                   key={i} 
                                   onMouseEnter = {() => setIsHovered(true)} 
                                   onMouseLeave = {()=> setIsHovered(false)}>
                                          <Image 
                                          src = {e.image} 
                                          alt = {i} width = {150} 
                                          height = {150}/>
                                          <div 
                                          className = 'col '>
                                                 <div 
                                                 className = 'time'>
                                                        {e.time}
                                                 </div>
                                                 <div 
                                                 className = 'coordinates'>
                                                        {e.coords.lat} , {e.coords.lon}
                                                 </div>
                                          </div>
                                          {isHovered && (
                                                 <button 
                                                 className = 'button' 
                                                 onClick = {() => {
                                                 setImage(e.image);
                                                 setTime(e.time);
                                                 setCoords([e.coords.lat, e.coords.lon]);
                                                 console.log(images[i].image)
                                                 document.body.scrollIntoView({behavior: 'smooth'});
                                                 }}>View</button>
                                          )}
                                   </div>
                                   
                                   </>
                            )
                     })}
              {/* </div> */}
       </div>
       <div 
       className = 'viewer'>
              <div 
              className='col info'>
                     <div 
                     className = 'time'>
                            {time}
                     </div>
                     <div 
                     className = 'coordinates'> 
                           [ {coords[0]}, {coords[1]} ]
                     </div>   
              </div>
              <Image 
              src={image} 
              alt={image} 
              width={400} 
              height={400} />
              <div className = 'about'>
              Daily Images and information collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument.
              </div>
       </div>
    </main>
    </>
  )
}