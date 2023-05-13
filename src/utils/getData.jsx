export const api_url = 'http://127.0.0.1:8000';
export const auth = 'JWT ' + localStorage.getItem('access_token');

export function getCourses() {
  return fetch(api_url + '/dashboard/course/', {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: auth,
    },
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

export function enrollCourse(JoinCode) {
  let error = false;
  return fetch(api_url + '/dashboard/enrollments/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: auth,
    },
    body: JSON.stringify({
      join_code: JoinCode,
    }),
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

export function createCourse(title, description, avatar) {
  let error = false;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (avatar) {
    formData.append('avatar', avatar);
  }
  return fetch(api_url + '/dashboard/course/', {
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

export function updateCourse(courseId, title, description, avatar) {
  let error = false;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (avatar) {
    formData.append('avatar', avatar);
  }
  return fetch(api_url + `/dashboard/course/${courseId}/`, {
    method: 'PATCH',
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

export function deleteCourse(courseId) {
  return fetch(api_url + `/dashboard/course/${courseId}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: auth,
    },
  })
    .then(response => {
      return  response;
    });
}
