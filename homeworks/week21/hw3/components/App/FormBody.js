/*eslint-disable*/
import React from 'react';
import styled from 'styled-components';

const FormBodyBlock = styled.form``;

const FormInputTitle = styled.div`
  font-size: 20px;
  color: #000000;
  padding: 10px 0;
  display: flex;
  margin-top: 20px;
`;

const Notice = styled.p`
  color: #e74149;
  font-size: 30px;
  margin-left: 5px;
`;

const FormInputSubtitle = styled.div`
  font-size: 14px;
  padding: 1rem 0;
`;

const FormInput = styled.input`
  border: solid 1px #d0d0d0;
  width: 287px;
  height: 23px;
`;

const FormRadioContainer = styled.div`
  padding: 0 16px 0 0;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  position: relative;
  font-size: 14px;
`;

const RadioButtonLabel = styled.label``;

const SubmitButton = styled.button`
  width: 92px;
  height: 40px;
  border-radius: 3px;
  background-color: #fad312;
  color: #000000;
  font-size: 15px;
  margin-top: 20px;
`;

const SubmitNotice = styled.div`
  padding: 21px 0px 0px 0px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  display: block;
  margin: 5px 0 20px 0;
`;

function FormInputBlock({formData, answers, handleInputChange, isSubmit}) {
  const {title, subtitle, isrequired, type, name, placeholder, radioData} = formData
  return (
    <div>
      <FormInputTitle>
        {title}
        {isrequired === 'true' && <Notice>*</Notice>}
      </FormInputTitle>
      {subtitle ? (<FormInputSubtitle>{subtitle}</FormInputSubtitle>) : ''}
      {type === 'text' ? 
        <FormInput 
          type={type} 
          name={name} 
          placeholder={placeholder} 
          value={answers[name]} 
          isrequired={isrequired}
          onChange={handleInputChange}
        /> : (
        <FormRadioContainer>
          {radioData.map(({id, content}, key) => (
            <RadioItem key={key}>
              <input
                type={type} 
                name={name} 
                id={id} 
                value={content} 
                isrequired={isrequired}
                checked={answers[name] === content}
                onChange={handleInputChange}
                readOnly
              />
              <RadioButtonLabel htmlFor={id}>{content}</RadioButtonLabel>
            </RadioItem>
          ))}
        </FormRadioContainer>
      )}
      {isSubmit && isrequired === "true" && answers[name] === '' && <ErrorMessage>欄位不得為空</ErrorMessage>}
    </div>
  )
}

function SubmitButtonBlock() {
  return (
    <div>
      <SubmitButton type='submit' value='submit'>提交</SubmitButton>
      <SubmitNotice>
        請勿透過表單送出您的密碼。
      </SubmitNotice>
    </div>
  )
}

export default function FormBody({answers, isSubmit, formList, handleFormSubmit, handleInputChange}) {
  return (
    <FormBodyBlock onSubmit={handleFormSubmit}>
      {formList.map((formData, key) => (
        <FormInputBlock
          key={key}
          formData={formData}
          answers={answers}
          handleInputChange={handleInputChange}
          isSubmit={isSubmit}
        />
      ))}
      <SubmitButtonBlock />
    </FormBodyBlock>
  )
}