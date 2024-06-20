//variables
$loginPage  = $('#page-login');
$homePage   = $('#home-page');

const HTML_LOGIN_PAGE   = $loginPage.html();
const HTML_HOME_PAGE    = $homePage.html();

const myNavigator = { 
    loginNavigate,
    loginNewNavigate,

    homeNavigate,
    homeNewNavigate
}

//=========================================================Reset Functions=========================================================
function hideAllNavigate(){
    $loginPage.hide();
    $homePage.hide();
}

function clearAllNavigate(){
    $loginPage.empty();
    $homePage.empty();
}

// =====Other=====
function isFunctionThenCall(fn){
    if(fn && typeof fn == 'function'){
        fn();
    }
}

//=========================================================Login Page=========================================================
/**
 * Navigate Login Page
 * @onBefore { function } call before hide or clear and build html.
 * @onAfter { function } call after hide or clear and build html.
 */
function loginNavigate({onBefore, onAfter}={}) {

    //call a function before remove
    isFunctionThenCall(onBefore);

    //hide and build process
    hideAllNavigate()
    $loginPage.show();

    //call a function after remove and build
    isFunctionThenCall(onAfter);
    $('body').css('background', '#f7f9ff')
}

/**
 * Navigate to Login page with reset
 */
function loginNewNavigate({onBefore, onAfter}={}){
    //call a function before remove
    isFunctionThenCall(onBefore);

    clearAllNavigate();
    $loginPage.empty().append(HTML_LOGIN_PAGE).show();

    //call a function after remove and build
    isFunctionThenCall(onAfter);
    $('body').css('background', '#f7f9ff')
}


//=========================================================Home Page=========================================================
/**
 * Navigate to Home
 */
function homeNavigate({onBefore, onAfter}={}){
    //call a function before remove
    isFunctionThenCall(onBefore);

    //hide and build process
    hideAllNavigate()
    $homePage.show();

    //call a function after remove and build
    isFunctionThenCall(onAfter);

    $('body').css('background', 'white')
}

/**
 * Navigate to Home page with reset
 */
function homeNewNavigate({onBefore, onAfter}={}){
    //call a function before remove
    isFunctionThenCall(onBefore);

    clearAllNavigate();
    $homePage.empty().append(HTML_HOME_PAGE).show();

    //call a function after remove and build
    isFunctionThenCall(onAfter);

    $('body').css('background', 'white')
}



