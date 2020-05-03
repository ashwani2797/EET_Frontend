import { HTTP, raiseStatus, raiseLoginFormStatus } from './HttpService.js';

const GetAnswers = () => (
    fetch('/eet/get-response', {
        credentials: 'same-origin',
        method: HTTP.GET,
    }).then(raiseStatus)
);


const TestIdSet = () => (
    fetch('/eet/check-testid', {
        credentials: 'same-origin',
        method: HTTP.GET,
    }).then(raiseStatus)
);

const ForceLogout = () => fetch('/eet/logout', {
    method: HTTP.GET,
    headers: {
      'cache-control': 'no-cache',
    }
  }).then(raiseLoginFormStatus);


const ValidateUrl = (page) => (
    fetch('/eet/validate-url?page=' + page, {
        credentials: 'same-origin',
        method: HTTP.GET,
    }).then(raiseStatus)
);


const BackendRedirect = () => (
    fetch('/eet/redirect', {
        credentials: 'same-origin',
        method: HTTP.GET,
    }).then(raiseStatus)
);

const BeginQuiz = (testId) => (
    fetch('/eet/begin-quiz?testId=' + testId, {
        credentials: 'same-origin',
        method: HTTP.GET,
    }).then(raiseStatus)
);

const GetQuizDetails = () => (
    fetch('/eet/quiz-details', {
        credentials: 'same-origin',
        method: HTTP.GET,
    }).then(raiseStatus)
);

const SubmitWarning = (noOfWarningsLeft) => (
    fetch('/eet/save-warning?warningsShown=' + noOfWarningsLeft, {
        credentials: 'same-origin',
        method: HTTP.POST,
    })
);

const SubmitAnswers = payload => (
    fetch('/eet/submit-answers', {
        method: HTTP.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
    }).then(raiseStatus)
);

const SubmitFeedback = payload => (
    fetch('/eet/save-feedback?feedback=' + payload, {
        method: HTTP.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    }).then(raiseLoginFormStatus)
);


const RegisterApi = payload => (
    fetch('/eet/register', {
        method: HTTP.POST,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
);




export {
    GetAnswers,
    BackendRedirect,
    BeginQuiz,
    GetQuizDetails,
    SubmitAnswers,
    TestIdSet,
    ValidateUrl,
    RegisterApi,
    SubmitWarning,
    SubmitFeedback,
    ForceLogout
};