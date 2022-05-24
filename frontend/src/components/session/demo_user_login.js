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

    
        // submit
        submit.click()

    }
}

export default Demo;