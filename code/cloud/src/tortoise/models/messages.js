var Messages = function () { };

Messages.USERNAME_NOT_FOUND = { code: 0, text: "USERNAME_NOT_FOUND" };
Messages.INVALID_PWD = { code: 1, text: "INVALID_PWD" };
Messages.DB_ERROR = { code: 2, text: "DB_ERROR" };
Messages.NOT_FOUND = { code: 3, text: "NOT_FOUND" };
Messages.USERNAME_ALREADY_EXISTS = { code: 4, text: "USERNAME_ALREADY_EXISTS" };
Messages.COULD_NOT_CREATE_USER = { code: 5, text: "COULD_NOT_CREATE_USER" };
Messages.PASSWORD_RESET_EXPIRED = { code: 6, text: "PASSWORD_RESET_EXPIRED" };
Messages.PASSWORD_RESET_HASH_MISMATCH = { code: 7, text: "PASSWORD_RESET_HASH_MISMATCH" };
Messages.PASSWORD_RESET_USERNAME_MISMATCH = { code: 8, text: "PASSWORD_RESET_USERNAME_MISMATCH" };
Messages.COULD_NOT_RESET_PASSWORD = { code: 9, text: "COULD_NOT_RESET_PASSWORD" };
Messages.PASSWORD_CONFIRM_MISMATCH = { code: 10, text: "PASSWORD_CONFIRM_MISMATCH" };

module.exports = Messages;