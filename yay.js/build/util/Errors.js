"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.ServerError = exports.RateLimitError = exports.NotFoundError = exports.ForbiddenError = exports.AuthenticationError = exports.BadRequestError = exports.HTTPError = exports.YJSError = void 0;
/**
 * Base exception for yay.js
 */
class YJSError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.YJSError = YJSError;
/**
 * Exception raised when an HTTP request fails
 */
class HTTPError extends YJSError {
    constructor(response) {
        super(response.message);
        this.response = response;
    }
}
exports.HTTPError = HTTPError;
/**
 * Exception raised for a 400 HTTP status code
 */
class BadRequestError extends HTTPError {
    constructor(response) {
        super(response);
        this.response = response;
    }
}
exports.BadRequestError = BadRequestError;
/**
 * Exception raised for a 401 HTTP status code
 */
class AuthenticationError extends HTTPError {
    constructor(response) {
        super(response);
        this.response = response;
    }
}
exports.AuthenticationError = AuthenticationError;
/**
 * Exception raised for a 403 HTTP status code
 */
class ForbiddenError extends HTTPError {
    constructor(response) {
        super(response);
        this.response = response;
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Exception raised for a 404 HTTP status code
 */
class NotFoundError extends HTTPError {
    constructor(response) {
        super(response);
        this.response = response;
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Exception raised for a 429 HTTP status code
 */
class RateLimitError extends HTTPError {
    constructor(response) {
        super(response);
        this.response = response;
    }
}
exports.RateLimitError = RateLimitError;
/**
 * Exception raised for a 5xx HTTP status code
 */
class ServerError extends HTTPError {
    constructor(response) {
        super(response);
        this.response = response;
    }
}
exports.ServerError = ServerError;
/**
 * レスポンスのエラーコード名
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["InvalidParameter"] = -1] = "InvalidParameter";
    ErrorCode[ErrorCode["RegisteredUser"] = -2] = "RegisteredUser";
    ErrorCode[ErrorCode["AccessTokenExpired"] = -3] = "AccessTokenExpired";
    ErrorCode[ErrorCode["ScreenNameAlreadyBeenTaken"] = -4] = "ScreenNameAlreadyBeenTaken";
    ErrorCode[ErrorCode["UserNotFound"] = -5] = "UserNotFound";
    ErrorCode[ErrorCode["PostNotFound"] = -6] = "PostNotFound";
    ErrorCode[ErrorCode["ChatRoomNotFound"] = -7] = "ChatRoomNotFound";
    ErrorCode[ErrorCode["ChatMessageNotFound"] = -8] = "ChatMessageNotFound";
    ErrorCode[ErrorCode["UserNotFoundAtChatRoom"] = -9] = "UserNotFoundAtChatRoom";
    ErrorCode[ErrorCode["UserMustBeOverTwoAtChatRoom"] = -10] = "UserMustBeOverTwoAtChatRoom";
    ErrorCode[ErrorCode["IncorrectPassword"] = -11] = "IncorrectPassword";
    ErrorCode[ErrorCode["UserBlocked"] = -12] = "UserBlocked";
    ErrorCode[ErrorCode["PrivateUser"] = -13] = "PrivateUser";
    ErrorCode[ErrorCode["ApplicationNotFound"] = -14] = "ApplicationNotFound";
    ErrorCode[ErrorCode["BadSNSCredentials"] = -15] = "BadSNSCredentials";
    ErrorCode[ErrorCode["SNSAlreadyConnected"] = -16] = "SNSAlreadyConnected";
    ErrorCode[ErrorCode["CannotDisconnectSNS"] = -17] = "CannotDisconnectSNS";
    ErrorCode[ErrorCode["AccessTokenInvalid"] = -18] = "AccessTokenInvalid";
    ErrorCode[ErrorCode["SpotNotFound"] = -19] = "SpotNotFound";
    ErrorCode[ErrorCode["UserBanned"] = -20] = "UserBanned";
    ErrorCode[ErrorCode["UserTemporaryBanned"] = -21] = "UserTemporaryBanned";
    ErrorCode[ErrorCode["SchoolInfoChange"] = -22] = "SchoolInfoChange";
    ErrorCode[ErrorCode["CannotDeleteNewUser"] = -26] = "CannotDeleteNewUser";
    ErrorCode[ErrorCode["CaptchaRequired"] = -29] = "CaptchaRequired";
    ErrorCode[ErrorCode["FailedToVerifyCaptcha"] = -30] = "FailedToVerifyCaptcha";
    ErrorCode[ErrorCode["GroupIsFull"] = -100] = "GroupIsFull";
    ErrorCode[ErrorCode["BannedFromGroup"] = -103] = "BannedFromGroup";
    ErrorCode[ErrorCode["InvalidCurrentPassword"] = -200] = "InvalidCurrentPassword";
    ErrorCode[ErrorCode["InvalidPassword"] = -201] = "InvalidPassword";
    ErrorCode[ErrorCode["InvalidEmailOrPassword"] = -202] = "InvalidEmailOrPassword";
    ErrorCode[ErrorCode["ExistEmail"] = -203] = "ExistEmail";
    ErrorCode[ErrorCode["BadEmailReputation"] = -204] = "BadEmailReputation";
    ErrorCode[ErrorCode["ChatRoomIsFull"] = -308] = "ChatRoomIsFull";
    ErrorCode[ErrorCode["ConferenceIsFull"] = -309] = "ConferenceIsFull";
    ErrorCode[ErrorCode["ConferenceInactive"] = -310] = "ConferenceInactive";
    ErrorCode[ErrorCode["GroupOwnerBlockedYou"] = -312] = "GroupOwnerBlockedYou";
    ErrorCode[ErrorCode["ChatNeedMutualFollowed"] = -313] = "ChatNeedMutualFollowed";
    ErrorCode[ErrorCode["ConferenceCallIsLocked"] = -315] = "ConferenceCallIsLocked";
    ErrorCode[ErrorCode["ConferenceCallIsForFollowersOnly"] = -317] = "ConferenceCallIsForFollowersOnly";
    ErrorCode[ErrorCode["InvalidEmail"] = -319] = "InvalidEmail";
    ErrorCode[ErrorCode["RegisteredEmail"] = -320] = "RegisteredEmail";
    ErrorCode[ErrorCode["BannedFromCall"] = -321] = "BannedFromCall";
    ErrorCode[ErrorCode["NotCallOwner"] = -322] = "NotCallOwner";
    ErrorCode[ErrorCode["NotVipUser"] = -326] = "NotVipUser";
    ErrorCode[ErrorCode["BlockingLimitExceeded"] = -331] = "BlockingLimitExceeded";
    ErrorCode[ErrorCode["VerificationCodeWrong"] = -332] = "VerificationCodeWrong";
    ErrorCode[ErrorCode["VerificationCodeExpired"] = -333] = "VerificationCodeExpired";
    ErrorCode[ErrorCode["InvalidAppVersion"] = -334] = "InvalidAppVersion";
    ErrorCode[ErrorCode["InvalidPhoneNumber"] = -335] = "InvalidPhoneNumber";
    ErrorCode[ErrorCode["FollowLimitation"] = -336] = "FollowLimitation";
    ErrorCode[ErrorCode["AgeGapNotAllowed"] = -338] = "AgeGapNotAllowed";
    ErrorCode[ErrorCode["GroupOwnerOrGroupModeratorOnly"] = -339] = "GroupOwnerOrGroupModeratorOnly";
    ErrorCode[ErrorCode["UnableToRegisterUserDueToPolicy"] = -340] = "UnableToRegisterUserDueToPolicy";
    ErrorCode[ErrorCode["SnsShareRewardAlreadyBeenClaimed"] = -342] = "SnsShareRewardAlreadyBeenClaimed";
    ErrorCode[ErrorCode["QuotaLimitExceeded"] = -343] = "QuotaLimitExceeded";
    ErrorCode[ErrorCode["ChatNeedAgeVerified"] = -346] = "ChatNeedAgeVerified";
    ErrorCode[ErrorCode["OnlyAgeVerifiedUserCanJoinGroup"] = -347] = "OnlyAgeVerifiedUserCanJoinGroup";
    ErrorCode[ErrorCode["RequirePhoneVerificationToChat"] = -348] = "RequirePhoneVerificationToChat";
    ErrorCode[ErrorCode["NotPostOwner"] = -350] = "NotPostOwner";
    ErrorCode[ErrorCode["GroupGenerationNotMatched"] = -352] = "GroupGenerationNotMatched";
    ErrorCode[ErrorCode["PhoneNumberCheckVerificationCodeSubmitQuotaExceeded"] = -355] = "PhoneNumberCheckVerificationCodeSubmitQuotaExceeded";
    ErrorCode[ErrorCode["PhoneNumberCheckVerificationCodeRequestQuotaExceeded"] = -356] = "PhoneNumberCheckVerificationCodeRequestQuotaExceeded";
    ErrorCode[ErrorCode["GroupOfferHasBeenAccepted"] = -357] = "GroupOfferHasBeenAccepted";
    ErrorCode[ErrorCode["GroupOfferHasBeenWithdrawn"] = -358] = "GroupOfferHasBeenWithdrawn";
    ErrorCode[ErrorCode["IpBanned"] = -360] = "IpBanned";
    ErrorCode[ErrorCode["NotConnectedToTwitter"] = -361] = "NotConnectedToTwitter";
    ErrorCode[ErrorCode["PrivateUserTimeline"] = -363] = "PrivateUserTimeline";
    ErrorCode[ErrorCode["CounterRefreshLimitExceeded"] = -364] = "CounterRefreshLimitExceeded";
    ErrorCode[ErrorCode["NotFollowedByOpponent"] = -367] = "NotFollowedByOpponent";
    ErrorCode[ErrorCode["ExceedChangeCountryQuota"] = -369] = "ExceedChangeCountryQuota";
    ErrorCode[ErrorCode["NotGroupMember"] = -370] = "NotGroupMember";
    ErrorCode[ErrorCode["GroupPendingTransfer"] = -371] = "GroupPendingTransfer";
    ErrorCode[ErrorCode["GroupPendingDeputization"] = -372] = "GroupPendingDeputization";
    ErrorCode[ErrorCode["UserRestrictedChatWithCautionUsers"] = -373] = "UserRestrictedChatWithCautionUsers";
    ErrorCode[ErrorCode["RestrictedCreateChatWithNewUsers"] = -374] = "RestrictedCreateChatWithNewUsers";
    ErrorCode[ErrorCode["RepostPostNotRepostable"] = -375] = "RepostPostNotRepostable";
    ErrorCode[ErrorCode["TooManyAccountsCreated"] = -376] = "TooManyAccountsCreated";
    ErrorCode[ErrorCode["OnlySpecificGenderCanJoinGroup"] = -377] = "OnlySpecificGenderCanJoinGroup";
    ErrorCode[ErrorCode["CreateSpecificGenderGroupRequiredGender"] = -378] = "CreateSpecificGenderGroupRequiredGender";
    ErrorCode[ErrorCode["GroupRelatedExceededNumberOfRelatedGroups"] = -382] = "GroupRelatedExceededNumberOfRelatedGroups";
    ErrorCode[ErrorCode["ExceededPinnedLimit"] = -383] = "ExceededPinnedLimit";
    ErrorCode[ErrorCode["GroupShareOnTwitterLimitExceeded"] = -384] = "GroupShareOnTwitterLimitExceeded";
    ErrorCode[ErrorCode["ReportedContent"] = -385] = "ReportedContent";
    ErrorCode[ErrorCode["ConferenceCallIsForMutualFollowsOnly"] = -402] = "ConferenceCallIsForMutualFollowsOnly";
    ErrorCode[ErrorCode["ExceededLimit"] = -403] = "ExceededLimit";
    ErrorCode[ErrorCode["GroupInviteExceeded"] = -404] = "GroupInviteExceeded";
    ErrorCode[ErrorCode["PhoneVerificationRequired"] = -405] = "PhoneVerificationRequired";
    ErrorCode[ErrorCode["ContentTooOld"] = -406] = "ContentTooOld";
    ErrorCode[ErrorCode["PasswordTooShort"] = -407] = "PasswordTooShort";
    ErrorCode[ErrorCode["PasswordTooLong"] = -408] = "PasswordTooLong";
    ErrorCode[ErrorCode["PasswordNotAllowed"] = -409] = "PasswordNotAllowed";
    ErrorCode[ErrorCode["CommonPassword"] = -410] = "CommonPassword";
    ErrorCode[ErrorCode["EmailNotAuthorized"] = -411] = "EmailNotAuthorized";
    ErrorCode[ErrorCode["UnableToMovePostToThread"] = -412] = "UnableToMovePostToThread";
    ErrorCode[ErrorCode["UnableToPostUrl"] = -413] = "UnableToPostUrl";
    ErrorCode[ErrorCode["UnableToSetCall"] = -977] = "UnableToSetCall";
    ErrorCode[ErrorCode["PhoneNumberBanned"] = -1000] = "PhoneNumberBanned";
    ErrorCode[ErrorCode["TooManyRequests"] = -5302] = "TooManyRequests";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
