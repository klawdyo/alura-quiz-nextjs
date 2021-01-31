import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  width:100%;
  padding:15px;
  font-size:14px;
  border:1px solid ${({ theme }) => theme.colors.primary};
  color:${({ theme }) => theme.colors.contratsText};
  background-color:${({ theme }) => theme.colors.mainBg};
  border-radius:${({ theme }) => theme.colors.borderRadius};
  outline:0;
  margin-bottom:25px;

`;

/**
 * Com o styled components, sempre cria-se o estilizado fora do componente completo.
 * Este componente completo é o que vai receber as funcionalidades. Os estilizados
 * recebem somente estilos mesmo.
 */
function Input({ onChange, placeholder, ...props }) {
  return (
    <InputBase onChange={onChange} placeholder={placeholder} {...props} />
  );
}

export default Input;

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string, // não precisa ser required pois já tem um valor padrão abaixo
};

Input.defaultProps = {
  value: '',
}