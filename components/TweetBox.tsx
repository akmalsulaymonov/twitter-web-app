import { 
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon, 
    SearchCircleIcon 
} from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'

function TweetBox() {

    const [input, setInput] = useState<string>('')
    const { data: session } = useState()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const [image, setImage] = useState<string>('')
    const imageInputRef = useRef<HTMLInputElement>(null)

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }

  return (
    <div className="flex space-x-2 p-5">
        
        <img 
            className="h-14 w-14 mt-4 rounded-full object-cover"
            src={ session?.user?.image || 'https://gravity.studio/akmal/projects/twitter-web-app/avatar-man-icon.jpg'} 
            alt="" 
        />

        <div className="flex flex-1 items-center pl-2">
            <form className="flex flex-1 flex-col">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What's happening?" 
                    className="h-24 w-full text-xl outline-none placeholder:text-xl" 
                />
                <div className="flex items-center">
                    <div className="flex flex-1 space-x-2 text-twitter">
                        <PhotographIcon 
                            onClick={ () => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen) }
                            className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" 
                        />
                        <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                        <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                        <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                        <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                    </div>
                    <button 
                        disabled={!input || !session}
                        className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
                    >
                        Tweet
                    </button>
                </div>

                {/* Image adding form  */}
                { imageUrlBoxIsOpen && (
                    <form className="rounded-lg mt-5 flex bg-twitter/80 py-2 px-4">
                        <input 
                            ref={imageInputRef}
                            type="text" 
                            className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                            placeholder="Enter Image URL..." 
                        />
                        <button type="submit" onClick={addImageToTweet} className="font-bold text-white">Add Image</button>
                    </form>
                )}

                {/* Image show after adding */}
                { image && (
                    <img 
                        className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                        src={image} 
                        alt="" 
                    />
                )}

            </form>
        </div>


    </div>
  )
}

export default TweetBox