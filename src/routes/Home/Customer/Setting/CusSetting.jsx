import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getInfor, updatePassword } from '../../../../redux/userReducer/userThunk';

const CusSetting = () => {
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
    const [confirmNewPassword, setConfirmNewPassword] = useState(''); // New state for confirmation

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
        dispatch(editProfile(data)).then(() => {
            dispatch(getInfor(userId));
            setShowForm(false);
        }).catch((error) => {
            console.error('Failed to update profile:', error);
        });
    };

    const dispatchPasswordChange = () => {
        // Validate that new password matches confirmation
        if (newPassword !== confirmNewPassword) {
            alert('New password and confirmation do not match');
            return;
        }

        const data = {
            id: userId,
            currentPassword,
            newPassword,
        };
        dispatch(updatePassword(data)).then(() => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword(''); // Reset confirmation field
            setShowPasswordForm(false);
            alert('Password updated successfully');
        }).catch((error) => {
            console.error('Failed to update password:', error);
            alert('Failed to update password: ' + (error.message || 'Unknown error'));
        });
    };

    return (
        <div className="m-8">
            {/* Title */}
            <div className="flex justify-between align-middle">
                <div className="text-[1.5rem] font-extrabold leading-[3.5rem] text-green_dark1">
                    Profile
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2 rounded-xl bg-green_light3 px-4 py-2">
                        <input
                            type="text"
                            className="grow bg-green_light3 text-green placeholder-green"
                            placeholder="Search here"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>
            </div>

            {/* Body */}
            <div
                className={`${!showForm && !showPasswordForm ? 'block' : 'hidden'} mt-4 rounded-lg border border-grey_light1 px-12 py-2`}
            >
                <div className="flex items-center space-x-4">
                    <img
                        src="/src/assets/userAvtG.jpg"
                        className="h-[4rem] w-[4rem] rounded-full"
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
                                <span className="italic">Your current Custommer Id :</span>
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
                    {/* <button
                        onClick={() => setShowPasswordForm(true)}
                        className="rounded-lg border px-8 py-2 text-[1.25rem] font-bold text-green_dark1 hover:bg-green_dark1 hover:text-offwhite"
                    >
                        Change Password
                    </button> */}
                </div>
            </div>

            {/* Change profile form */}
            <div className={`${showForm ? 'block' : 'hidden'}`}>
                <div className="fixed left-1/3 top-1/4 w-[50rem] rounded-2xl bg-green_dark1">
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
            <div className={`${showPasswordForm ? 'block' : 'hidden'}`}>
                <div className="fixed left-1/3 top-1/4 w-[50rem] rounded-2xl bg-green_dark1">
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

export default CusSetting;