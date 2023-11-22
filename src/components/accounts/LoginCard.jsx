// React 및 스타일드 컴포넌트 가져오기
import React, { useState } from "react";
import styled from "styled-components";

// 색상 테마 정의
const colors = {
  mainBlue: "#8ab4f8", // 메인 색상
  white: "#FFFFFF",
  black: "#000000",
  gray: "#cccccc",
  hoverBlue: "#729fcf",
  hoverGray: "#999999"
};

// 스타일 컴포넌트 정의
const Container = styled.div`
  padding-top: 80px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0; // 배경색 지정
`;

const TitleWrapper = styled.div`
  color: ${colors.mainBlue};
  font-size: 200%;
  font-weight: 700;
  margin-bottom: 8%;
`;

const Form = styled.form`
  width: 96%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5%;
`;

const Input = styled.input`
  padding: 14px;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 2px solid ${colors.mainBlue};
  }

  &::placeholder {
    font-weight: 400;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
`;

const Button = styled.button`
  width: 48%;
  padding: 10px 0;
  color: ${colors.white};
  background-color: ${props => props.bgcolor};
  border: none;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover{
    background-color: ${props => props.hoverColor};
  }
`;

// 로그인 카드 컴포넌트
function LoginCard(props) {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    isChecked: true,
  });

  // 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 구현
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === "isChecked" ? checked : value,
    }));
  };

  return (
    <Container>
      <TitleWrapper>Manager's Page</TitleWrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="id"
          value={formData.id}
          placeholder="Username"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* 로그인 상태 유지 체크박스 */}
        <div style={{ display: "flex", marginTop: '10px', alignItems: 'center' }}>
          <input
            type="checkbox"
            name="isChecked"
            checked={formData.isChecked}
            onChange={handleChange}
          />
          <p style={{ marginLeft: '5px' }}>로그인 상태 유지</p>
        </div>
        <ButtonWrapper>
          <Button
            type="submit"
            bgcolor={colors.mainBlue}
            hoverColor={colors.hoverBlue}
          >
            Login
          </Button>
          <Button
            type="button"
            bgcolor={colors.gray}
            hoverColor={colors.hoverGray}
            onClick={() => {/* 취소 로직 구현 */ }}
          >
            Cancel
          </Button>
        </ButtonWrapper>
      </Form>
      {/* 회원가입 유도 텍스트 */}
      <div style={{ marginBottom: '20px' }}>

        Don't have an account? <span style={{ textDecoration: 'underline', color: colors.mainBlue, cursor: 'pointer' }} onClick={props.handleMode}>Register</span>
      </div>
    </Container>
  );
}

export default LoginCard;
