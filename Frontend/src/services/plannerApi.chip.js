import axios from './apiClient';

/**
 * ADD this function to your existing services/plannerApi.js
 * (or replace the file's "generate itinerary" call with this one).
 *
 * @param {object} params
 * @param {{lat:number,lng:number}} params.depot
 * @param {number} params.days
 * @param {number} params.maxDailyMinutes
 * @param {number} params.maxVisitMinutes
 * @param {string[]} params.mustInclude
 * @param {string[]} params.mustExclude
 * @param {'car'|'bicycle'|'foot'} params.transportMean
 * @param {number} params.numAlternatives
 */
export const generateItinerary = (params) =>
  axios.post('/planner/generate', params).then((r) => r.data);
