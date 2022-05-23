// type definition file

export interface Tweet extends TweetBody{
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'tweet'
    blockTweet: boolean
}

export const TweetBody = {
    text: string,
    username: string,
    profileImg: string,
    image?:string
}

export const CommentBody = {
    comment: string,
    tweetId: string,
    username: string,
    profileImg: string,
}

export interface Comment extends CommentBody{
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'comment'
    tweet: {
        _ref: string,
        _type: 'reference'
    }
}