import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

import classes from './Auth.module.css'
import { connect } from 'react-redux'

class Auth extends Component {
   state = {
      controls: {
         email: {
            elementType: 'input',
            valueType: 'email',
            elementConfig: {
               type: 'email',
               placeholder: 'Your email',
            },
            value: '',
            validation: {
               required: true,
               isEmail: true,
               email: new RegExp([
                  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
               ]),
            },
            valid: false,
            touched: false,
         },
         password: {
            elementType: 'input',
            valueType: 'password',
            elementConfig: {
               type: 'password',
               placeholder: 'Your password',
            },
            value: '',
            validation: {
               required: true,
               minimumLength: 6,
            },
            valid: false,
            touched: false,
         },
      },
      formIsValid: false,
      errorMessage: 'Please enter a valid',
      signInMode: true,
   }

   componentDidMount() {}

   componentDidUpdate() {}

   checkValidity = (value, rules) => {
      let isValid = true

      if (!rules) {
         return true && isValid
      }

      if (rules.required) {
         isValid = value !== '' && isValid
      }

      if (rules.nameValidation) {
         isValid = rules.nameValidation.test(value) && isValid
      }

      if (rules.addressValidation) {
         isValid = rules.addressValidation.test(value) && isValid
      }

      if (rules.email) {
         isValid = rules.email.test(value) && isValid
      }

      if (rules.minimumLength) {
         isValid = value.length > rules.minimumLength && isValid // for this each orderFrom validation property should have
      } // a minimumLength property with the desired value

      if (rules.maximumLength) {
         isValid = value.length < rules.maximumLength && isValid // && isValid added so that all checks work togheter
      }
      return isValid
   }

   inputChangedHandler = (event, inputIdentifier) => {
      // console.log(event.target.value);
      const updatedControls = {
         ...this.state.controls,
      }

      const updatedFormElement = { ...updatedControls[inputIdentifier] }

      updatedFormElement.value = event.target.value
      updatedFormElement.valid = this.checkValidity(
         updatedFormElement.value,
         updatedFormElement.validation
      )
      updatedFormElement.touched = true
      updatedControls[inputIdentifier] = updatedFormElement
      // console.log(updatedFormElement);
      let formIsValid = true
      for (let inputIdentifier in updatedControls) {
         formIsValid = updatedControls[inputIdentifier].valid && formIsValid
      }
      this.setState({ controls: updatedControls, formIsValid: formIsValid })
   }

   submitHandler = event => {
      event.preventDefault()
      this.props.onAuth(
         this.state.controls.email.value,
         this.state.controls.password.value,
         this.state.signInMode
      )
   }

   toggleSigningMode = () => {
      this.setState(prevState => {
         return {
            signInMode: !prevState.signInMode,
         }
      })
   }

   render() {
      const formElementsArray = []
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key],
            errorMessage: this.state.errorMessage,
         })
      }

      let form = formElementsArray.map(formElement => (
         <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            valueType={formElement.config.valueType}
            errorMessage={formElement.errorMessage}
         />
      ))

      if (this.props.localLoading) {
         form = <Spinner />
      }

      let errorMessage = null

      if (this.props.localError) {
         errorMessage = <p style={{ color: 'red' }}>{this.props.localError.message}</p>
      }

      return (
         <div className={classes.Auth}>
            <form onSubmit={this.submitHandler}>
               {/* {this.props.localLoading ? <Spinner /> : form} */}
               {errorMessage}
               {form}
               <Button btnType='Success'>
                  {this.state.signInMode ? 'SIGN IN' : 'SIGN UP'}
               </Button>
            </form>
            <Button btnType='Danger' clicked={this.toggleSigningMode}>
               Toggle signing mode
            </Button>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      localToken: state.auth.token,
      localUserId: state.auth.userId,
      localError: state.auth.error,
      localLoading: state.auth.loading,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (email, password, signInMode) =>
         dispatch(actions.auth(email, password, signInMode)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
