
import React from 'react';
import { useRouter } from 'next/router';

type Posts = {
    uid: string
}

const UserPosts: React.FC<Posts> = () => {
    const router = useRouter();
    const { uid } = router.query;
    return (
        <div>uid: {uid} </div>
    )
};

export default UserPosts;