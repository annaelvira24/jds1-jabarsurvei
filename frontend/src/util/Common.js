import Cookies from 'universal-cookie';

export const getUser = () =>{
    let cookie = new Cookies();
    return (cookie.get("admin"));
}

export const setUserCookie = (admin) =>{
    let cookieValue = btoa(JSON.stringify(admin));
    let cookies = new Cookies();
    cookies.set('admin', cookieValue, { path: '/', expires: new Date(Date.now() + 86400000) });
}

export const removeUserCookie = () =>{
    const cookies = new Cookies();
    cookies.remove('admin', { path: '/' });
}