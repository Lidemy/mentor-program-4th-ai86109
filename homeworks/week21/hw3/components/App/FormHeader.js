/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

const FormHeaderBlock = styled.div``;

const FormHeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormHeaderInfoParagraph = styled.div`
  font-size: 16px;
  line-height: 2em;
`;

const FormHeaderNotice = styled.div`
  color: #e74149;
  font-size: 16px;
  margin: 22px 0px 55px 0px;
`;

function FormHeaderInfo() {
  return (
    <div>
      <FormHeaderInfoParagraph>
        活動日期：2020/12/10 ~ 2020/12/11
      </FormHeaderInfoParagraph>
      <FormHeaderInfoParagraph>
        活動地點：台北市大安區新生南路二段1號
      </FormHeaderInfoParagraph>
    </div>
  )
}

export default function FormHeader() {
  return (
    <FormHeaderBlock>
      <FormHeaderTitle>
        新拖延運動報名表單
      </FormHeaderTitle>
      <FormHeaderInfo />
      <FormHeaderNotice>
        *必填
      </FormHeaderNotice>
    </FormHeaderBlock>
  )
}