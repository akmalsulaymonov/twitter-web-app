import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import { Comment, Tweet, CommentBody } from '../typings'
import Image from 'next/image'
import { fetchComments } from '../utils/fetchComments'
import toast from 'react-hot-toast'

interface Props {
    tweets: Tweet[]
}

const Tweet = ({ tweet }: Props) => {

    const [comments, setComments] = useState<Comment[]>([])
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const { data: session } = useState()

    const refreshComments = async () => {
        const dataComments: Comment[] = await fetchComments(tweet._id)
        setComments(dataComments)
    }

    useEffect(() => {
        refreshComments()
    }, [])

    const postComment = async () => {
        
        const commentInfo: CommentBody = {
            comment: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://gravity.studio/akmal/projects/twitter-web-app/avatar-man-icon.jpg',
            tweetId: tweet._id
        }

        const result = await fetch(`/api/addComment`, {
            body: JSON.stringify(commentInfo),
            method: 'POST'
        })

        const json = await result.json()

        const newComments = await fetchComments(tweet._id)
        setComments(newComments)

        toast('Comment Posted', {
            icon: '🎉',
        })

        return json
    }

    const handleSubmitComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        postComment();

        setInput('')
        setCommentBoxVisible(false)
        
    }

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
            <div 
                className="flex cursor-pointer items-center space-x-3 text-gray-400" 
                // classonClick={ () => Session && setCommentBoxVisible(!commentBoxVisible)}
                onClick={ () => setCommentBoxVisible(!commentBoxVisible)}
            >
                <ChatAlt2Icon className="h-5 w-5" />
                <p>{comments.length}</p>
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

        {/* Comment Box logic */}
        { commentBoxVisible && (
            <form className="mt-3 flex space-x-3">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
                    type="text" 
                    placeholder="Write a comment..." 
                />
                <button disabled={!input} onClick={handleSubmitComment} type="submit" className="text-twitter disabled:text-gray-200">Post</button>
            </form>
        )}

        {/* Show comments */}
        { comments?.length > 0 && (
            <div className="my-2 mt-5 max-h-44 space-y-5  border-t border-gray-100 p-5">
                { comments.map((comment) => (
                    <div key={ comment._id} className="relative flex space-x-2">
                        <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30"/>
                        <img 
                            src={comment.profileImg} 
                            className="h-7 w-7 rounded-full object-cover"
                            alt="" 
                        />
                        <div>
                            <div className="flex items-center space-x-1">
                                <p className="mr-1 font-bold">{comment.username}</p>
                                <p className="hidden text-sm text-gray-500 lg:inline">
                                    @{comment.username.replace(/\s+/g, '').toLowerCase()} ·
                                </p>
                                <TimeAgo 
                                    className="text-sm text-gray-500"
                                    date={comment._createdAt}
                                />
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                    ))
                }
            </div>
        )}

    </div>
  )
}

export default Tweet