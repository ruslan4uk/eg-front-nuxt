export default function ({ store, redirect, route }) {
    let url = route.path.split('/')
    // console.log('Url', url[1]);
    // console.log('Role', store.state.auth.user.role);
    
    if (store.state.auth.user.role === 'tourist' && url[1] === 'profile') {
        return redirect('/trstprofile')
    }
    if (store.state.auth.user.role !==  'tourist' && url[1] === 'trstprofile') {
        return redirect('/profile')
    }
}