import * as yup from 'yup';

const taskValidate = yup.object().shape({
  description: yup.string()
    .required(' O campo descrição é de preenchimento obrigatório!'),
  status: yup.string()
    .required(' O campo status é de preenchimento obrigatório!'),
});

export default taskValidate;
