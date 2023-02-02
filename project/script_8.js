//signup

const SERVER_URL = 'http://127.0.0.1:8000';

async function register(user) {
    let response = await fetch(`${SERVER_URL}/user/register`,{
        method:'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type' : 'application/json'
        },
        credentials: 'include'
    })
    let data = await response.json();
    return data
}

async function submitRegister() {
    let user = {
        email : document.getElementById('id').value,
        password: document.getElementById('pw').value,
        fullname: document.getElementById('name').value,
    }
    let result = await register(user);
    console.log(result);
}


//login

async function login(user) {
    let response = await fetch(`${SERVER_URL}/user/login`,{
        method:'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type' : 'application/json'
        },
        credentials: 'include'
    })
    let data = await response.json();
    return data
}


async function submitLogin() {
    let user = {
        email: document.getElementById('id').value,
        password: document.getElementById('pw').value,
    }
    let result = await login(user);
    if (result.access_token) {
        setCookie('access_token', result.access_token); 
    }
}


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
  }


  // post

  async function postArticle(article) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: article, // formdata 라서 json 함수 필요없음
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json();
    return data
  }

  async function submitArticle() {
    let form = document.getElementById('form')
    let formData = new FormData(form);
    let result = await postArticle(formData);
    console.log(result);
}

//list

async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}


async function insertPosts() {
    let posts = await getPosts();
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend',`
        <div id="${post.id}">
            <h1>글쓴사람:${post.author}</h1>
            <h1>${post.title}</h1>
            <p>${post.content}</p>
        </div>
        `)
    })
}