import { http } from './urlConfig'

export const userService = {
  // Xác thực người dùng
  postLogin: (data) => {
    let url = '/auth/login'
    return http.post(url, data)
  },

  postSignUp: (data) => {
    let url = '/auth/signup'
    return http.post(url, data)
  },

  // Xác minh email khi đăng ký
  verifyEmail: (code) => {
    let url = '/auth/verify-account'
    return http.post(url, { code })
  },

  // Đăng xuất tài khoản
  logout: () => {
    let url = '/auth/logout'
    return http.post(url)
  },

  // Làm mới token để duy trì đăng nhập
  refreshToken: () => {
    let url = '/auth/refresh-token'
    return http.post(url)
  },

  // Lấy thông tin người dùng
  getInfor: (data) => {
    let url = `/user/${data}`
    return http.get(url)
  },
  editProfile: (id, infor) => {
    let url = `/user/${id}/edit`
    console.log('infor:', infor)
    console.log('url:', url)
    return http.put(url, infor)
  },
  // Quên mật khẩu
  forgotPassword: (email) => {
    let url = '/auth/forgot-password'
    return http.post(url, { email })
  },

  // Đặt lại mật khẩu sau khi nhận mã xác minh
  resetPassword: (code, newPassword) => {
    let url = '/auth/reset-password'
    return http.post(url, { code, newPassword })
  },

  // Lấy lại mã xác minh
  resetVerificationToken: (email) => {
    let url = '/auth/reset-verification-token'
    return http.post(url, { email })
  },

  // Xác minh mã (dùng cho cả quên mật khẩu và xác minh email)
  verifyCode: (code) => {
    let url = '/auth/verify-code-number'
    return http.post(url, { code })
  },

  // Đổi mật khẩu khi đã đăng nhập
  changePassword: (oldPassword, newPassword) => {
    let url = '/auth/change-password'
    return http.post(url, { oldPassword, newPassword })
  },
} 