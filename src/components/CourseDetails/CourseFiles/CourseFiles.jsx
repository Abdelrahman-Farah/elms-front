import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../../../utils/getData';
import classes from './CourseFiles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const CourseFiles = () => {
  const { courseId } = useParams();
  const [posts, setPosts] = useState(null);
  const [isPostsLoading, setPostsLoading] = useState(true);
  let countFiles = true;

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

  return (
    <div className={classes.container}>
      <ToastContainer />
      {posts && posts.length === 0 && <h1>No files yet</h1>}
      {posts.length > 0 && (
        <>
          {posts.map((post, postIndex) => {
            const docsFiles = post.files.filter(
              file =>
                !file.file_type.startsWith('video/') &&
                !file.file_type.startsWith('image/')
            );countFiles = docsFiles.length;
            return docsFiles.length > 0 ? (
              <React.Fragment key={postIndex}>
                {docsFiles.map((file, fileIndex) => {
                  const docsIndex = postIndex * docsFiles.length + fileIndex;
                  return (
                    <a
                      key={docsIndex}
                      href={file.file}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={classes.docsCard}
                    >
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        className={classes.icon}
                      />
                      <h3 className={classes.title}>{file.title}</h3>
                    </a>
                  );
                })}
              </React.Fragment>
            ) : null;
          })}
          {countFiles === 0 && <h1>No files yet</h1>}
        </>
        
      )}
    </div>
  );
};

export default CourseFiles;
