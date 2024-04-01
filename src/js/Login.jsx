// src/js/Login.jsx
import React, { useState , useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import '../css/login.css';

const firebaseConfig = {
  apiKey: "AIzaSyCtjchwiIcyzeNbx7XLo9ekldPsVmVcs5A",
  authDomain: "mentor-hec.firebaseapp.com",
  projectId: "mentor-hec",
  storageBucket: "mentor-hec.appspot.com",
  appId: "1:852168196060:web:f0cb26536636a1a0ca1919",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

async function authSignInWithGoogle(name, firstName) {
  signInWithPopup(auth, provider)
    .then(() => {
      console.log("Signed in with Google")
    }).catch((error) => {
      console.error(error.message)
    })
}

function authSignInWithEmail(emailInputEl, passwordInputEl) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, emailInputEl, passwordInputEl)
      .then(() => {
        console.log('Signed In with email');
        resolve();
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
        reject(error);
      });
  });
}

async function authCreateAccountWithEmail(name, firstName, email, password, phoneNumber) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;
    const userData = {
      name: name,
      firstName: firstName,
      email: user.email,
      phoneNumber: phoneNumber,
    };
    await addDoc(collection(db, `users/${userId}/profile`), userData);
  } catch (error) {
    console.error("Error creating account:", error);
  }
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      console.log('Signed Out')
    }).catch((error) => {
      console.error(error.message)
    })
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Extrait l'état loggedIn dans le local storage
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus === 'true') {
      setLoggedIn(true);
    }
  }, []);

  // réiitialiser ce statut lorsque l'utilisateur quitte le site (et non quand il change de page)
  useEffect(() => {
    const beforeUnloadHandler = (event) => {
      setLoggedIn(false);
      localStorage.setItem('loggedIn', 'false');
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setEmail('');
    setPassword('');
    setName('');
    setFirstName('');
    setPhoneNumber('');
    setError(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    authSignInWithEmail(email, password)
      .then(() => {
        setLoggedIn(true); 
        localStorage.setItem('loggedIn', 'true');
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    authCreateAccountWithEmail(name, firstName, email, password, phoneNumber)
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateAccountWithGoogle = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    authSignInWithGoogle(name, firstName)
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    authSignOut();
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
  };  
  if (loggedIn) {
    return (
      <main className="login-container">
        {/* Utilisateur Connecté */}
        <h1 className='login-h1'>Bienvenue !</h1>
        <p className='login-p'>Vous êtes actuellement connecté.</p>
        <button className='login-btn' onClick={handleLogout}>Se déconnecter</button>
      </main>
    );

  } else {
    return (
      <main className="login-container">
        {/* Utilisateur Déconnecté */}
        {isLoginForm ? (
          <>
          {/* Connexion */}
            <h1 className="login-h1" >Connexion</h1>
            <form className="login-form" onSubmit={handleLogin}>
              <input
                className='login-input'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete='email'
              />
              <input
                className='login-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                autoComplete='current-password'
              />
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? 'Chargement...' : 'Se connecter'}
              </button>
              <p className='login-p-index'>Vous n'avez pas de compte Mentor-HEC ?</p>
              <button type="button" className="change-login-mode-btn" onClick={handleToggleForm}>
                Créer un compte
              </button>
            </form>
          </>
        ) : (
          <>
          {/* Créer un compte */}
            <h1 className="login-h1">Créer un compte</h1>
            <form className="login-form" onSubmit={handleCreateAccount}>
              <input
                className='login-input'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                autoComplete='family-name'
              />
              <input
                className='login-input'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
                autoComplete="given-name"
              />
              <input
                className='login-input'
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Numéro de téléphone"
                autoComplete='tel'
              />
              <input
                className='login-input'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete='email'
              />
              <input
                className='login-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                autoComplete='current-password'
              />
              <div className='account-create-div'>
                <button className="login-btn" type="submit" disabled={loading}>
                  {loading ? 'Chargement...' : 'Créer un compte'}
                </button>
                <button className="login-btn" type="button" onClick={handleCreateAccountWithGoogle} disabled={loading}>
                  Créer un compte avec Google  <img src="src/assets/google-logo.png" width='20'/>
                </button>
              </div>
              <p className='login-p-index'>Vous avez déjà un compte Mentor-HEC ?</p>
              <button type="button" className="change-login-mode-btn" onClick={handleToggleForm}>
                Se connecter
              </button>
            </form>
          </>
        )}
        {error && <div className="login-error">{error.message}</div>}
      </main>
    );
  }
}