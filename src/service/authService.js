export const login = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const userData = fetch(`http://localhost:8000/api/v1/status`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(result => {
      return result.data;
    }).catch(err => {
      return err
    })

return userData;
}
