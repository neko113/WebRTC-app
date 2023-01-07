import * as S from './Header.styles';

interface Props {
  title?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

const Header = ({ title = 'WebRTC App', headerLeft, headerRight }: Props) => {
  return (
    <S.Container>
      {headerLeft && <S.HeaderSide position="left">{headerLeft}</S.HeaderSide>}
      <S.Title>{title}</S.Title>
      {headerRight && <S.HeaderSide position="right">{headerRight}</S.HeaderSide>}
    </S.Container>
  );
};

export default Header;
