let importTempData;
let originFromTextFile;
//table
$tables = $('#file_upload_result');

//apply all
$btnAddAll = $('#btn_add_all');
$btnUpdateAll = $('#btn_update_all');

//buttons
$btnAddCompany = $('#btn_add_only_company');
$btnAddTopic = $('#btn_add_only_topic');
$btnAddArticle = $('#btn_add_only_article');

$btnUpdateCompany = $('#btn_update_only_company');
$btnUpdateTopic = $('#btn_update_only_topic');
$btnUpdateArticle = $('#btn_update_only_article');

//bages
$newCompanybage = $('#new_company_bage')
$newTopicbage = $('#new_topic_bage')
$newArticlebage = $('#new_article_bage')

$modifyCompanyBage = $('#modify_company_bage')
$modifyTopicBage = $('#modify_topic_bage')
$modifyArticleBage = $('#modify_article_bage')

//====================================================== Events ======================================================

$(document).on('click', '#btn_download_file_export', onClickDownloadFileExport)
$(document).on('change', '#file_upload', onUploadFile)
$(document).on('click', '#box_file', onClickOnInputFile)
$(document).on('input', '#confirm_text_delete', onInputConfirmTextDelete)
$(document).on('click', '#btn_clear_all_data', onClearAllData)

$btnAddCompany.click(onAddCompany)
$btnAddTopic.click(onAddTopic)
$btnAddArticle.click(onAddArticle)
$btnUpdateCompany.click(onUpdateCompany)
$btnUpdateTopic.click(onUpdateTopic)
$btnUpdateArticle.click(onUpdateArticle)
$btnAddAll.click(onAddAll)
$btnUpdateAll.click(onUpdateAll)

//====================================================== Functions ======================================================
//------------------------------------------------------ Import ------------------------------------------------------
/**
 * On upload file
 */
function onUploadFile() {
    let files = $('#file_upload')[0].files;

    if (files.length > 0) {
        //validation
        checkImportFile(files[0])
    } else {
        $('#btn_play').attr('disabled', 'disabled').removeClass('blue')
        $('#box_file input').val('');
    }
}

/**
 * Validation file
 * @param file
 */
function checkImportFile(file) {
    importTempData = null;
    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        //is a valid file
        try {
            const data = JSON.parse(decodeURIComponent(text));
            if (data.company.length > 0) {
                //set file name to input
                $('#file_input_name').val(file.name);

                //check data
                checkNewData(data);
                originFromTextFile = data;
            } else {
                showMessage(VALIDATION_MESSAGE.FILE_EMPTY, MSG_TYPE.ERROR)
                $tables.hide();
            }
        } catch (e) {
            showMessage(VALIDATION_MESSAGE.FILE_NOT_SUPPORT, MSG_TYPE.ERROR)
            $tables.hide();
        }
    }
    reader.readAsText(file);
}


/**
 * Check new data
 * @param {Object} newData 
 * @returns 
 */
function checkNewData(newData) {
    try {
        const {
            company,
            topic,
            article }
            = newData

        const newCompanyList = []
        const modifyCompanyList = []
        company.forEach(v => {
            //check new data
            if (!window.company.some(old => old.id === v.id)) {
                newCompanyList.push(v)
            }
            //check modify data
            if (window.company.some(old => old.id === v.id && old.companyName !== v.companyName)) {
                modifyCompanyList.push(v)
            }
        });

        const newTopicList = []
        const modifyTopicList = []
        topic.forEach(v => {
            //check new data
            if (!window.topic.some(old => old.id === v.id)) {
                newTopicList.push(v)
            }
            //check modify data
            if (window.topic.some(old => old.id === v.id && old.companyId === v.companyId && old.topicName !== v.topicName)) {
                modifyTopicList.push(v)
            }
        });

        const newArticleList = []
        const modifyArticleList = []
        article.forEach(v => {
            //check new data
            if (!window.article.some(old => old.id === v.id)) {
                newArticleList.push(v)
            }
            //check modify data
            if (window.article.some(old => (old.id === v.id && old.topicId === v.topicId) && (old.title !== v.title || old.content !== v.content))) {
                modifyArticleList.push(v)
            }
        });

        importTempData = {
            newCompanyList,
            newTopicList,
            newArticleList,
            modifyCompanyList,
            modifyTopicList,
            modifyArticleList
        }

        //show information of new data
        showNewData();
    } catch (e) {
        console.log(e)
        showMessage(VALIDATION_MESSAGE.FILE_NOT_SUPPORT, MSG_TYPE.ERROR)
        $tables.hide();
    }
}

