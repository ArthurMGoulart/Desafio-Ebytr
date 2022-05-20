import * as yup from 'yup';

const taskValidate = yup.object().shape({
  description: yup.string()
    .required(' O campo descrição é de preenchimento obrigatório!'),
  status: yup.mixed().oneOf(['pendente', 'em andamento', 'pronto'])
    .required('O campo status é de preenchimento obrigatório!')
    .oneOf('O status deve ser: pendente ou em andamento ou pronto'),
});

export default taskValidate;
