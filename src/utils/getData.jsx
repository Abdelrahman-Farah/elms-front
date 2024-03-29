export const api_url = 'https://elms.fly.dev';
export const auth = 'JWT ' + localStorage.getItem('access_token');

export function checkIfOwner(classroom_id) {
  return fetch(api_url + `/dashboard/course/${classroom_id}/is-owner/`, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) return 1; // user is the owner
    else if (response.status === 403) return 0; // user isn't owner
    else if (response.status === 401) return -1; // user isn't logged in
    else if (response.status === 400) return -2; // classroom not found
  });
}



export function getCourses() {
  return fetch(api_url + "/dashboard/course/", {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function getSelectedCourses(id) {
  return fetch(api_url + `/dashboard/course/${id}/`, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function enrollCourse(JoinCode) {
  let error = false;
  return fetch(api_url + "/dashboard/enrollments/", {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
    body: JSON.stringify({
      join_code: JoinCode,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error = true;
        return response.json();
      }
    })
    .then((response) => {
      return { response, error };
    });
}

export function createCourse(title, description, avatar) {
  let error = false;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (avatar) {
    formData.append("avatar", avatar);
  }
  return fetch(api_url + "/dashboard/course/", {
    method: "POST",
    headers: {
      Authorization: auth,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error = true;
        return response.json();
      }
    })
    .then((response) => {
      return { response, error };
    });
}

export function updateCourse(courseId, title, description, avatar) {
  let error = false;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (avatar instanceof File) {
    formData.append("avatar", avatar);
  } else if (typeof avatar === "string" && avatar.startsWith("http")) {
    // Fetch the file from the URL and append it to the FormData
    fetch(avatar)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
        formData.append("avatar", file);
      })
      .catch((error) => {
        console.error("Error fetching avatar:", error);
      });
  }
  return fetch(api_url + `/dashboard/course/${courseId}/`, {
    method: "PUT",
    headers: {
      Authorization: auth,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error = true;
        return response.json();
      }
    })
    .then((response) => {
      return { response, error };
    });
}

export function deleteCourse(courseId) {
  return fetch(api_url + `/dashboard/course/${courseId}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    return response;
  });
}

export function getPosts(courseId) {
  return fetch(api_url + `/dashboard/course/${courseId}/post/`, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function createPost(courseId, title, description, files) {
  let error = false;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  }
  return fetch(api_url + `/dashboard/course/${courseId}/post/`, {
    method: "POST",
    headers: {
      Authorization: auth,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error = true;
        return response.json();
      }
    })
    .then((response) => {
      return { response, error };
    });
}

export function getQuizzes(classroom_id) {
  return fetch(api_url + `/dashboard/course/${classroom_id}/quiz-model/`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    return response.json().then((data) => {
      return {
        result: data,
        status: response.status,
      };
    });
  });
}

export function deleteQuiz(classroom_id, quiz_model_id) {
  return fetch(
    api_url + `/dashboard/course/${classroom_id}/quiz-model/${quiz_model_id}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        Authorization: auth,
      },
    }
  ).then(response => {
    return response.status;
  });
}

export function searchCourse(searchValue) {
  return fetch(api_url + `/dashboard/course/${"?search=" + searchValue}`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function getUserData() {
  return fetch(api_url + "/auth/users/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  }).then((result) => {
    if (result.status === 200) {
      return result.json().then((data) => {
        return {
          result: data,
          status: result.status,
        };
      });
    } else {
      return result.status;
    }
  });
}

export function updateUserData(firstName, lastName, profilePicture) {
  let error = false;
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  if (profilePicture instanceof File) {
    formData.append('profile_picture', profilePicture);
  } else if (
    typeof profilePicture === 'string' &&
    profilePicture.startsWith('http')
  ) {
    // Fetch the file from the URL and append it to the FormData
    fetch(profilePicture)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
        formData.append("profile_picture", file);
      })
      .catch((error) => {
        console.error("Error fetching avatar:", error);
      });
  }
  return fetch(api_url + "/auth/users/me/", {
    method: "PUT",
    headers: {
      Authorization: auth,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error = true;
        return response.json();
      }
    })
    .then((response) => {
      return { response, error };
    });
}

export function getCourseLearners(courseId) {
  return fetch(api_url + `/dashboard/course/${courseId}/learners/`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function deleteLearner(courseId, learnerId) {
  return fetch(
    api_url + `/dashboard/course/${courseId}/learners/${learnerId}/`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        Authorization: auth,
      },
    }
  ).then(response => {
    return response;
  });
}

export function sendMeetingLink(
  courseId,
  description,
  startTime,
  endTime
) {
  const data = {
    summary: 'meetingLink',
    description: description,
    start_time: startTime,
    end_time: endTime,
  };
  return fetch(api_url + `/dashboard/course/${courseId}/events/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: auth,
    },
    body: JSON.stringify(data),
  }).then(response => {
    return response;
  });
}

export function createCourseAssignment(
  courseId,
  title,
  description,
  dueDate,
  degree,
  file
) { 
  let error = false;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('due_date', dueDate);
  formData.append('degree', degree);
  if (file) {
    formData.append('file', file);
  }
  return fetch(api_url + `/dashboard/course/${courseId}/assignments/`, {
    method: 'POST',
    headers: {
      Authorization: auth,
    },
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        error = true;
        return response.json();
      }
    })
    .then(response => {
      return { response, error };
    });
}

export function getCourseAssignments(courseId) {
  return fetch(api_url + `/dashboard/course/${courseId}/assignments/`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: auth,
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function getAssignmentSubmissions(courseId,assignmentId) {
  return fetch(
    api_url +
      `/dashboard/course/${courseId}/assignments/${assignmentId}/submissions/`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        Authorization: auth,
      },
    }
  ).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function createAssignmentSubmission(
  courseId,
  assignmentId,
  submissionId,
  file
) {
  let error = false;
  console.log(submissionId);
  const formData = new FormData();
  formData.append('status', true);
  formData.append('file', file);
  return fetch(
    api_url +
      `/dashboard/course/${courseId}/assignments/${assignmentId}/submissions/${submissionId}/`,
    {
      method: 'PUT',
      headers: {
        Authorization: auth,
      },
      body: formData,
    }
  )
    .then(response => { console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        error = true;
        return response.json();
      }
    })
    .then(response => {
      return { response, error };
    });
}

export function updateAssignmentScore(
  courseId,
  assignmentId,
  submissionId,
  score
) {
  const data = {
    score: score,
  };
  return fetch(
    api_url +
      `/dashboard/course/${courseId}/assignments/${assignmentId}/submissions/${submissionId}/`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        Authorization: auth,
      },
      body: JSON.stringify(data),
    }
  ).then(response => {
    return response;
  });
}

export function getChatContacts() {
  return fetch(api_url + `/chat/chat/`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function getContactDetail(participantID) {
  return fetch(api_url + `/chat/contact/` + participantID + "/", {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function getAllContacts() {
  return fetch(api_url + `/chat/contact/`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}

export function createChat(participant_id) {
  return fetch(api_url + `/chat/chat/`, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
    body: JSON.stringify({
      participants: [participant_id],
    }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}
export function searchContacts(name){
  return fetch(api_url + `/chat/contact/?search=${name}`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Authorization: auth,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return {
          result: data,
          status: response.status,
        };
      });
    } else {
      return response.status;
    }
  });
}