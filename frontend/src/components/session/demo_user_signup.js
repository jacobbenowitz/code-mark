import { sleep } from '../../util/sleep_util';

const Demo = {
  // TODO 
  // ensure no currentUser, if so log out
  // disable buttons on page

  async demoSignupForm() {
    // create variables for inputs and submit
    const username = document.getElementById('username-signup');
    
    const email = document.getElementById('email-signup');
    const password = document.getElementById('password-signup');
    const password2 = document.getElementById('password-signup2');
    const submit = document.getElementById('hidden-demo');

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    // email
    await sleep(getRandomInt(25, 200))
    email.value = "d"
    await sleep(getRandomInt(25, 200))
    email.value = "de"
    await sleep(getRandomInt(25, 200))
    email.value = "dem"
    await sleep(getRandomInt(25, 200))
    email.value = "demo"
    await sleep(getRandomInt(25, 200))
    email.value = "demou"
    await sleep(getRandomInt(25, 200))
    email.value = "demous"
    await sleep(getRandomInt(25, 200))
    email.value = "demouse"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@g"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gm"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gma"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gmai"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gmail"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gmail."
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gmail.c"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gmail.co"
    await sleep(getRandomInt(25, 200))
    email.value = "demouser@gmail.com"
    await sleep(550)

    // username
    await sleep(getRandomInt(25, 200))
    username.value = "G"
    await sleep(getRandomInt(25, 200))
    username.value = "Gu"
    await sleep(getRandomInt(25, 200))
    username.value = "Gue"
    await sleep(getRandomInt(25, 200))
    username.value = "Gues"
    await sleep(getRandomInt(25, 200))
    username.value = "Guest"
    await sleep(550)

    // password
    await sleep(getRandomInt(25, 200))
    password.value = "p"
    await sleep(getRandomInt(25, 200))
    password.value = "pa"
    await sleep(getRandomInt(25, 200))
    password.value = "pas"
    await sleep(getRandomInt(25, 200))
    password.value = "pass"
    await sleep(getRandomInt(25, 200))
    password.value = "passw"
    await sleep(getRandomInt(25, 200))
    password.value = "passwo"
    await sleep(getRandomInt(25, 200))
    password.value = "passwor"
    await sleep(getRandomInt(25, 200))
    password.value = "password"

    await sleep(getRandomInt(25, 200))
    password2.value = "p"
    await sleep(getRandomInt(25, 200))
    password2.value = "pa"
    await sleep(getRandomInt(25, 200))
    password2.value = "pas"
    await sleep(getRandomInt(25, 200))
    password2.value = "pass"
    await sleep(getRandomInt(25, 200))
    password2.value = "passw"
    await sleep(getRandomInt(25, 200))
    password2.value = "passwo"
    await sleep(getRandomInt(25, 200))
    password2.value = "passwor"
    await sleep(getRandomInt(25, 200))
    password2.value = "password"

    // submit
    submit.click()

  }
}

export default Demo;