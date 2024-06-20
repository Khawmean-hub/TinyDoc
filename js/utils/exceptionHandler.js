const MSG_TYPE = {
    "SUCCESS": "SUCCESS",
    "ERROR": "ERROR",
    "WARNING": "WARNING",
    "INFO": "INFO",

}

const MESSAGE = {
    SAVE_COMPANY_SUCCESS: 'New company has been saved.',
    SAVE_TOPIC_SUCCESS: 'New topic has been saved.',
    SAVE_ARTICLE_SUCCESS: 'New article has been saved.',
    UPDATE_COMPANY_SUCCESS: 'Company has been modified.',
    UPDATE_TOPIC_SUCCESS: 'Topic has been modified.',
    UPDATE_ARTICLE_SUCCESS: 'Article has been modified.',
    UPDATE_USER_SUCCESS: 'User has been modified.',
    DELETE_COMPANY_SUCCESS: 'Company has been deleted.',
    DELETE_TOPIC_SUCCESS: 'Topic has been deleted.',
    DELETE_ARTICLE_SUCCESS: 'Article has been deleted.',

    SAVE_COMPANY_ERROR: 'Company not save.',
    SAVE_TOPIC_ERROR: 'Topic not save.',
    SAVE_ARTICLE_ERROR: 'Article not save.',
    UPDATE_COMPANY_ERROR: 'Company not modify.',
    UPDATE_TOPIC_ERROR: 'Topic not modify.',
    UPDATE_ARTICLE_ERROR: 'Article not modify.',
    DELETE_COMPANY_ERROR: 'Company not delete.',
    DELETE_TOPIC_ERROR: 'Topic not delete.',
    DELETE_ARTICLE_ERROR: 'Article not delete.',

    MESSAGE_ASK_DELETE_TOPIC: 'Are you sure want to delete this topic?',
    MESSAGE_ASK_DELETE_ARTICLE: 'Are you sure want to delete this article?',
    MESSAGE_ASK_DELETE_COMPANY: 'Are you sure want to delete this document?',
    UPDATE_PROFILE_SUCCESS: 'Profile changed.',
    UPDATE_USERNAME_SUCCESS: 'Username changed.',

    SAVE_ALL_SUCCESS: 'Save all success.',
    UPDATE_ALL_SUCCESS: 'Update all success.',

    IMPORT_COMPANY_ASK: 'Are you sure want to import new company?',
    IMPORT_TOPIC_ASK: 'Are you sure want to import new topic?',
    IMPORT_ARTICLE_ASK: 'Are you sure want to import new article?',
    IMPORT_ALL_ASK: 'Are you sure want to import all?',
    
    IMPORT_MODIFY_COMPANY_ASK: 'Are you sure want to update company?',
    IMPORT_MODIFY_TOPIC_ASK: 'Are you sure want to update topic?',
    IMPORT_MODIFY_ARTICLE_ASK: 'Are you sure want to update article?',
    IMPORT_MODIFY_ALL_ASK: 'Are you sure want to update all?',
    
    INCORRECT_USERNAME_PASSWORD: 'Your username or password is incorrect.',
    CLEAR_ALL_DATA_ASK: 'Are you sure want to clear all data?',
    CLEAR_ALL_DATA_SUCCESS: 'All data has been cleared.',

}



const VALIDATION_MESSAGE = {
    COMPANY_NAME_EMPTY: 'Company name is empty.',
    COMPANY_NAME_EXIST: 'Company name is exist.',
    COMPANY_CANNOT_DELETE: 'You cannot delete the company whiled you have only one.',
    TOPIC_NAME_EMPTY: 'Topic name is empty.',
    TOPIC_NAME_EXIST: 'Topic name is exist.',
    ARTICLE_NAME_EMPTY: 'Article title is empty.',
    ARTICLE_NAME_EXIST: 'Article name is exist.',
    ARTICLE_CONTENT_EMPTY: 'Article content is empty.',
    USERNAME_REQUIRED: 'Username required.',
    PROFILE_REQUIRED: 'Profile required.',

    FILE_NOT_SUPPORT: 'This file is not support. Please carefully upload the correct file.',
    FILE_EMPTY: 'This file is not a valid data.'

}


function showMessage(msg, type) {

    if (type === MSG_TYPE.SUCCESS) {
        toastr.success(msg);
    } else if (type === MSG_TYPE.ERROR) {
        toastr.error(msg);
    } else if (type === MSG_TYPE.WARNING) {
        toastr.warning(msg);
    } else if (type === MSG_TYPE.INFO) {
        toastr.info(msg);
    } else {
        toastr.info(msg);
    }
}

function showMyMessage(msg) {
    switch (msg) {
        case MESSAGE.SAVE_COMPANY_SUCCESS:
        case MESSAGE.SAVE_TOPIC_SUCCESS:
        case MESSAGE.SAVE_ARTICLE_SUCCESS:
        case MESSAGE.UPDATE_COMPANY_SUCCESS:
        case MESSAGE.UPDATE_TOPIC_SUCCESS:
        case MESSAGE.UPDATE_ARTICLE_SUCCESS:
        case MESSAGE.DELETE_COMPANY_SUCCESS:
        case MESSAGE.DELETE_TOPIC_SUCCESS:
        case MESSAGE.DELETE_ARTICLE_SUCCESS:
            toastr.success(msg);
            break;
        case MESSAGE.SAVE_COMPANY_ERROR:
        case MESSAGE.SAVE_TOPIC_ERROR:
        case MESSAGE.SAVE_ARTICLE_ERROR:
        case MESSAGE.UPDATE_COMPANY_ERROR:   
        case MESSAGE.UPDATE_TOPIC_ERROR:
        case MESSAGE.UPDATE_ARTICLE_ERROR:
        case MESSAGE.DELETE_COMPANY_ERROR:
        case MESSAGE.DELETE_TOPIC_ERROR:
        case MESSAGE.DELETE_ARTICLE_ERROR:
        case VALIDATION_MESSAGE.COMPANY_CANNOT_DELETE:
            toastr.error(msg);
            break;
        default:
    }
}


function toastrSetting(){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}