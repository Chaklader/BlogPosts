import {useSelector, useDispatch} from "react-redux";
import {selectAllPosts, getPostsStatus, getPostsError, fetchPosts} from "./postsSlice";
import {useEffect} from "react";
import PostsExcerpt from "./PostsExcerpt";
import {nanoid} from "@reduxjs/toolkit";

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    switch (postStatus) {
        case 'loading':
            content = <p>Loading...</p>;
            break;
        case 'succeeded':
            const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
            content = orderedPosts.map(post => <PostsExcerpt key={nanoid()} post={post}/>);
            break;
        case 'failed':
            content = <p>{error}</p>;
            break;
        default:
            content = null;
            break;
    }


    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}
export default PostsList
