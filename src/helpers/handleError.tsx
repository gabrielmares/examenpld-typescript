
const handleErrors = ({ code }: any) => {
    switch (code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
            return 501
        case 'auth/wrong-password':
            return 502
        case 'auth/too-many-requests':
            return 503
        default:
            return 504;
    }

}


export default handleErrors;