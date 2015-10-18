var UserRegistration = function(config) {
    this.username = config.username,
    this.account_type = config.account_type,
    this.first_name = config.first_name,
    this.last_name = config.last_name,
    this.password = config.password,
    this.passwordConfirm = config.passwordConfirm,
    this.verify = false
};

module.exports = UserRegistration;
