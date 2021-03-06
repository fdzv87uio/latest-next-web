import React, { useState } from 'react'
import * as S from '../../styles/terms_and_conditions.styles'
import WhiteHeader from '../common/white-header/WhiteHeader'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert'

const TermsAndConditions = (): JSX.Element => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>()
  const [terms, setTerms] = useState(false)
  const [age, setAge] = useState(false)

  const validateInputs = () => {
    if (terms == false) {
      setAlertMessage('Error: you must agree with our terms and conditions')
      setShowAlert(true)
      return
    } else if (age == false) {
      setAlertMessage('Error: you must be at least 18 years of age to enter')
      setShowAlert(true)
      return
    } else {
      window.location.href = '/pose-estimation'
    }
  }

  return (
    <S.PageWrapper>
      <WhiteHeader url={'/'} />
      <Collapse in={showAlert}>
        <Alert
          onClose={() => {
            setShowAlert(false)
          }}
          variant="filled"
          severity="error"
        >
          {alertMessage}
        </Alert>
      </Collapse>
      <S.LogoContainer>
        <img src="../../public/images/logo.png" alt="Picture of the author" />
      </S.LogoContainer>
      <S.FormWrapper>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={() => {
                  if (terms == false) {
                    setTerms(true)
                  } else {
                    setTerms(false)
                  }
                }}
                name="terms-and-conditions"
              />
            }
            label={
              <p>
                I agree to the <a href="#">terms and conditions</a>
              </p>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={() => {
                  if (age == false) {
                    setAge(true)
                  } else {
                    setAge(false)
                  }
                }}
                name="age"
              />
            }
            label={<p>I am 18 years of age or older</p>}
          />
        </FormGroup>
      </S.FormWrapper>
      <S.CustomButton
        onClick={() => {
          validateInputs()
        }}
        variant="contained"
        color="primary"
      >
        Next
      </S.CustomButton>
    </S.PageWrapper>
  )
}

export default TermsAndConditions