function onClickOnInputFile() {
    $('#file_upload').click();
}


/**
 * Show information of new data
 */
function showNewData() {
    const {
        newCompanyList,
        newTopicList,
        newArticleList,
        modifyCompanyList,
        modifyTopicList,
        modifyArticleList
    } = importTempData

    //check data
    if (importTempData) {
        //show table
        $tables.show();

        //----------------- New Data --------------
        //new company
        if (newCompanyList.length > 0) {
            $btnAddCompany.removeClass('disabled')
        } else {
            $btnAddCompany.addClass('disabled')
        }
        $newCompanybage.text(newCompanyList.length)

        //new topic
        if (newTopicList.length > 0) {
            $btnAddTopic.removeClass('disabled')
        } else {
            $btnAddTopic.addClass('disabled')
        }
        $newTopicbage.text(newTopicList.length)

        //new article
        if (newArticleList.length > 0) {
            $btnAddArticle.removeClass('disabled')
        } else {
            $btnAddArticle.addClass('disabled')
        }
        $newArticlebage.text(newArticleList.length)

        if (newCompanyList.length > 0 || newTopicList.length > 0 || newArticleList.length > 0) {
            $btnAddAll.removeClass('disabled')
        } else {
            $btnAddAll.addClass('disabled')
        }


        //--------------- modify data -------------
        //modify company
        if (modifyCompanyList.length > 0) {
            $btnUpdateCompany.removeClass('disabled')
        } else {
            $btnUpdateCompany.addClass('disabled')
        }
        $modifyCompanyBage.text(modifyCompanyList.length)

        //modify topic
        if (modifyTopicList.length > 0) {
            $btnUpdateTopic.removeClass('disabled')
        } else {
            $btnUpdateTopic.addClass('disabled')
        }
        $modifyTopicBage.text(modifyTopicList.length)

        //modify article
        if (modifyArticleList.length > 0) {
            $btnUpdateArticle.removeClass('disabled')
        } else {
            $btnUpdateArticle.addClass('disabled')
        }
        $modifyArticleBage.text(modifyArticleList.length)

        if (modifyCompanyList.length > 0 || modifyTopicList.length > 0 || modifyArticleList.length > 0) {
            $btnUpdateAll.removeClass('disabled')
        } else {
            $btnUpdateAll.addClass('disabled')
        }
    } else {
        $tables.hide();
    }
}




//------------------------------------------------------ Export ------------------------------------------------------
/**
 * Click to download file export
 */
function onClickDownloadFileExport() {
    const exportData = {
        company: companyRepo.findAll(),
        topic: topicRepo.findAll(),
        article: articleRepo.findAll()
    }

    const data = encodeURIComponent(JSON.stringify(exportData));

    //download file
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = 'TinyNoted_export_data_' + getCurrentDate() + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
}

/**
 * On add new company
 */
function onAddCompany() {
    if (confirm(MESSAGE.IMPORT_COMPANY_ASK)) {
        companyRepo.saveAll(importTempData.newCompanyList)
        showMyMessage(MESSAGE.SAVE_COMPANY_SUCCESS, MSG_TYPE.SUCCESS)
        buildCompany();
        checkNewData(originFromTextFile);
    }
}

/**
 * On add new topic
 */
