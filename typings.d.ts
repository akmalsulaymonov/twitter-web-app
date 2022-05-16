// type definition file

export interface Tweet extends TweetBOdy{
    _id: string
    _createdAt: string
    _updatedAT: string
    _rev: string
    _type: 'tweet'
    blockTweet: boolean
}

export const TweetBOdy = {
    text: string,
    username: string,
    profileImg: string,
    image?:string
}