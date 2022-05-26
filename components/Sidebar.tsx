import React, { useState } from 'react'
import Image from 'next/image'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import Logo from '../public/images/logo.png'
import { signIn, signOut } from 'next-auth/react'

function Sidebar() {

  const { data: session } = useState()

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
        <div className="relative m-3 h-10 w-10">
          <Image src={Logo} alt="logo" layout="fill" objectFit="cover" />
        </div>
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={MailIcon} title="Messages" />
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow Icon={CollectionIcon} title="Lists" />
        <SidebarRow onClick={ session ? signOut : signIn } Icon={UserIcon} title={ session ? 'Sign out' : 'Sign In' } />
        <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}

export default Sidebar