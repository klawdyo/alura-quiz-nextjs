import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: 4px;
  overflow: hidden;
  /* padding:8px 24px; */

  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    /* color: ${({ theme }) => theme.colors.contrastText}; */
  }

  p, ul, li {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    /* color: ${({ theme }) => theme.colors.contrastText}; */
  
  }
`;
Widget.Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

// Estiliza o conteúdo
Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

// Cada uma das alternativas
Widget.Topic = styled.a`
  outline:0;
  text-decoration:none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.primary};
  padding:10px 15px;
  margin-bottom:8px;
  cursor:pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display:block;

  &:hover,&:focus{
    opacity: .5;
  }

  & > input[type=radio]{
    display:none;
  }

  /* & > input[type=radio]:before{
    content:"asd";
  } */

  /* & > input[type="radio"]:checked ~ span{
    color:red;
    font-weight:700;
  } */
`;

export default Widget;
