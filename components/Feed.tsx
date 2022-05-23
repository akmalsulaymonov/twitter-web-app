import React, { useState } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import TweetBox from './TweetBox'
import { Tweet } from '../typings'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Feed = ({ tweets: TweetsProp }:Props) => {

  const [tweets, setTweets] = useState<Tweet[]>(TweetsProp)
  console.log(tweets)

  const handleRefresh = async () => {
    const tweets = await fetchTweets()
    setTweets(tweets)
  }

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
        
        {/* RefreshIcon */}
        <div className="flex items-center justify-between">
            <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
            <RefreshIcon 
              onClick={handleRefresh} 
              className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" 
            />
        </div>

        {/* Tweetbox */}
        <div>
            <TweetBox />
        </div>

        {/* Feed */}
        <div>
          { tweets.map(tweet => (
            <TweetComponent key={tweet._id} tweet={tweet} />
          ))}
        </div>


    </div>
  )
}

export default Feed