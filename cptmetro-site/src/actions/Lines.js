export const SELECT_LINE = 'SELECT_LINE';
export const FETCH_LINES = 'FETCH_LINES';

export const selectLine = line => ({
  type: SELECT_LINE,
  payload: line
});

export const featchLines = () => {
  const url = 'http://cptmetro.margis.com.br/.netlify/functions/lines';
  const request = fetch(url).then(res => res.json()).then(data => data);

  return {
    type: FETCH_LINES,
    payload: request
  };
};