function onAddTopic() {
    if (confirm(MESSAGE.IMPORT_TOPIC_ASK)) {
        topicRepo.saveAll(importTempData.newTopicList)
        showMyMessage(MESSAGE.SAVE_TOPIC_SUCCESS, MSG_TYPE.SUCCESS)
        buildTopic();
        checkNewData(originFromTextFile);
    }
}

/**
 * On add new article
 */
function onAddArticle() {
    if (confirm(MESSAGE.IMPORT_ARTICLE_ASK)) {
        articleRepo.saveAll(importTempData.newArticleList)
        showMyMessage(MESSAGE.SAVE_ARTICLE_SUCCESS, MSG_TYPE.SUCCESS)
        buildTopic();
        checkNewData(originFromTextFile);
    }
}

/**
 * On update company
 */
function onUpdateCompany() {
    if (confirm(MESSAGE.IMPORT_MODIFY_COMPANY_ASK)) {
        companyRepo.updateAll(importTempData.modifyCompanyList)
        showMyMessage(MESSAGE.UPDATE_COMPANY_SUCCESS, MSG_TYPE.SUCCESS)
        buildCompany();
        checkNewData(originFromTextFile);
    }
}

/**
 * On update topic
 */
function onUpdateTopic() {
    if (confirm(MESSAGE.IMPORT_MODIFY_TOPIC_ASK)) {
        topicRepo.updateAll(importTempData.modifyTopicList)
        showMyMessage(MESSAGE.UPDATE_TOPIC_SUCCESS, MSG_TYPE.SUCCESS)
        buildTopic();
        checkNewData(originFromTextFile);
    }
}

/**
 * On update article
 */
function onUpdateArticle() {
    if (confirm(MESSAGE.IMPORT_MODIFY_ARTICLE_ASK)) {
        articleRepo.updateAll(importTempData.modifyArticleList)
        showMyMessage(MESSAGE.UPDATE_ARTICLE_SUCCESS, MSG_TYPE.SUCCESS)
        buildTopic();
        checkNewData(originFromTextFile);
    }
}

/**
 * On add all
 */
function onAddAll() {
    if (confirm(MESSAGE.IMPORT_ALL_ASK)) {

        companyRepo.saveAll(importTempData.newCompanyList)
        topicRepo.saveAll(importTempData.newTopicList)
        articleRepo.saveAll(importTempData.newArticleList)

        showMessage(MESSAGE.SAVE_ALL_SUCCESS, MSG_TYPE.SUCCESS)
        buildCompany();
        checkNewData(originFromTextFile);
    }
}

/**
 * On update all
 */
function onUpdateAll() {
    if (confirm(MESSAGE.IMPORT_MODIFY_ALL_ASK)) {

        companyRepo.updateAll(importTempData.modifyCompanyList)
        topicRepo.updateAll(importTempData.modifyTopicList)
        articleRepo.updateAll(importTempData.modifyArticleList)

        showMessage(MESSAGE.UPDATE_ALL_SUCCESS, MSG_TYPE.SUCCESS)
        buildCompany();
        checkNewData(originFromTextFile);
    }
}

/**
 * on input confirm text input
 */
function onInputConfirmTextDelete(){
    const text = $(this).val()
    if(text && text.toLowerCase() === window.user.username.toLowerCase()){
        $('#btn_clear_all_data').removeClass('disabled')
    }else{
        $('#btn_clear_all_data').addClass('disabled')
    }
}

/**
 * Clear all data on local
 */
function onClearAllData(){
    if(confirm(MESSAGE.CLEAR_ALL_DATA_ASK)){

        companyRepo.deleteAll()
        topicRepo.deleteAll()
        articleRepo.deleteAll()

        showMessage(MESSAGE.CLEAR_ALL_DATA_SUCCESS, MSG_TYPE.SUCCESS)
        buildCompany();
        checkNewData(originFromTextFile);
        $('#confirm_text_delete').val('')
        $('#btn_clear_all_data').addClass('disabled')
    }
}