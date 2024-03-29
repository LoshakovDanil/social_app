import { ProfileInfo } from './ProfileInfo/ProfileInfo'

import { MyPostPage } from './MyPosts/PostPage'

type Props = {
  isOwner: boolean
}

export const Profile: React.FC<Props> = ({ isOwner }) => {
  return (
    <div>
      <ProfileInfo isOwner={isOwner} />
      <MyPostPage />
    </div>
  )
}
