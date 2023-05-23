import { getPosts, getSelectedCourses } from '../../../../utils/getData';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Posts.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewPost from '../NewPost/NewPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faVideo,
  faCaretRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
  const { courseId } = useParams();
  const [isOwner, setIsOwner] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [videoHidden, setVideoHidden] = useState([]);
  const [docHidden, setDocHidden] = useState([]);
  const [imageHidden, setImageHidden] = useState([]);



  const fetchCourseData = async () => {
    try {
      await getSelectedCourses(courseId).then(data => {
        if (data.status === 200) {
          const courseData = data.result;
          setIsOwner(courseData.isOwner);
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
    if (posts) {
      setImageHidden(Array(posts.length).fill(true));
      setVideoHidden(Array(posts.length).fill(true));
      setDocHidden(Array(posts.length).fill(true));
    }
  }, [posts]);

  const toggleImageHidden = index => {
    setImageHidden(prevHidden => {
      const newHidden = [...prevHidden];
      newHidden[index] = !newHidden[index];
      return newHidden;
    });
  };

  const toggleVideoHidden = index => {
    setVideoHidden(prevHidden => {
      const newHidden = [...prevHidden];
      newHidden[index] = !newHidden[index];
      return newHidden;
    });
  };

  const toggleDocHidden = index => {
    setDocHidden(prevHidden => {
      const newHidden = [...prevHidden];
      newHidden[index] = !newHidden[index];
      return newHidden;
    });
  };

  const refresh = () => {
    fetchPostsData();
    
  };

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
    fetchCourseData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const renderFiles = (files, idx) => {
    const images = [];
    const videos = [];
    const docs = [];

    files.forEach((file, index) => {
      if (file.file_type.startsWith('image/')) {
        images.push(
          <div className={classes.imageBox} key={index}>
            <a href={file.file} target='_blank'>
              <img src={file.file} alt={file.title} />
            </a>
          </div>
        );
      } else if (file.file_type.startsWith('video/')) {
        videos.push(
          <div className={classes.videoBox} key={index}>
            <a href={file.file} target='_blank'>
              <div className={classes.right}>
                <FontAwesomeIcon icon={faVideo} />
              </div>
              <div>
                <p>{file.title}</p>
                <h6>video</h6>
              </div>
            </a>
          </div>
        );
      } else {
        docs.push(
          <div className={classes.fileBox} key={index}>
            <a href={file.file} target='_blank'>
              <div className={classes.right}>
                <FontAwesomeIcon icon={faFileAlt} />
              </div>
              <div>
                <p>{file.title}</p>
                <h6>file</h6>
              </div>
            </a>
          </div>
        );
      }
    });

    return (
      <>
        {images.length > 0 && (
          <div className={classes.images}>
            <div
              className={classes.hide}
              onClick={() => toggleImageHidden(idx)}
            >
              {imageHidden[idx] ? (
                <FontAwesomeIcon icon={faCaretRight} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}{' '}
              <h5>Images</h5>
            </div>
            {!imageHidden[idx] ? (
              <div className={classes.imagesContainer}>{images}</div>
            ) : (
              ''
            )}
          </div>
        )}
        {videos.length > 0 && (
          <div className={classes.videos}>
            <div
              className={classes.hide}
              onClick={() => toggleVideoHidden(idx)}
            >
              {videoHidden[idx] ? (
                <FontAwesomeIcon icon={faCaretRight} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}{' '}
              <h5>Videos</h5>
            </div>
            {!videoHidden[idx] ? (
              <div className={classes.videosContainer}>{videos}</div>
            ) : (
              ''
            )}
          </div>
        )}
        {docs.length > 0 && (
          <div className={classes.files}>
            <div className={classes.hide} onClick={() => toggleDocHidden(idx)}>
              {docHidden[idx] ? (
                <FontAwesomeIcon icon={faCaretRight} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}{' '}
              <h5>Files</h5>
            </div>
            {!docHidden[idx] ? (
              <div className={classes.filesContainer}>{docs}</div>
            ) : (
              ''
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <ToastContainer />
      {isOwner && (
        <NewPost courseId={courseId} refresh={refresh} />
      )}
      <div className={classes.posts}>
        {posts.length === 0 && <h1>No Posts yet</h1>}
        {posts.map((post, index) => (
          <div className={classes.postContainer} key={index}>
            <div className={classes.topDetail}>
              <div className={classes.title}>
                <h1>{post.title}</h1>
              </div>
              <div className={classes.creationTime}>
                <span>Created at: </span>
                <span className={classes.date}>
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            <div className={`${classes.downDetail} ${classes.middle}`}>
              <div className={classes.description}>
                <span>Description</span>
                <p>{post.description}</p>
              </div>
            </div>
            <div className={classes.downDetail}>
              {post.files && post.files.length > 0 && (
                <div className={classes.filesBlock}>
                  {renderFiles(post.files, index)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
