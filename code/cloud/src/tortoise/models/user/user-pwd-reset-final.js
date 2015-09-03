var UserPasswordResetFinal = function(config) {
    this.username = config.username;
    this.newPassword = config.newPassword,
    this.newPasswordConfirm = config.newPasswordConfirm,
    this.passwordResetHash = config.passwordResetHash
};

module.exports = UserPasswordResetFinal;
