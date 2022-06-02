import { sleep } from '../../util/sleep_util';

const Demo = {
    // TODO 
    // ensure no currentUser, if so log out
    // disable buttons on page

    async demoSignupForm() {
        // create variables for inputs and submit
        const username = document.getElementById('usernameOrEmail');
        const password = document.getElementById('password');
        const submit = document.getElementById('hidden-demo');

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

       
        // username
        await sleep(getRandomInt(25, 200))
        username.value = "D"
        await sleep(getRandomInt(25, 200))
        username.value = "De"
        await sleep(getRandomInt(25, 200))
        username.value = "Dem"
        await sleep(getRandomInt(25, 200))
        username.value = "Demo"
        await sleep(getRandomInt(25, 200))
        username.value = "DemoA"
        await sleep(getRandomInt(25, 200))
        username.value = "DemoAc"
        await sleep(getRandomInt(25, 200))
        username.value = "DemoAcc"
        await sleep(getRandomInt(25, 200))
        username.value = "DemoAcco"
        await sleep(getRandomInt(25, 200))
        username.value = "DemoAccou"
        await sleep(getRandomInt(25, 200))
        username.value = "DemoAccoun"
        await sleep(getRandomInt(25, 200))
        username.value = "DemoAccount"
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

    
        // submit
        submit.click()

    }
}

export default Demo;