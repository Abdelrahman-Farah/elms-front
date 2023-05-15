import { getPosts, createPost } from '../../../../utils/getData';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Posts.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewPost from '../NewPost/NewPost';

const Posts = () => {
  const { courseId } = useParams();
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchPostsData = async () => {
    setLoading(true);
    try {
      await getPosts(courseId).then(data => {
        setLoading(false);
        if (data.status === 200) {
          setPosts(data.result);
          return;
        } else {
          toast.error('Error: check your data', {});
          return;
        }
      });
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  const [files, setFiles] = useState([]);

  const handleChange = event => {
    setFiles([...files, ...event.target.files]);
  };
  console.log(files);
  const handler = async event => {
    event.preventDefault();

    try {
      await createPost(courseId, 'title', 'description', files).then(
        response => {
          console.log(response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <NewPost courseId={courseId} />
      {posts.map(post => (
        <div className={classes.postContainer}>
          <div className={classes.topDetail}>
            <div className={classes.title}>
              <h1>{post.title}</h1>
            </div>
          </div>
          <div className={classes.downDetail}></div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
