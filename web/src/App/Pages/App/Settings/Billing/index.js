import React, { useState } from 'react';
import styles from './styles.css';
import Button from 'App/components/Parts/Button';
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL';


const Billing = ({children}) => {
  const userBilling = false

  let [dataLink] = useState(0);


  const addCreditCard = () =>{
    console.log(dataLink)
  }




  if (userBilling) {
    return (
    <div className={styles.container}>
      Datos del usuario...
    </div>
    )
  } else {
    return (
    <div className={styles.container}>
      <div>No tienes una cuenta bancaria asignada a tu cuenta</div>
      <div >
        <Button onClick={addCreditCard}> Añadir cuenta </Button>
      </div>
    </div>
    )
  }
}

export default Billing
