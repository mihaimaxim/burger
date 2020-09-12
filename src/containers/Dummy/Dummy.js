import React, { Component } from 'react';

class Dummy extends Component {
   state = {
      person: {
         fullName: {
            name: 'Michael',
            surname: 'Maxim',
         },
         family: {
            parents: {
               mom: 'Leana',
               dad: 'Adrian',
            },
         },
      },
   };

   render() {
      const stateCopy = { ...this.state.person };
      const deeperStateCopy = { ...stateCopy.family };
      const deeperStateCopyTwo = { ...stateCopy.fullName };

      return;
   }
}

export default Dummy;
