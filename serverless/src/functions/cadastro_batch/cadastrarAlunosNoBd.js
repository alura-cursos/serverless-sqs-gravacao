const config = require('../../../config/config.json');
const { fetchApi } = require('../../../utils/fetchHelpers');

module.exports.cadastrarAlunosNoBd = async (alunos) => {
  const alunosPromessas = alunos.map(async (aluno) => {
    return fetchApi(`${config.fetchApi.prod}/alunos`, 'POST', 'application/json', JSON.stringify(aluno));
  });
  const respostas = await Promise.all(alunosPromessas);

  if (respostas.some((resposta) => resposta.statusCode !== 201)) {
    throw new Error('Houve um erro no cadastro de um ou mais alunos');
  }
};
