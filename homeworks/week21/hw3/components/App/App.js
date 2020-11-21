/*eslint-disable*/
import React, { useState } from 'react';
import styled from 'styled-components';
import FormHeader from './FormHeader';
import FormBody from './FormBody';

const Form = styled.div`
  width: 645px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  margin: 0 auto;
  border-top: solid 8px #fad312;
`;

const FormBox = styled.div`
  padding: 54px 0px 35px 42px;
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #000000;
  margin-top: 66px;
`;

const Footer = styled.div`
  color: #999999;
  font-size: 13px;
  text-align: center;
  line-height: 60px;
`;

const formList = [
  {
    title: '暱稱',
    subtitle: '',
    isrequired: "true",
    type: 'text',
    name: 'nickname',
    placeholder: '您的暱稱',
  },
  {
    title: '電子信箱',
    subtitle: '',
    isrequired: "true",
    type: 'text',
    name: 'email',
    placeholder: '您的電子郵件信箱',
  },
  {
    title: '手機號碼',
    subtitle: '',
    isrequired: "true",
    type: 'text',
    name: 'mobile',
    placeholder: '您的手機號碼',
  },
  {
    title: '報名類型',
    subtitle: '',
    isrequired: "true",
    type: 'radio',
    name: 'signUpType',
    placeholder: '',
    radioData: [
      {
        id: 'image',
        content: '躺在床上用想像力實作',
      },
      {
        id: 'phone',
        content: '趴在地上滑手機找現成的',
      }
    ],
  },
  {
    title: '怎麼知道這個活動的？',
    subtitle: '',
    isrequired: "true",
    type: 'text',
    name: 'campaign',
    placeholder: '您的回答',
  },
  {
    title: '其他',
    subtitle: '對活動的一些建議',
    isrequired: "false",
    type: 'text',
    name: 'others',
    placeholder: '您的回答',
  },
]

function verifyAnswerIsEmpty(answers, formList) {
  let line = 0
  for(let answer in answers) {
    for(let item of formList) {
      if(item.name === answer && item.isrequired === "true" && answers[answer] === '') {
        line += 1
      }
    }
  }
  if(line > 0) {
    return true
  }
  return false
}

function App() {
  const [isSubmit, setIsSubmit] = useState(false)
  const [answers, setAnswers] = useState({
    nickname: '',
    email: '',
    mobile: '',
    signUpType: '躺在床上用想像力實作',
    campaign: '',
    others: '',
  })

  const handleInputChange = (e) => {
    let targetName = e.target.name
    let targetValue = e.target.value
    setAnswers({
      ...answers,
      [targetName]: targetValue,
    })
    if(targetValue === '') {
      setAnswers({
        ...answers,
        [targetName]: targetValue,
      })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true)
    if(!verifyAnswerIsEmpty(answers, formList)) {
      alert(`
        暱稱：${answers.nickname}
        電子信箱：${answers.email}
        手機號碼：${answers.mobile}
        報名類型：${answers.signUpType}
        怎麼知道這個活動的：${answers.campaign}
        其他：${answers.others}
      `)
      setAnswers({
        nickname: '',
        email: '',
        mobile: '',
        signUpType: '躺在床上用想像力實作',
        campaign: '',
        others: '',
      })
      setIsSubmit(false)
    }
  }

  return (
    <div>
      <Form>
        <FormBox>
          <FormHeader />
          <FormBody 
            handleInputChange={handleInputChange} 
            handleFormSubmit={handleFormSubmit}
            formList={formList}
            answers={answers}
            isSubmit={isSubmit}  />
        </FormBox>
      </Form>
      <FooterContainer>
        <Footer>
          © 2020 © Copyright. All rights Reserved.
        </Footer>
      </FooterContainer>
    </div>
  );
}

export default App;
