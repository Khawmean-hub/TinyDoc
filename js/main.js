function onLoad(){
    window.company          = companyRepo.findAll();
    window.topic            = topicRepo.findAll();
    window.article          = articleRepo.findAll();
    window.user             = userRepo.findOne();
    window.currentCompanyId = getDefaultCompanyId();
    window.currentTopicId   = '';
    window.currentArticleId = '';

    toastrSetting();
    buildCompany();
    buildSemenComponent()
}

//onload
$(document).ready(function(){
    onLoad()
    loadUser()
    setTextareaHeight()
    onLoadTheme()
})