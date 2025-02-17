declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
    }
  }
  
console.log('API URL:', process.env.REACT_APP_API_URL);  // This should log the API URL if it's working