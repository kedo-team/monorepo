import { useUser } from 'src/stores/user'
import type { IRequest } from '@kedo-team/data-model'
const user = useUser()

const _createRequestParams = {
  url: import.meta.env.VITE_CREATE_REQUEST_ENDPOINT_URL,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorizatoin': `BEARER ${user.jwt}`
    }
  }
}

async function createRequest (req: IRequest) {
  const url = import.meta.env.VITE_CREATE_REQUEST_ENDPOINT_URL
  const reqOptions: RequestInit = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${user.jwt}`
      },
      body: JSON.stringify(req)    
    }
    // ..._createRequestParams.options,
    // ...
    // ...{  }
  
  // fetch API reference
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  try {
    const response = await fetch(url, 
                                reqOptions)
    if (response.ok) {
      const body  = await response.json();
      return body;
    }
    else {
      throw new Error('Случилось хуета')
    }
  } catch (error) {
    console.log('im in catch')
  }
}

export const ActionsProvider = {
  createRequest,
}
