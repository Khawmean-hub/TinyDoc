// ======================================================== Events =========================================================
$(document).on('click', '#btn_login', onLogin)
$(document).on('click', '.profile-users', openProfileEditor)
$(document).on('click', '#btn_save_profile', onSaveProfile)
$(document).on('click', '#btn_company_manage', openModalCompany)
$(document).on('click', '#btn_data_manage', openModalDataManagement)

//========================================================= Functions =========================================================
/**
 * on default lander
 */
function loadUser(){
    if(window.user.password){
        myNavigator.loginNewNavigate();
    }else{

        function onAfter(){
            onLoad()
            $('.user-profile, .big_profile').attr('src', window.user.profile)
            $('#username_title').text(window.user.username)
        }

        myNavigator.homeNewNavigate({onAfter: onAfter});
        buildSemenComponent();
    }
}

/**
 * Kak login
 */
function onLogin(){
    const username = $('#username_text').val()
    const password = $('#password_text').val()
    if(username === window.user.username && password === decodeURIComponent(window.user.password)){
        function onAfter(){
            onLoad()
            $('.user-profile, .big_profile').attr('src', window.user.profile)
            $('#username_title').text(window.user.username)
        }
        myNavigator.homeNewNavigate({onAfter: onAfter});
    }else{
        showMessage(MESSAGE.INCORRECT_USERNAME_PASSWORD, MSG_TYPE.ERROR)
    }
}

/**
 * Open user profile editor
 */
function openProfileEditor(){
    $('#username_edit_text').val(window.user.username)
    $('#profile_edit_text').val(window.user.profile)
    const pass = decodeURIComponent(window.user.password ? window.user.password : '');
    $('#password_edit_text').val(pass)
    $('#profile_editor_modal')
    .modal('setting', 'closable', false)
    .modal('show');
}

/**
 * Save profile
 */
function onSaveProfile(){
    const username  =  $('#username_edit_text').val()
    const profile   = $('#profile_edit_text').val()
    const password  = $('#password_edit_text').val()

    userRepo.update(username, profile, encodeURIComponent(password))
    if(username){
        $('#profile_editor_modal').modal('hide');
        $('.user-profile, .big_profile').attr('src', window.user.profile)
        $('#username_title').text(window.user.username)
    }   
}

function openModalCompany(){
    buildCompanyTable()
    $('#document_list_modal')
        .modal('setting', 'closable', false)
        .modal('show');
}

/**
 * Open modal for Data Management
 */
function openModalDataManagement(){
    $('#data_management')
        .modal('setting', 'closable', false)
        .modal('show');
}