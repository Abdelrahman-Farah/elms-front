import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import styles from './AllQuizResults.module.css'

import { api_url, auth } from "../../../utils/getData";
import { checkIfOwner } from "../../../utils/getData";

import { headers, sortData, SortButton } from './sort_table';

import { CsvGenerator } from './csv_generator';


function AllQuizResults() {
  let { courseId } = useParams();
  let { quiz_model_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [quizResults, setQuizResults] = useState({});
  const [error, setError] = useState(null);

  const [sortKey, setSortKey] = useState("score");
  const [sortOrder, setSortOrder] = useState("Descending");


  async function fetchAllQuizResults() {
    return await fetch(`${api_url}/dashboard/course/${courseId}/quiz-model/${quiz_model_id}/result/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": auth,
      },
    })
      .then((res) => {
        if (res.status == 200)
          return res.json();

        else
          throw res.json();
      })
      .then(
        (result) => {
          setQuizResults(result);
          return {
            result: result,
            status: 200,
          };
        },
        (error) => {
          return error
        }
      ).then((err) => {
        if (err.status != 200) {
          setError([err['detail']]);
        }

        setIsLoading(false);
        return err;
      })
  }

  useEffect(() => {
    checkIfOwner(courseId).then(
      (val) => {
        if (val != 1) {
          let url = window.location.href;
          url = url.replace('/all-students-results', '/result')
          window.location.replace(url);
        }
      }
    )
    fetchAllQuizResults()
  }, []);

  const sortedData = useCallback(() =>
    sortData({ tableData: quizResults['students_info'], sortKey, reverse: sortOrder === "Descending", data: quizResults['students_info'] })
    , [quizResults, sortKey, sortOrder]
  );

  function changeSort(key) {
    setSortOrder(sortOrder === "Ascending" ? "Descending" : "Ascending");
    setSortKey(key);
  }

  if (isLoading) {
    return (
      <div
        className={styles['all-quiz-results-bg']}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Spinner animation="border" variant="primary" style={{ width: "5.5rem", height: "5.5rem" }} />
      </div>
    )
  }
  return (
    <div className={styles['wrapper']}>
      {error?.map(err => <Alert key={err} variant='danger'> {err} </Alert>)}
      {
        !error && (
          <>
            <Table striped bordered style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)" }}>
              <thead>
                <tr>
                  {headers.map((row) => {
                    return (
                      <td key={row.key} onClick={() => changeSort(row.key)} className={styles['table-heading']}>
                        {row.label}{" "}
                        <SortButton
                          columnKey={row.key}

                          {...{
                            sortOrder,
                            sortKey,
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {sortedData()?.map((person) => {
                  return (
                    <tr key={person.id}>
                      <td>{person.id}</td>
                      <td>{person.full_name}</td>
                      <td>{person.email}</td>
                      <td>{person.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Button variant="outline-success"
              onClick={() => {
                const csvGenerator = new CsvGenerator(
                  sortedData(),
                  ['Full Name', 'Email', `Score out of ${quizResults['total']}`],
                  ['full_name', 'email', 'score'],
                  `All results of ${quizResults['title']} (${sortOrder} ${sortKey}).csv`
                );
                csvGenerator.download(false);
              }}>
              <b style={{ fontSize: "24px" }}>Download table as CSV file</b>
            </Button>
          </>
        )
      }

    </div>
  )
}

export default AllQuizResults