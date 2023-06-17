import classes from './CourseAssignment.module.css';
import NewAssignment from './NewAssignment/NewAssignment';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  checkIfOwner,
  getCourseAssignments,
  getAssignmentSubmissions,
  createAssignmentSubmission,
  updateAssignmentScore,
} from '../../../utils/getData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'react-hook-form';

const CourseAssignment = () => {
  const { courseId } = useParams();
  const [isOwner, setIsOwner] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [submissionHide, setSubmissionHide] = useState(Array(20).fill(true));
  const [submissionsId, setSubmissionsId] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [grade, setGrade] = useState(null);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [createSubmissionLoading, setCreateSubmissionLoading] = useState(false);

  const fetchIsOwner = async () => {
    const result = await checkIfOwner(courseId);
    setIsOwner(result);
  };

  const toggleSubmissionHidden = index => {
    setSubmissionHide(prevHidden => {
      const newHidden = Array(prevHidden.length).fill(true);
      newHidden[index] = !prevHidden[index];
      return newHidden;
    });
  };

  const fetchAssignments = async () => {
    try {
      await getCourseAssignments(courseId).then(data => {
        if (data.status === 200) {
          const assignmentsData = data.result;
          setAssignments(assignmentsData);
          setLoading(false);
          return;
        } else {
          toast.error('Error: check your data', {});
          return;
        }
      });
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  

  useEffect(() => {
    fetchIsOwner();
    fetchAssignments();
  }, []);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const refresh = () => {
    fetchAssignments();
  };

  const fetchSubmissionsId = async assignmentId => {
    try {
      const data = await getAssignmentSubmissions(courseId, assignmentId);
      if (data.status === 200) {
        setSubmissionsId(data.result.id);
      } else {
        toast.error('Error: check your data', {});
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const fetchSubmissions = async assignmentId => {
    try {
      setSubmissionLoading(true);
      const data = await getAssignmentSubmissions(courseId, assignmentId);
      console.log(data);
      if (data.status === 200) {
        setSubmissions(data.result);
      } else {
        toast.error('Error: check your data', {});
      }
      setSubmissionLoading(false);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const createSubmission = async (courseId, assignmentId, submissionsId) => {
    try {
      const data = await createAssignmentSubmission(
        courseId,
        assignmentId,
        submissionsId,
        file
      );
      if (data.status === 200) {
        toast.success('Assignment submitted successfully!', {});
      } else {
        toast.error('Error: check your data', {});
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const submitAssignmentHandler = async assignmentId => {
    try {
      setCreateSubmissionLoading(true);
      await fetchSubmissionsId(assignmentId);
      await createSubmission(courseId, assignmentId, submissionsId);
      setCreateSubmissionLoading(false);
      window.location.reload();
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const submissionsHandler = async assignmentId => {
    setSubmissions(null);
    try {
      await fetchSubmissions(assignmentId);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const gradeSubmitHandler = async (assignmentId, submissionId) => {
    try {
      const data = await updateAssignmentScore(
        courseId,
        assignmentId,
        submissionId,
        grade
      );
      console.log(data);
      if (data.status === 200) {
        toast.success('Assignment graded successfully!', {});
      } else {
        toast.error('Error: check your data', {});
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  if (isLoading) {
    return (
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</h1>
    );
  }

  console.log(submissions);

  return (
    <div>
      <ToastContainer />
      {isOwner && <NewAssignment courseId={courseId} refresh={refresh} />}
      <div className={classes.assignment}>
        {assignments.length === 0 && (
          <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
            No Assignments
          </h1>
        )}
        {assignments.map((assignment, index) => (
          <div key={index} className={classes.assignmentItem}>
            <div className={classes.assignmentItemHeader}>
              <FontAwesomeIcon
                icon={faFileAlt}
                className={classes.assignmentItemIcon}
              />
              <h3>{assignment.title}</h3>

              <div className={classes.rightInfo}>
                <p>
                  Created at: {new Date(assignment.created_at).toLocaleString()}
                </p>
                <p>
                  Due Date: {new Date(assignment.due_date).toLocaleString()}
                </p>
                <p>Points: {assignment.degree}</p>
              </div>
            </div>

            <div className={classes.assignmentItemBody}>
              <div className={classes.assignmentItemBodyHeader}>
                <h4>Description</h4>
                <p>{assignment.description}</p>
              </div>

              <div
                className={`${classes.assignmentItemFooter} ${
                  isOwner ? classes.flexColumn : ''
                }`}
              >
                <a href={assignment.file} target='_blank' rel='noreferrer'>
                  <button className={classes.assignmentItemButton}>
                    View Assignment
                  </button>
                </a>

                {!isOwner ? (
                  <div className={classes.courseSubmission}>
                    <div className={classes.fileUpload}>
                      <label htmlFor='file'>File</label>
                      <input
                        id='file'
                        type='file'
                        className={classes.fileInput}
                        onChange={handleFileChange}
                      />
                    </div>

                    <button
                      className={classes.assignmentItemButton}
                      disabled={file === null}
                      onClick={() => submitAssignmentHandler(assignment.id)}
                    >
                      Submit Assignment
                    </button>
                    {createSubmissionLoading && (
                      <h5 style={{ textAlign: 'center', marginTop: '20px' }}>
                        Loading...
                      </h5>
                    )}
                    
                  </div>
                ) : (
                  <div className={classes.submissions}>
                    <div
                      className={classes.hide}
                      onClick={() => {
                        toggleSubmissionHidden(index);
                        submissionsHandler(assignment.id);
                      }}
                    >
                      {submissionHide[index] ? (
                        <FontAwesomeIcon icon={faCaretRight} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}{' '}
                      <h5>Submissions</h5>
                      </div>
                      {submissionLoading && (
                        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
                          Loading...
                        </h1>
                      )}
                    {!submissionHide[index] && (
                      <div className={classes.submissionsList}>
                        {submissions && submissions.length === 0 && (
                          <p>No Submissions</p>
                        )}
                        {submissions &&
                          submissions.map((submission, idx) => (
                            <div key={idx} className={classes.submissionItem}>
                              <p>{submission.student.username}</p>
                              <a
                                href={submission.file}
                                target='_blank'
                                rel='noreferrer'
                              >
                                <button
                                  className={classes.submissionItemButton}
                                >
                                  View Submission
                                </button>
                              </a>

                              <p>
                                Submitted at:{' '}
                                {new Date(submission.time).toLocaleString()}
                              </p>

                              <p>Grade: {submission.score}</p>

                              <div className={classes.grade}>
                                <label htmlFor='grade'>Grade</label>
                                <input
                                  id='grade'
                                  type='number'
                                  className={classes.gradeInput}
                                  min='0'
                                  max={assignment.degree}
                                  defaultValue={submission.grade}
                                  onChange={e =>
                                    setGrade(e.target.valueAsNumber)
                                  }
                                />

                                <button
                                  className={classes.gradeButton}
                                  onClick={()=>gradeSubmitHandler(assignment.id, submission.id)}
                                >
                                  Grade
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseAssignment;
