import { useRouter } from "next/router";
import { useEffect } from "react"

const Profile = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/auth/login')
        }
    }, [])


    return (
        <div>
            Profile
        </div>
    );
}

export default Profile;