import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { createApi } from 'unsplash-js';
import { AiFillLike } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";

function Feed({ item }) {
  const api = createApi({
    accessKey: "fNE2D7-Ur_GHiv2OKC8fLuv0bQwBFLlqtpjVwplLU0g"
  });
  const [data, setData] = useState(null);
  const [downloadlink , setdownloadlink] = useState("")

  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: item,
            client_id: 'fNE2D7-Ur_GHiv2OKC8fLuv0bQwBFLlqtpjVwplLU0g',
            perPage: 20,
          },
        });

        setData(response.data.results); 
      } catch (error) {
        console.error('Error searching photos on Unsplash:', error);
      }
    };

    search();
    console.log(data);

  }, [item]);

  const handleDownload = (downloadUrl) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'image.jpg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=' bg-slate-400'>
      <div className='mx-10 '>
        {item && <span className='bg-slate-200 text-lg rounded-md p-1'>Showing results for <span className='text-red-300 font-bold'>{item}:</span></span>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 m-5'>
      {data && data.map((photo) => (
        
        <div key={photo.id} className=' flex flex-col' >
            <div><img
            className='rounded-t-xl'
        src={photo.urls.regular}
        alt={photo.alt_description}
      
      /></div>
      <div className=' bg-slate-200 p-5 rounded-b-xl  items-center'><img src={photo.user.profile_image.small} className='rounded-full'/>{photo.alt_description} ~ <text className=' font-bold'>{photo.user.username} </text> 

<div className='flex flex-row'>  
          <text className='font-bold text-lg'>{photo.likes}  </text><text className=' text-red-500'><AiFillLike className='mx-1 w-6 h-6'/></text>
          <button onClick={()=>handleDownload(photo.links.download)}><IoMdDownload /></button>
</div> 
        </div>
        </div>
       
      
    
    ))}
      </div>
      
      </div>
    </div>
  );
}

export default Feed;
