import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline'
import React from 'react'
import TimeAgo from 'react-timeago'
import { Tweet } from '../typings'
import Image from 'next/image'

interface Props {
    tweets: Tweet[]
  }

const Tweet = ({ tweet }: Props) => {
  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
        <div className="flex space-x-3">

            <div className="relative h-10 w-10" >
                <Image src={tweet.profileImg} alt={tweet._id} layout="fill" objectFit="cover" className="rounded-full object-cover" />
            </div>

            <div>
                <div className="flex items-center space-x-1">
                    <p className="mr-1 font-bold">{tweet.username}</p>
                    <p className="hidden text-sm text-gray-500 sm:inline">@{tweet.username.replace(/\s+/g,'').toLowerCase()} · </p>
                    <TimeAgo 
                        className="text-sm text-gray-500"
                        date={tweet._createdAt}
                    />
                </div>
                <p>{tweet.text}</p>

                { tweet.image && (
                    <img 
                        className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
                        src={tweet.image} 
                        alt="111"
                    />
                )}
                
            </div>
        </div>
        <div className="mt-5 flex justify-between">
            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <ChatAlt2Icon className="h-5 w-5" />
            </div>
            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <SwitchHorizontalIcon className="h-5 w-5" />
            </div>
            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <HeartIcon className="h-5 w-5" />
            </div>
            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                <UploadIcon className="h-5 w-5" />
            </div>
        </div>
    </div>
  )
}

export default Tweet