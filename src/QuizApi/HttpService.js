/**
 * @Date: 2017-11-20
 * @Copyright: Copyright (c) 2017.
 This  code file/snippet/block, including any other configuration files,
 is for the sole use of the Evive Health, LLC and may contain business
 confidential and privileged information.
 Any unauthorized review, use, disclosure or distribution is prohibited.
 */

const 

methods = {
    GET: 'GET',
    POST: 'POST',
  };
  
  /**
   * Inspect if a response is a redirect and handle accordingly.
   *
   * @param {Response} the Fetch response to inspect
   */
  const raiseRedirectOnly = (response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  };
  
  /**
   * Inspect a request's status code and generate response/error accordingly
   *
   * @param {Object} response The response of the fetch call
   * @returns {Promise} JSON Promise
   */
  const raiseStatus = (response) => {
    if (response.redirected) {
      console.log("redirecion required to login page");
      window.location.href = response.url;
    }
  
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
  
    const error = new Error(response.status);
    error.response = response;
    throw error;
  };
  
  
  /**
   * Inspect's a form submit's status and generates response/error accordingly
   *
   * @param {Object} response The response of the fetch call
   * @returns {String|Promise} String with status text if response has no body, otherwise JSON Promise
   */
  const emptyResponseBody = (response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
    // Otherwise just check the status here and return a status string
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };
  
  const raiseLoginFormStatus = (response) => {
    if (response.redirected) {
      console.log("redirecion required to login page");
      window.location.href = response.url;
    }

    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };
  
  const handleStringResponse = (response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
    // Otherwise just check the status here and return a status string
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };
  
  export {
    raiseRedirectOnly,
    raiseStatus,
    emptyResponseBody,
    raiseLoginFormStatus,
    handleStringResponse,
    methods as HTTP,
  };
  