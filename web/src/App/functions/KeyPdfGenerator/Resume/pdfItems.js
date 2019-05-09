import styled from '@react-pdf/styled-components'

export const Body = styled.Page`
  padding-top: 35px;
  padding-bottom: 65px;
  padding-right: 35px;
  padding-left: 35px;
`

export const Header = styled.Text`
  color: grey;
  font-size: 8px;
  text-align: center;
  margin-bottom: 20px;
`

export const Title = styled.Text`
  color: #6a6a6a;
  font-size: 20px;
  text-align: center;
  font-family: 'Times-Roman';
  margin: 20px 0;
`

export const Paragraph = styled.Text`
  color: #6a6a6a;
  margin-top: 12px;
  font-size: 8px;
  text-align: justify;
  font-family: 'Times-Roman';
`

export const Images = styled.Text`
  text-align: center;
`

export const Logo = styled.Image`
  height: 50px;
  width: 150px;
  margin: 15px 100px;
  text-align: center;
`

export const Picture = styled.Image`
  height: 30px;
  width: 60px;
  margin: 25px;
`

export const Code = styled.Text`
  font-size: 12px;
  font-family: 'Times-Roman';
  text-align: center;
  margin-top: 5px;
  padding-top: 5px;
  border-width: 3px;
  border-color: gray;
  border-style: dashed;
}
`
