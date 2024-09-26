//config to send http headers
export let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    }
  }