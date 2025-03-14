import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getInfor, updatePassword } from '../../../../redux/userReducer/userThunk';

const ASetting = () => {
    const [showForm, setShowForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const dispatch = useDispatch();

    const { inforUser, userId } = useSelector((state) => state.userReducer);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [bank, setBank] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        if (userId) {
            dispatch(getInfor(userId));
        }
    }, [userId, dispatch]);

    useEffect(() => {
        if (inforUser) {
            setName(inforUser.full_name || '');
            setPhone(inforUser.phone || '');
            setEmail(inforUser.email || '');
            setBank(inforUser.bank_account || '');
        }
    }, [inforUser]);

    const dispatchDetail = () => {
        const newInfor = {
            full_name: name,
            phone: phone,
            email: email,
            bank_account: bank,
        };
        const data = {
            infor: newInfor,
            id: userId,
        };
        dispatch(editProfile(data))
            .unwrap()
            .then(() => {
                dispatch(getInfor(userId));
                setShowForm(false);
            })
            .catch((error) => {
                console.error('Failed to update profile:', error);
            });
    };

    const dispatchPasswordChange = () => {
        if (newPassword !== confirmNewPassword) {
            alert('New password and confirmation do not match');
            return;
        }

        if (currentPassword === newPassword) {
            alert('New password cannot be the same as the current password');
            return;
        }

        const data = {
            id: userId,
            currentPassword,
            newPassword,
        };
        dispatch(updatePassword(data))
            .unwrap()
            .then(() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setShowPasswordForm(false);
                alert('Password updated successfully');
            })
            .catch((error) => {
                console.error('Failed to update password:', error);
                alert('Failed to update password: ' + (error.message || 'Unknown error'));
            });
    };

    return (
        <div className="m-8 flex">
            {/* Menu */}
            {/* <div className="mr-8 mt-4 w-[15%]">
                <ul className="rounded-lg">
                    <li className="flex items-center p-4 bg-green_dark1 text-offwhite cursor-pointer hover:bg-green_dark1/90 gap-[10px] rounded-tl-lg rounded-tr-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span className="text-lg font-medium">Profile Settings</span>
                    </li>
                    <li className="flex items-center p-4 bg-green_dark1 text-offwhite cursor-pointer hover:bg-green_dark1/90 gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="text-lg font-medium">Password</span>
                    </li>
                    <li className="flex items-center p-4 bg-green_dark1 text-offwhite cursor-pointer hover:bg-green_dark1/90 gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <span className="text-lg font-medium">Notifications</span>
                    </li>
                    <li className="flex items-center p-4 bg-green_dark1 text-offwhite cursor-pointer hover:bg-green_dark1/90 gap-[10px] rounded-bl-lg rounded-br-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span className="text-lg font-medium">Verification</span>
                    </li>
                </ul>
            </div> */}

            {/* Body */}
            <div
                className={`${!showForm && !showPasswordForm ? 'block' : 'hidden'} mt-4 rounded-lg border border-grey_light1 px-12 py-2 w-full`}
            >
                <div className="flex items-center space-x-4">
                    <img
                        src="/src/assets/userAvtG.jpg"
                        className="h-[12rem] w-[12rem] rounded-full"
                        alt=""
                    />
                    <div>
                        <div className="text-[2rem] uppercase text-green_dark1">
                            {inforUser?.full_name}
                        </div>
                        <span className="text-green_dark1">Customer</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-12">
                    <div className="rounded-lg border border-grey_light1 px-8 py-4 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
                        <div className="flex items-center space-x-4 text-green_dark1">
                            <i className="fa fa-phone text-[2rem]"></i>
                            <div>
                                <div className="text-[1.5rem]">Phone</div>
                                <span className="italic">Your current phone number :</span>
                            </div>
                        </div>
                        <div className="my-4 text-center text-[1.2rem] font-light text-green_dark1">
                            {inforUser?.phone}
                        </div>
                    </div>
                    <div className="rounded-lg border border-grey_light1 px-8 py-4 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
                        <div className="flex items-center space-x-4 text-green_dark1">
                            <i className="fa fa-user-shield text-[2rem]"></i>
                            <div>
                                <div className="text-[1.5rem]">Customer ID</div>
                                <span className="italic">Your current Customer Id :</span>
                            </div>
                        </div>
                        <div className="my-4 text-center text-[1.2rem] font-light text-green_dark1">
                            C-203-079-21-{inforUser?.user_id}
                        </div>
                    </div>
                    <div className="rounded-lg border border-grey_light1 px-8 py-4 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
                        <div className="flex items-center space-x-4 text-green_dark1">
                            <i className="fa fa-envelope text-[2rem]"></i>
                            <div>
                                <div className="text-[1.5rem]">Email</div>
                                <span className="italic">Your current email number :</span>
                            </div>
                        </div>
                        <div className="my-4 text-center text-[1.2rem] font-light text-green_dark1">
                            {inforUser?.email}
                        </div>
                    </div>
                    <div className="rounded-lg border border-grey_light1 px-8 py-4 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
                        <div className="flex items-center space-x-4 text-green_dark1">
                            <i className="fa fa-users-cog text-[2rem]"></i>
                            <div>
                                <div className="text-[1.5rem]">Role</div>
                                <span className="italic">Your Role</span>
                            </div>
                        </div>
                        <div className="my-4 text-center text-[1.2rem] font-light text-green_dark1">
                            Customer
                        </div>
                    </div>
                </div>
                <div className="my-8 flex justify-center space-x-8">
                    <button
                        onClick={() => setShowForm(true)}
                        className="rounded-lg border px-8 py-2 text-[1.25rem] font-bold text-green_dark1 hover:bg-green_dark1 hover:text-offwhite"
                    >
                        Change Profile
                    </button>
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="rounded-lg border px-8 py-2 text-[1.25rem] font-bold text-green_dark1 hover:bg-green_dark1 hover:text-offwhite"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* Change profile form */}
            <div className={`${showForm ? 'flex' : 'hidden'} w-[85%] justify-center mt-4`}>
                <div className="w-[50rem] rounded-2xl bg-green_dark1">
                    <div className="m-8 mx-auto w-5/6 space-y-4">
                        <div className="flex justify-between">
                            <div className="text-[1.5rem] font-semibold text-offwhite">
                                Change Information
                            </div>
                            <button
                                className="rounded-full border bg-offwhite p-2 px-4 text-green_dark1 hover:font-extrabold"
                                onClick={() => setShowForm(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="w-full space-x-4">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-offwhite">Full name</div>
                                    <input
                                        type="text"
                                        value={name}
                                        className="input input-bordered input-md bg-white w-full"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="text-offwhite">Phone</div>
                                    <input
                                        type="text"
                                        value={phone}
                                        className="input input-bordered input-md bg-white w-full"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="text-offwhite">Email</div>
                                    <input
                                        type="text"
                                        value={email}
                                        className="input input-bordered input-md bg-white w-full"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-8 text-green_dark1">
                            <button
                                className="rounded-xl border bg-offwhite p-2"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-xl border bg-offwhite p-2"
                                onClick={dispatchDetail}
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change password form */}
            <div className={`${showPasswordForm ? 'flex' : 'hidden'} w-[85%] justify-center mt-4`}>
                <div className="w-[50rem] rounded-2xl bg-green_dark1">
                    <div className="m-8 mx-auto w-5/6 space-y-4">
                        <div className="flex justify-between">
                            <div className="text-[1.5rem] font-semibold text-offwhite">
                                Change Password
                            </div>
                            <button
                                className="rounded-full border bg-offwhite p-2 px-4 text-green_dark1 hover:font-extrabold"
                                onClick={() => setShowPasswordForm(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="w-full space-x-4">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-offwhite">Current Password</div>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        className="input input-bordered input-md bg-white w-full"
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="text-offwhite">New Password</div>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        className="input input-bordered input-md bg-white w-full"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="text-offwhite">Confirm New Password</div>
                                    <input
                                        type="password"
                                        value={confirmNewPassword}
                                        className="input input-bordered input-md bg-white w-full"
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-8 text-green_dark1">
                            <button
                                className="rounded-xl border bg-offwhite p-2"
                                onClick={() => setShowPasswordForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-xl border bg-offwhite p-2"
                                onClick={dispatchPasswordChange}
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ASetting;