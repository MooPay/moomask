import React from 'react'

import { NavLink } from 'react-router-dom'

import {Button, Box, TextField, FormControl, FormHelperText } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { encryptKeyStore } from '../utils/keystore';

import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '../components/header';

import { currentWallet, networkProvider } from '../store/atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding:theme.spacing(2)
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  fieldPassword: {
    marginBottom: theme.spacing(2)
  },
  formButton: {
    marginBottom: theme.spacing(2)
  },
  links: {
    width:'100%',
    display: 'block',
    marginTop: theme.spacing(2)
  }
}));

const helperTextString = 'This password encrypts your private key. Make sure to remember this password as you will need it to unlock your wallet.';
const helperErrorString = 'Invalid Password, should be atleast 8 characters long';


export default function ImportWallet() {
  
  const classes = useStyles( useTheme() );

  const [, setWalletAtom] = useRecoilState(currentWallet)

  const web3 = useRecoilValue(networkProvider)

  const [key, setKey] = React.useState('');

  const [pass, setPass] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [keyError, setKeyError] = React.useState(false);
  const [helperText, setHelperText] = React.useState(helperTextString)

  const [helperKeyText, setHelperKeyText] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    if(!pass || pass.length < 8) {
      setHelperText(helperErrorString)
      setPasswordError(true)
      hasError = true;
    } else {
      setHelperText(helperTextString)
      setPasswordError(false);
    }

    if(!key ) {
      setHelperKeyText('Key invalid');
      setKeyError(true)
      hasError = true;
    } else {
      setHelperKeyText('')
      setKeyError(false)
    }
    
    if(!hasError) {
      try {
        const account = web3.eth.accounts.privateKeyToAccount(key);
        const keystore = encryptKeyStore(pass, key, account.address);
        setWalletAtom({
          address: account.address,
          password: pass,
          keystore: keystore
        });
      } catch(error) {
        setHelperKeyText(error.message);
        setKeyError(true)
      }
    }
    return false;
  }

  return (
    <>
      <Header loggedIn={false} />
      <Box className={classes.root}>
        <div className="auth-logo">
          <img src="images/bscpay.png" alt="MooMask" />
        </div>

        <h1 className="auth-title">MOOMASK</h1>
        
        <form method="post" autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
          <FormControl className={classes.fieldPassword} error={keyError}>
            <TextField id="key" value={key} onChange={e => setKey(e.target.value)}
              aria-describedby="password_helper" type="text" placeholder="Private Key"/>
            <FormHelperText>
              {helperKeyText}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.fieldPassword} error={passwordError}>
            <TextField id="password" value={pass} onChange={e => setPass(e.target.value)}
              aria-describedby="password_helper" type="password" placeholder="New Password(min 8 chars)"/>
            <FormHelperText>
              {helperText}
            </FormHelperText>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" className={classes.formButton}>Import private key</Button>
        </form>
        <NavLink to="/" className={classes.links} >Cancel</NavLink>

      </Box>
    </>
  )
}