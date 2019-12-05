import React, { useState } from 'react';
import axios from "axios";
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCoun] = useState(0);

/*  axios.get('http://localhost:3003/api/teachers')
  .then(function (response) {
    // handle success
    const teachers = response.data.docs;
    teachers.map((item)=>{
        console.log(item);
    })
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.post('http://localhost:3003/api/teachers', {
    name: 'Fred',
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
*/
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCoun(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;