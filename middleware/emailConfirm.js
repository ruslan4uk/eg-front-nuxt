export default function ({ store, redirect }) {
    if (!store.state.auth.user.verify) {
        return redirect('/auth/confirm')
    }
}