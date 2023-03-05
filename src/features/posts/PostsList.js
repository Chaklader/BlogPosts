import {useSelector} from "react-redux";
import {selectPostIds, getPostsStatus, getPostsError} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {

    const orderedPostIds = useSelector(selectPostIds)
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    switch (postStatus) {
        case 'loading':
            content = <p>"Loading..."</p>;
            break;
        case 'succeeded':
            content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId}/>)
            break;
        case 'failed':
            content = <p>{error}</p>;
            break;
        default:
            break;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PostsList
