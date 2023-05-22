import React, { useEffect, useRef, useState } from 'react';
import { getPosts } from '../../../utils/getData';
import { useParams } from 'react-router-dom';
import classes from './CourseVideos.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseVideos = () => {
  const { courseId } = useParams();
  const [posts, setPosts] = useState(null);
  const [isPostsLoading, setPostsLoading] = useState(true);
  const [videoLoadings, setVideoLoadings] = useState({});
  useEffect(() => {
    if (posts) {
      const totalFiles = posts.reduce((count, post, index) => {
        const videoFiles = post.files.filter(file =>
          file.file_type.startsWith('video/')
        );
        return count + index * videoFiles.length;
      }, 0);

      const initialLoadings = Array(totalFiles).fill(true);
      setVideoLoadings(initialLoadings);
    }
  }, [posts]);

  const fetchPostsData = async () => {
    setPostsLoading(true);
    try {
      await getPosts(courseId).then(data => {
        setPostsLoading(false);
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

  if (isPostsLoading) {
    return <h1>Loading...</h1>;
  }

  const handleLoadedMetadata = (event, index) => {
    event.target.currentTime = 2;
    setVideoLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  return (
    <div className={classes.container}>
      <ToastContainer />
      {posts && posts.length === 0 && <h1>No videos yet</h1>}
      {posts.length > 0 && (
        <>
          {posts.map((post, postIndex) => {
            const videoFiles = post.files.filter(file =>
              file.file_type.startsWith('video/')
            );
            return videoFiles.length > 0 ? (
              <React.Fragment key={postIndex}>
                {videoFiles.map((file, fileIndex) => {
                  const videoIndex = postIndex * videoFiles.length + fileIndex;
                  return (
                    <a
                      key={videoIndex}
                      href={file.file}
                      target='_blank'
                      className={classes.videoCard}
                    >
                      {videoLoadings[videoIndex] && <div>Loading...</div>}
                      <video
                        className={classes.videoFile}
                        src={file.file}
                        muted
                        onLoadedMetadata={event =>
                          handleLoadedMetadata(event, videoIndex)
                        }
                      />
                      <h3 className={classes.title}>{file.title}</h3>
                    </a>
                  );
                })}
              </React.Fragment>
            ) : null;
          })}
          {posts.every(post =>
            post.files.every(file => !file.file_type.startsWith('video/'))
          ) && <h1>No video files found</h1>}
        </>
      )}
    </div>
  );
};

export default CourseVideos;
