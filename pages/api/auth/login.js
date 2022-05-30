async function postData(url, email, pass, data = {}) {

  const newUrl = new URL(url)

  newUrl.searchParams.append('email', email)
  newUrl.searchParams.append('password', pass)

  const response = await fetch(newUrl, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin,
    // origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default async (req, res) => {

  const url = `https://stagportl.wpengine.com/?rest_route=/simple-jwt-login/v1/auth`

  try {

    const data = await postData(url, req.body.email, req.body.password)

    res.status(200).json(data);

  } catch (error) {

    res.status(400).json(error)

  }

}
