import {useEffect} from "react";
import {RootState, useAppDispatch} from "../../app/store";
import {getUsers} from "./functions";
import {useSelector} from "react-redux";

function Users() {
    const dispatch = useAppDispatch();
    const {users,status} = useSelector((state: RootState) => state.user);
    // const state = useSelector((state: RootState) => state);
    // console.log('Redux state: ', state);
    // const {users} = state.user;

    console.log(users, status);

    useEffect(() => {
        dispatch(getUsers());
        return () => {
            console.log('unmount Users');
            // dispatch(clearUsers());
        };
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(u => <li key={u.id}>{u.firstName + ", " + u.lastName + ", " + u.email}</li>)}
            </ul>
        </div>
    );
}

export default Users;