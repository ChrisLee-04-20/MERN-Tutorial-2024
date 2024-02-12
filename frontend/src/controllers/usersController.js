const loginUser = async(email, password) => {
    
    if (!email || !password) {
        throw Error('All fields are required.')
    }
    
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(data.Error);
    }


    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
}

const registerUser = async(email, password, passwordConfirm) => {

    if (!email || !password || !passwordConfirm) {
        throw Error('All fields are required.')
    }

    if (password !== passwordConfirm) {
        throw Error("Passwords are not match");
    }

    const response = await fetch('/api/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    const data = await response.json();

    if (!response.ok) {
        throw Error(data.Error);
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
}

export { loginUser, registerUser };