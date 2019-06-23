export const validateEvent = (event, file) => {
  if (event.title === '') return 'Nome é obrigatório!';
  if (event.place === '') return 'Local é obrigatório!';
  if (event.date === '' || event.date === 'T' || event.date.split('T').length < 2) return 'Data e hora são obrigatórios!';
  if (event.description === '') return 'Descrição é obrigatória!';
  if (!file) return 'Imagem é obrigatória!';
  return false;
};
