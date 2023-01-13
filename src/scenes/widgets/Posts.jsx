import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import Post from './Post'
import state from '../../state'
import { Navigate } from "react-router-dom";

const Posts= ({ userId, isProfile = false })=> {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    
    const getPosts = async () => {
        const response = await fetch(`${process.env.SERVER_URL}/posts`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        data.reverse()
        dispatch(setPosts({ posts: data }));
    };
    
    const getUserPosts = async () => {
        const response = await fetch(
        `${process.env.SERVER_URL}/posts/${userId}/posts`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();
        data.reverse()
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
        {posts.map(
            ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            likes,
            comments,
            }) => (
            <Post
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                likes={likes}
                comments={comments}
            />
            )
        )}
        </>
    )
}

export default Posts