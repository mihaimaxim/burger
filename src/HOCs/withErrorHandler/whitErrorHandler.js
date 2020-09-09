import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
   return class extends Component {
      state = {
         error: null,
      };

      componentDidMount() {
         this.reqInterceptor = axios.interceptors.request.use((request) => {
            this.setState({ error: null });
            return request;
         });
         this.resInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
               this.setState({ error: error });
            }
         );
      }

      componentWillUnmount() {
         axios.interceptors.request.eject(this.reqInterceptor);
         axios.interceptors.response.eject(this.resInterceptor);
      }

      errorConfirmedHandler = () => {
         this.setState({ error: null });
      };

      render() {
         return (
            <div>
               <Modal
                  show={this.state.error}
                  clicked={this.errorConfirmedHandler}
               >
                  {this.state.error ? this.state.error.message : null}
               </Modal>
               <WrappedComponent {...this.props} />
            </div>
         );
      }
   };
};

export default withErrorHandler;
