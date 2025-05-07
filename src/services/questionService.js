import API from './axios.js';

export function getQuestionsByQuizId(quizId) {
  return API.get(`/quizzes/admin/quizzes/${quizId}/questions`)
            .then(res => res.data);
}

export function createQuestion(quizId, payload) {
  return API.post(`/quizzes/admin/quizzes/${quizId}/questions`, payload)
            .then(res => res.data);
}

// src/services/questionService.js

export function updateQuestion(quizId, questionId, payload) {
  return API.patch(
    `/quizzes/admin/quizzes/${quizId}/questions/${questionId}`,
    payload
  ).then(res => res.data);
}


export function deleteQuestion(quizId, questionId) {
  return API.delete(
    `/quizzes/admin/quizzes/${quizId}/questions/${questionId}`
  ).then(res => res.data);
}

export default {
  getQuestionsByQuizId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
